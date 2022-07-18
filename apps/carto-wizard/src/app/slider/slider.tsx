import { MutableRefObject, useRef } from 'react';
import styled from 'styled-components';

/* eslint-disable-next-line */
export interface SliderProps {
  range: [number, number];
  value: number;
  onValueChange: (value: number) => void;
}

export function Slider(props: SliderProps) {
  const handle = useRef() as MutableRefObject<HTMLDivElement>;

  const value = (props.range[0] + props.value) / (props.range[1] - props.range[0]);
  return (
    <Container>
      <Track></Track>
      <Handle ref={handle} value={value} />
    </Container>
  );
}

export default Slider;

const Container = styled.div`
  width: 100%;
  height: 1rem;
`;

const Track = styled.div`
  width: 100%;
  height: 0.25rem;
  margin: 0 0.5rem;
  background-color: grey;
`;

const Handle = styled.div<{ value: number }>`
  cursor: pointer;
  background-color: #6ff080;
  border-radius: 50%;
  width: 1rem;
  height: 1rem;
  margin-top: calc(-0.625rem);

  &:hover {
    box-shadow: 0 0 14px #6ff080;
  }
`;
