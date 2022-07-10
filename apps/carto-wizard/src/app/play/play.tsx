import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { countriesState } from '../app.state';
import Toolbar from '../toolbar/toolbar';
import { isPlayingState, playCurrentCountryState } from './play.state';

/* eslint-disable-next-line */
export interface PlayProps {}

export function Play(props: PlayProps) {
  const countries = useRecoilValue(countriesState);
  const [currentCountry, setCurrentCountry] = useRecoilState(playCurrentCountryState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);

  useEffect(() => {
    if (countries?.length) {
      const country = countries[Math.floor(Math.random() * countries.length)];

      setCurrentCountry(country.name);
      setIsPlaying(true);
    }
    return function cleanup() {
      setCurrentCountry('');
      setIsPlaying(false);
    };
  }, [countries]);

  return (
    <>
      <Toolbar />
      <h1>Welcome to Play!</h1>
    </>
  );
}

export default Play;
