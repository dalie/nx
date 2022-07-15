import { useEffect, useState } from 'react';
import { ANIMATION_DELAY } from '../contants';

/* eslint-disable-next-line */
export interface ScoreCounterProps {
  value: number;
  className?: string;
}

export function ScoreCounter(props: ScoreCounterProps) {
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (score !== props.value) {
      const frameTime = 1000 / 30;

      const diff = props.value - score;
      const increments = diff / (ANIMATION_DELAY / 2 / frameTime);
      if (score + increments < props.value) {
        setTimeout(() => {
          setScore(score + increments);
        }, frameTime);
      } else {
        setScore(props.value);
      }
    }
  }, [props.value, score]);

  return <div className={props.className}>{Math.round(score)}</div>;
}

export default ScoreCounter;
