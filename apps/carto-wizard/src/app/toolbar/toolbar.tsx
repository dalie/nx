import styled from 'styled-components';
import Brand from '../brand/brand';
import { ANIMATION_DELAY } from '../contants';
import { toolbarIn, toolbarOut } from './toolbar.animations';

/* eslint-disable-next-line */
export interface ToolbarProps {}

export function Toolbar(props: ToolbarProps) {
  return (
    <StyledDiv>
      <Brand />
    </StyledDiv>
  );
}

export default Toolbar;

const StyledDiv = styled.div`
  display: flex;
  padding: 0 1rem;
  gap: 1rem;
  height: 3rem;
  background-color: #444444;
  transform: translateY(-4rem);
  animation: ${toolbarIn} ${ANIMATION_DELAY}ms forwards;

  &.exiting {
    animation: ${toolbarOut} ${ANIMATION_DELAY}ms forwards;
  }
`;
