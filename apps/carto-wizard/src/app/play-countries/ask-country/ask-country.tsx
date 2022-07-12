import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Country } from '../../app.state';

interface Choice {
  country: Country;
  state: '' | 'correct' | 'wrong';
}

/* eslint-disable-next-line */
export interface AskCountryProps {
  country: Country;
  choices: Country[];
}

export function AskCountry(props: AskCountryProps) {
  const [choices, setChoices] = useState<Choice[]>(
    [props.country, ...props.choices].sort(() => 0.5 - Math.random()).map((c) => ({ country: c, state: '' }))
  );

  const isLongString = (value: string) => {
    return value.length > 18;
  };

  const clickChoice = (choice: Choice) => {
    if (choice.country === props.country) {
      console.log('correct:', choice.country.name);
    } else {
      console.log('wrong:', choice.country.name);
    }
  };

  return (
    <Container
      initial={{ transform: 'translateY(6rem)' }}
      animate={{ transform: 'translateY(0rem)' }}
      exit={{ transform: 'translateY(6rem)' }}
    >
      {choices?.map((c) => (
        <CountryButton key={c.country.code} isLongString={isLongString(c.country.name)} onClick={() => clickChoice(c)}>
          <FlagContainer>
            <FlagImg alt={c.country.name} src={c.country.flags} />
          </FlagContainer>
          {c.country.name}
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
`;

const CountryButton = styled.button<{ isLongString: boolean }>`
  all: unset;
  cursor: pointer;
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: start;
  font-size: ${(props) => (props.isLongString ? '1rem' : '1.5rem')};
  background-color: #667799;
  padding: 0.5rem 1rem;
  flex-grow: 1;

  border-radius: 0.75rem;
  &:hover,
  :active,
  :focus {
    box-shadow: 0 0 1rem #ffffff;
  }

  @media (max-width: 700px) {
    width: 90vw;
  }

  @media (min-width: 700px) and (max-width: 1200px) {
    width: 40vw;
  }
`;

const FlagContainer = styled.div`
  aspect-ratio: 16/9;
  width: 6rem;
  display: flex;
  align-items: center;
  justify-content: right;
`;

const FlagImg = styled.img`
  box-shadow: 0 0 0.75rem;
  max-height: 100%;
`;
