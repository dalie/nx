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

  const nextAnswer = useCallback(() => {
    if (countries?.length && gameMap) {
      const country = countries[Math.floor(Math.random() * countries.length)];

      setFinished(false);
      setAnswer(country);
    }
  }, [countries, gameMap]);

  useEffect(() => {
    nextAnswer();
  }, [countries, nextAnswer]);

  const onCorrectAnswer = (score: number) => {
    setFinished(true);
    console.log(score);
  };

  return (
    <>
      <Toolbar />
      {answer && !finished && <AskFlag onCorrectAnswer={onCorrectAnswer} answer={answer} />}

      {finished && (
        <Modal>
          <p>Congratulatons!</p>
          <p>You found the location of {answer?.name}</p>
          <Button onClick={() => nextAnswer()}>Next</Button>
        </Modal>
      )}
    </>
  );
}

export default PlayFlags;
