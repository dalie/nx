import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { PlayParams } from '../animated-routes/animated-routes';
import { countriesState, Country } from '../app.state';
import Toolbar from '../toolbar/toolbar';
import AskCountry from './ask-country/ask-country';
import AskFlag from './ask-flag/ask-flag';
import { isPlayingState, playCurrentCountryState } from './play.state';

/* eslint-disable-next-line */
export interface PlayProps {}

export function Play(props: PlayProps) {
  const { mode } = useParams<PlayParams>();
  const countries = useRecoilValue(countriesState);
  const [currentCountry, setCurrentCountry] = useRecoilState(playCurrentCountryState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);

  const [currentGuesses, setCurrentGuesses] = useState<Country[] | null>(null);

  useEffect(() => {
    if (countries?.length) {
      const country = countries[Math.floor(Math.random() * countries.length)];

      setCurrentCountry(country);
      setIsPlaying(true);
    }
    return function cleanup() {
      setCurrentCountry(null);
      setIsPlaying(false);
    };
  }, [countries, setCurrentCountry, setIsPlaying]);

  useEffect(() => {
    if (countries?.length && currentCountry && mode === 'countries') {
      const randomCountries = countries.filter((c) => c.code !== currentCountry.code).sort(() => 0.5 - Math.random());
      setCurrentGuesses(randomCountries.slice(0, 3));
    }
  }, [countries, mode, currentCountry]);

  return (
    <>
      <Toolbar />
      {mode === 'countries' && currentCountry !== null && currentGuesses !== null && (
        <AskCountry country={currentCountry} guesses={currentGuesses} />
      )}
      {mode === 'flags' && currentCountry !== null && <AskFlag country={currentCountry} />}
    </>
  );
}

export default Play;
