import { useCallback, useEffect, useMemo, useState } from 'react';
import { useMap } from 'react-map-gl';
import { useRecoilValue } from 'recoil';
import { countriesState, Country } from '../app.state';
import Button from '../button/button';
import Modal from '../modal/modal';
import Toolbar from '../toolbar/toolbar';
import AskCountry from './ask-country/ask-country';

/* eslint-disable-next-line */
export interface PlayCountriesProps {}

export function PlayCountries(props: PlayCountriesProps) {
  const { gameMap } = useMap();

  const countries = useRecoilValue(countriesState);
  const [answer, setAnswer] = useState<Country | null>(null);
  const [finished, setFinished] = useState(false);

  const choices = useMemo<Country[]>(() => {
    if (!countries?.length || !answer) {
      return [];
    }

    if (answer.borders?.length) {
      const borderingCountries = countries.filter((c) => answer.borders.includes(c.code3));

      if (borderingCountries.length < 3) {
        borderingCountries.push(
          ...countries
            .filter((c) => c.id !== answer.id && !answer.borders.includes(c.code3))
            .sort(() => 0.5 - Math.random())
        );
      }

      return borderingCountries
        .filter((c) => c.id !== answer.id)
        .slice(0, 3)
        .sort(() => 0.5 - Math.random());
    }

    const randomCountries = countries.filter((c) => c.id !== answer.id).sort(() => 0.5 - Math.random());
    return randomCountries.slice(0, 3);
  }, [countries, answer]);

  const nextAnswer = useCallback(() => {
    if (countries?.length && gameMap) {
      const country = countries[Math.floor(Math.random() * countries.length)];

      setFinished(false);
      setAnswer((oldAnswer) => {
        if (oldAnswer) {
          gameMap.setFeatureState(
            { id: oldAnswer.id, source: 'countries_source', sourceLayer: 'processed' },
            { hover: false }
          );
        }
        gameMap.setFeatureState(
          { id: country.id, source: 'countries_source', sourceLayer: 'processed' },
          { hover: true }
        );
        return country;
      });
    }
  }, [countries, gameMap]);

  useEffect(() => {
    nextAnswer();
  }, [countries, nextAnswer]);

  useEffect(() => {
    if (answer && gameMap) {
      gameMap.flyTo({
        center: answer.lngLat,
      });
    }
  }, [answer, gameMap]);

  const onCorrectAnswer = (score: number) => {
    setFinished(true);
    console.log(score);
  };

  return (
    <>
      <Toolbar />
      {answer !== null && choices !== null && (
        <AskCountry onCorrectAnswer={onCorrectAnswer} answer={answer} choices={choices} />
      )}

      {finished && (
        <Modal>
          <p>Congratulatons!</p>
          <Button onClick={() => nextAnswer()}>Next</Button>
        </Modal>
      )}
    </>
  );
}

export default PlayCountries;
