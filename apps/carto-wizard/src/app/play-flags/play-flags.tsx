import { useCallback, useEffect, useState } from 'react';
import { useMap } from 'react-map-gl';
import { useRecoilValue } from 'recoil';
import { countriesState, Country } from '../app.state';
import Button from '../button/button';
import Modal from '../modal/modal';
import Toolbar from '../toolbar/toolbar';
import AskFlag from './ask-flag/ask-flag';

/* eslint-disable-next-line */
export interface PlayFlagsProps {}

export function PlayFlags(props: PlayFlagsProps) {
  const { gameMap } = useMap();

  const countries = useRecoilValue(countriesState);
  const [answer, setAnswer] = useState<Country | null>(null);
  const [finished, setFinished] = useState(false);
  const [giveUp, setGiveUp] = useState(false);
  const [attempts, setAttempts] = useState(0);

  const nextAnswer = useCallback(() => {
    if (countries?.length && gameMap) {
      const country = countries[Math.floor(Math.random() * countries.length)];

      setFinished(false);
      setGiveUp(false);
      setAnswer(country);
    }
  }, [countries, gameMap]);

  useEffect(() => {
    nextAnswer();
  }, [countries, nextAnswer]);

  const onCorrectAnswer = (newAttempts: number) => {
    setFinished(true);
    setAttempts(newAttempts);
  };

  const onGiveUp = () => {
    setGiveUp(true);
    setFinished(true);
  };
  return (
    <>
      <Toolbar />
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
    </>
  );
}

export default PlayFlags;
