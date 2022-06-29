import { PropsWithChildren } from 'react';
import styled from 'styled-components';

/* eslint-disable-next-line */
export interface UiProps extends PropsWithChildren {}

export function Ui(props: UiProps) {
  return <StyledDiv>{props.children}</StyledDiv>;
}

export default Ui;

const StyledDiv = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  & > * {
    pointer-events: all;
  }
`;
