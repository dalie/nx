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
        <CountryDiv>
          <FlagImg alt={i.name} src={i.flags} />
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
  justify-content: center;
  padding: 0 1rem;
  gap: 1rem;
  //height: 5rem;
  background-color: var(--dark);
  box-shadow: 0 -0.25rem 1rem #000;
`;

const CountryDiv = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  max-width: 50%;
  max-height: 50%;
`;

const FlagImg = styled.img`
  box-shadow: 0 0 0.75rem;
  max-width: 6rem;
  max-height: 2rem;
`;
