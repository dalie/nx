import { useEffect, useMemo, useState } from 'react';
import { useMap } from 'react-map-gl';
import { useRecoilValue } from 'recoil';
import { countriesState, Country } from '../app.state';
import Toolbar from '../toolbar/toolbar';
import AskCountry from './ask-country/ask-country';

/* eslint-disable-next-line */
export interface PlayCountriesProps {}

export function PlayCountries(props: PlayCountriesProps) {
  const { gameMap } = useMap();

  const countries = useRecoilValue(countriesState);
  const [answer, setAnswer] = useState<Country | null>(null);
  const choices = useMemo<Country[]>(() => {
    if (!countries?.length || !answer) {
      return [];
    }

    const randomCountries = countries.filter((c) => c.code !== answer.code).sort(() => 0.5 - Math.random());
    return randomCountries.slice(0, 3);
  }, [countries, answer]);

  useEffect(() => {
    if (countries?.length) {
      const country = countries[Math.floor(Math.random() * countries.length)];

      setAnswer(country);
    }
  }, [countries]);

  useEffect(() => {
    if (answer && gameMap) {
      gameMap.flyTo({
        center: answer.lngLat,
      });
    }
  }, [answer, gameMap]);

  return (
    <>
      <Toolbar />
      {answer !== null && choices !== null && <AskCountry country={answer} choices={choices} />}
    </>
  );
}

export default PlayCountries;
