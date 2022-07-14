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

  const [attempts, setAttempts] = useState(0);

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

    const randomCountries = countries
      .filter((c) => c.id !== answer.id && c.borders?.length <= 0)
      .sort(() => 0.5 - Math.random());
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

        return country;
      });
    }
  }, [countries, gameMap]);

  useEffect(() => {
    nextAnswer();
  }, [countries, nextAnswer]);

  useEffect(() => {
    if (answer && gameMap) {
      gameMap.fitBounds([answer.bounds.sw, answer.bounds.ne], {
        duration: 1000,
        padding: {
          bottom: 300,
          left: 150,
          right: 150,
          top: 150,
        },
      });

      setTimeout(() => {
        gameMap.setFeatureState(
          { id: answer.id, source: 'countries_source', sourceLayer: 'processed' },
          { hover: true }
        );
      }, 750);
    }
  }, [answer, gameMap]);

  const onCorrectAnswer = (newAttempts: number) => {
    setFinished(true);
    setAttempts(newAttempts);
  };

  return (
    <>
      <Toolbar />
      {answer !== null && choices !== null && (
        <AskCountry onCorrectAnswer={onCorrectAnswer} answer={answer} choices={choices} />
      )}

      {finished && (
        <Modal>
          <p>Congratulations!</p>
          <p>The correct answer was {answer?.name}</p>
          <p>You found it {attempts > 1 ? `in ${attempts} attempts.` : `on your first try!`}</p>
          <Button onClick={() => nextAnswer()}>Next</Button>
        </Modal>
      )}
    </>
  );
}

export default PlayCountries;
