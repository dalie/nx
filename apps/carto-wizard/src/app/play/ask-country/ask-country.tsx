import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Country } from '../../app.state';

/* eslint-disable-next-line */
export interface AskCountryProps {
  country: Country;
  guesses: Country[];
}

export function AskCountry(props: AskCountryProps) {
  const [items, setItems] = useState<Country[] | null>();

  const isLongString = (value: string) => {
    return value.length > 18;
  };

  useEffect(() => {
    setItems([props.country, ...props.guesses].sort(() => 0.5 - Math.random()));
  }, [props.country, props.guesses]);

  return (
    <Container
      initial={{ transform: 'translateY(6rem)' }}
      animate={{ transform: 'translateY(0rem)' }}
      exit={{ transform: 'translateY(6rem)' }}
    >
      {items?.map((i) => (
        <CountryDiv isLongString={isLongString(i.name)}>
          <FlagContainer>
            <FlagImg alt={i.name} src={i.flags} />
          </FlagContainer>
          {i.name}
        </CountryDiv>
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
  justify-content: space-between;
  padding: 1rem;
  gap: 1rem;
  //height: 5rem;
  background-color: var(--dark);
  box-shadow: 0 -0.25rem 1rem #000;
`;

const CountryDiv = styled.div<{ isLongString: boolean }>`
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: start;
  font-size: ${(props) => (props.isLongString ? '1rem' : '1.5rem')};

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
