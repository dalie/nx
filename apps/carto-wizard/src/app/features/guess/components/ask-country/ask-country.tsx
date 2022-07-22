import { Country } from 'app/store';
import { motion } from 'framer-motion';
import { useCallback, useEffect, useState } from 'react';
import { useMap } from 'react-map-gl';
import styled from 'styled-components';

interface Choice {
  country: Country;
  state: 'default' | 'correct' | 'wrong';
}

/* eslint-disable-next-line */
export interface AskCountryProps {
  answer: Country;
  choices: Country[];
  hideName: boolean;
  hardBonus: boolean;
  maxBonus: number;
  onBonusScore: (bonus: number) => void;
  onCorrectAnswer: (attempts: number) => void;
}

export function AskCountry(props: AskCountryProps) {
  const { gameMap } = useMap();

  const [choices, setChoices] = useState<Choice[]>([]);
  const [attempts, setAttempts] = useState(1);

  useEffect(() => {
    setChoices(
      [props.answer, ...props.choices].sort(() => 0.5 - Math.random()).map((c) => ({ country: c, state: 'default' }))
    );
    setAttempts(1);

    if (props.answer && gameMap) {
      gameMap.fitBounds([props.answer.bounds.sw, props.answer.bounds.ne], {
        duration: 2000,
        padding: {
          bottom: 300,
          left: 150,
          right: 150,
          top: 150,
        },
      });

      setTimeout(() => {
        gameMap.setFeatureState(
          { id: props.answer.id, source: 'countries_source', sourceLayer: 'processed' },
          { hover: true }
        );
      }, 1750);
    }

    return () => {
      if (gameMap && props.answer) {
        gameMap.setFeatureState(
          { id: props.answer.id, source: 'countries_source', sourceLayer: 'processed' },
          { hover: false }
        );
      }
    };
  }, [props.answer, props.choices, gameMap]);

  const isLongString = (value: string) => {
    return value.length > 18;
  };

  const clickChoice = useCallback(
    (choice: Choice) => {
      if (choice.country === props.answer) {
        choice.state = 'correct';
        props.onCorrectAnswer(attempts);
      } else {
        choice.state = 'wrong';
        setAttempts((oldValue) => {
          return oldValue + 1;
        });

        let score: number;
        switch (attempts + 1) {
          case 1:
            score = props.maxBonus;
            break;
          case 2:
            score = props.maxBonus / 2;
            break;
          case 3:
            score = props.maxBonus / 4;
            break;
          default:
            score = 0;
        }

        props.onBonusScore(score);
      }

      setChoices([...choices]);
    },
    [attempts, setAttempts, choices, props]
  );

  return (
    <Container
      initial={{ transform: 'translateY(6rem)' }}
      animate={{ transform: 'translateY(0rem)' }}
      exit={{ transform: 'translateY(6rem)' }}
    >
      {choices?.map((c) => (
        <CountryButton
          disabled={c.state !== 'default'}
          className={`${c.state} ${props.hideName ? 'no-label' : ''}`}
          key={c.country.id}
          isLongString={isLongString(c.country.name)}
          onClick={() => clickChoice(c)}
        >
          <FlagContainer className={props.hideName ? 'no-label' : ''}>
            <FlagImg alt={c.country.name} src={c.country.flag} />
          </FlagContainer>
          {!props.hideName && c.country.name}
        </CountryButton>
      ))}
    </Container>
  );
}

export default AskCountry;

const Container = styled(motion.div)`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-around;
  padding: 1rem;
  gap: 1rem;
  //height: 5rem;
  background-color: var(--dark);
  box-shadow: 0 -0.25rem 1rem #000;
  @media (max-width: 700px) {
    padding: 0.25rem;
    gap: 0.25rem;
  }

  @media (min-width: 700px) and (max-width: 1200px) {
    padding: 0.5rem;
    gap: 0.5rem;
  }
`;

const CountryButton = styled.button<{ isLongString: boolean }>`
  all: unset;
  cursor: pointer;
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: start;
  font-size: ${(props) => (props.isLongString ? '1rem' : '1.25rem')};
  background-color: #667799;
  padding: 0.5rem 1rem;
  flex-grow: 1;
  border-radius: 0.75rem;

  &.no-label {
    flex-grow: 0;
    justify-content: center;
  }
  &:not([disabled]) {
    &:hover,
    :active,
    :focus {
      box-shadow: 0 0 1rem #ffffff;
    }
  }

  &.wrong {
    box-shadow: 0 0 1rem #f37575;
  }

  &.correct {
    box-shadow: 0 0 1rem #75f386;
  }

  @media (max-width: 700px) {
    width: 90vw;

    &.no-label {
      width: 40vw;
    }
    padding: 0.25rem 0.5rem;
  }

  @media (min-width: 700px) and (max-width: 1200px) {
    width: 40vw;
    &.no-label {
      width: unset;
    }
  }
`;

const FlagContainer = styled.div`
  aspect-ratio: 16/9;
  width: 6rem;
  display: flex;
  align-items: center;
  justify-content: right;
  &.no-label {
    justify-content: center;
  }
  @media (max-width: 700px) {
    width: 2rem;
    &.no-label {
      width: 6rem;
    }
  }

  @media (min-width: 700px) and (max-width: 1200px) {
    width: 4rem;
    &.no-label {
      width: 6rem;
    }
  }
`;

const FlagImg = styled.img`
  box-shadow: 0 0 0.75rem;
  max-height: 100%;
`;
