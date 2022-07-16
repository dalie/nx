import { motion } from 'framer-motion';
import { MapMouseEvent } from 'mapbox-gl';
import { useCallback, useEffect, useState } from 'react';
import { useMap } from 'react-map-gl';
import styled from 'styled-components';
import { Country } from '../../app.state';
import Button from '../../button/button';

/* eslint-disable-next-line */
export interface AskFlagProps {
  answer: Country;
  onCorrectAnswer: (score: number) => void;
  onGiveUp: () => void;
}

export function AskFlag(props: AskFlagProps) {
  const { gameMap } = useMap();
  const [attempts, setAttempts] = useState(1);
  const [isLargeCountryName, setIsLargeCountryName] = useState(false);

  const mapClick = useCallback(
    (event: MapMouseEvent) => {
      if (gameMap) {
        const features = gameMap.queryRenderedFeatures(event.point, {
          layers: ['countries'],
        });

        if (features?.length && features[0].properties && features[0].properties['alpha2Code'] === props.answer.code2) {
          props.onCorrectAnswer(attempts);
        } else {
          setAttempts((oldValue) => {
            return oldValue + 1;
          });
        }
      }
    },
    [props, gameMap, attempts]
  );

  useEffect(() => {
    if (gameMap) {
      gameMap.on('click', 'countries', mapClick);
    }
    return function cleanup() {
      //cleanup listeners
      if (gameMap) {
        gameMap.off('click', 'countries', mapClick);
      }
    };
  }, [gameMap, mapClick]);

  useEffect(() => {
    setAttempts(1);
    const columnWidth = 12;

    if (props.answer.name.length > columnWidth * 2) {
      setIsLargeCountryName(true);
    } else {
      setIsLargeCountryName(false);
    }
  }, [props.answer]);

  const onGiveUp = () => {
    gameMap?.fitBounds([props.answer.bounds.sw, props.answer.bounds.ne], {
      duration: 1000,
      padding: {
        bottom: 300,
        left: 150,
        right: 150,
        top: 150,
      },
    });

    setTimeout(() => {
      props.onGiveUp();
    }, 2000);
  };
  return (
    <Container
      initial={{ transform: 'translateY(6rem)' }}
      animate={{ transform: 'translateY(0rem)' }}
      exit={{ transform: 'translateY(6rem)' }}
    >
      <CountryDiv isLargeCountryName={isLargeCountryName}>
        <FlagImg alt={props.answer.name} src={props.answer.flag} />

        <span>{props.answer.name}</span>
      </CountryDiv>
      <Button onClick={() => onGiveUp()}>Give up</Button>
    </Container>
  );
}

export default AskFlag;

const Container = styled(motion.div)`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1000;

  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 1rem;
  gap: 1rem;
  height: 5rem;
  background-color: var(--dark);
  box-shadow: 0 -0.25rem 1rem #000;
`;

const CountryDiv = styled.div<{ isLargeCountryName: boolean }>`
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: center;
  line-height: ${(props) => (props.isLargeCountryName ? '2rem' : '1.75rem')};
  font-size: ${(props) => (props.isLargeCountryName ? '1.2rem' : '2rem')};
`;

const FlagImg = styled.img`
  box-shadow: 0 0 0.75rem;
  max-width: 6rem;
  max-height: 4rem;
  width: 100%;
`;
