import { useCallback, useEffect, useState } from 'react';
import { useMap } from 'react-map-gl';
import { useRecoilValue } from 'recoil';
import { Country, difficultySettingsState } from '../app.state';
import Button from '../button/button';
import Modal from '../modal/modal';
import Toolbar from '../toolbar/toolbar';
import useCountries from '../use-countries/use-countries';
import AskFlag from './ask-flag/ask-flag';

/* eslint-disable-next-line */
export interface PlayFindProps {}

export function PlayFind(props: PlayFindProps) {
  const { gameMap } = useMap();

  const settings = useRecoilValue(difficultySettingsState);

  const countries = useCountries(settings.difficulty);

  const [guessedCountries, setGuessedCountries] = useState<Country[]>([]);

  const [answer, setAnswer] = useState<Country | null>(null);
  const [gameOver, setGameOver] = useState(false);
  const [finished, setFinished] = useState(false);
  const [giveUp, setGiveUp] = useState(false);
  const [attempts, setAttempts] = useState(0);

  const nextAnswer = useCallback(() => {
    if (countries?.length) {
      const filteredCountries = countries.filter((c) => !guessedCountries.map((g) => g.id).includes(c.id));
      const country = filteredCountries[Math.floor(Math.random() * filteredCountries.length)];

      if (!country) {
        setGameOver(true);
      }
      setFinished(false);
      setGiveUp(false);
      setAnswer(country);
    }
  }, [countries, guessedCountries]);

  if (!answer && !gameOver) {
    nextAnswer();
  }

  const onCorrectAnswer = (newAttempts: number) => {
    setGuessedCountries((oldValue) => {
      return [...oldValue, answer as Country];
    });
    setFinished(true);
    setAttempts(newAttempts);
  };

  const onGiveUp = () => {
    setGiveUp(true);
    setFinished(true);
  };
  return (
    <>
      <Toolbar guessedCountries={guessedCountries.length + 1} totalCountries={countries.length} />
      {answer && !finished && <AskFlag onGiveUp={onGiveUp} onCorrectAnswer={onCorrectAnswer} answer={answer} />}

      {finished && (
        <Modal>
          {giveUp && (
            <>
              <p>Better luck next time!</p>
              <p>You could not find the location of {answer?.name}</p>
            </>
          )}
          {!giveUp && (
            <>
              <p>Congratulatons!</p>
              <p>
                You found the location of {answer?.name}{' '}
                {attempts > 1 ? `in ${attempts} attempts.` : `on your first try!`}
              </p>
            </>
          )}
          <Button onClick={() => nextAnswer()}>Next</Button>
        </Modal>
      )}

      {gameOver && (
        <Modal>
          <p>Congratulations!</p>
          <p>You found all the countries.</p>
          <Button to="/">Home</Button>
        </Modal>
      )}
    </>
  );
}
