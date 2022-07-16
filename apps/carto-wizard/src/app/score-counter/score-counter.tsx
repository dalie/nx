import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ANIMATION_DELAY } from '../contants';

/* eslint-disable-next-line */
export interface ScoreCounterProps {
  value: number;
  bonus: number;
  className?: string;
}

const frameTime = 1000 / 30;

export function ScoreCounter(props: ScoreCounterProps) {
  const [score, setScore] = useState(0);
  const [bonus, setBonus] = useState(0);

  useEffect(() => {
    if (score !== props.value) {
      const diff = props.value - score;
      const increments = diff / (ANIMATION_DELAY / 2 / frameTime);
      if (score + increments < props.value) {
        setTimeout(() => {
          requestAnimationFrame(() => {
            setScore(score + increments);
          });
        }, frameTime);
      } else {
        setScore(props.value);
      }
    }

    if (bonus !== props.bonus) {
      const diff = props.bonus - bonus;
      const increments = diff / (ANIMATION_DELAY / 2 / frameTime);
      if (bonus + increments > props.bonus) {
        setTimeout(() => {
          requestAnimationFrame(() => {
            setBonus(bonus + increments);
          });
        }, frameTime);
      } else {
        setBonus(props.bonus);
      }
    }
  }, [props.value, props.bonus, score, bonus]);

  return (
    <div className={props.className}>
      <span>{Math.round(score)}</span>
      <span>+</span>
      <BonusText>{Math.round(bonus)}</BonusText>
    </div>
  );
}

export default ScoreCounter;

const BonusText = styled.span`
  color: #00ff00;
`;
