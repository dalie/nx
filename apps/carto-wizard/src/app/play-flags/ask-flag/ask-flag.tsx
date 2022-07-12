import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Country } from '../../app.state';

/* eslint-disable-next-line */
export interface AskFlagProps {
  country: Country;
}

export function AskFlag(props: AskFlagProps) {
  const [isLargeCountryName, setIsLargeCountryName] = useState(false);

  useEffect(() => {
    const columnWidth = 12;

    if (props.country.name.length > columnWidth * 2) {
      setIsLargeCountryName(true);
    } else {
      setIsLargeCountryName(false);
    }
  }, [props.country]);

  return (
    <Container
      initial={{ transform: 'translateY(6rem)' }}
      animate={{ transform: 'translateY(0rem)' }}
      exit={{ transform: 'translateY(6rem)' }}
    >
      <CountryDiv isLargeCountryName={isLargeCountryName}>
        <FlagImg alt={props.country.name} src={props.country.flags} />
        {props.country.name}
      </CountryDiv>
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
`;
