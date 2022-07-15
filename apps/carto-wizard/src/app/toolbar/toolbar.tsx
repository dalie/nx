import { motion } from 'framer-motion';
import styled from 'styled-components';
import Brand from '../brand/brand';
import ScoreCounter from '../score-counter/score-counter';

/* eslint-disable-next-line */
export interface ToolbarProps {
  totalCountries?: number;
  guessedCountries?: number;
  score?: number;
}

export function Toolbar(props: ToolbarProps) {
  return (
    <Container
      initial={{ transform: 'translateY(-4rem)' }}
      animate={{ transform: 'translateY(0rem)' }}
      exit={{ transform: 'translateY(-4rem)' }}
    >
      <Brand />
      {props.score != null && <Score value={props.score} />}
      {props.guessedCountries != null && props.totalCountries != null && (
        <CountryCount>
          {props.guessedCountries} / {props.totalCountries}
        </CountryCount>
      )}
    </Container>
  );
}

export default Toolbar;

const Container = styled(motion.div)`
  display: flex;
  justify-content: space-between;
  padding: 0 1rem;
  gap: 1rem;
  height: 3rem;
  background-color: var(--dark);
  box-shadow: 0 0.25rem 1rem #000;
`;

const CountryCount = styled.div`
  display: flex;
  align-items: center;
`;

const Score = styled(ScoreCounter)`
  display: flex;
  align-items: center;
  font-size: 2rem;
  font-weight: 700;
`;
