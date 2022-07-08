import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import Brand from '../brand/brand';
import Button from '../button/button';
import { ANIMATION_DELAY } from '../contants';
import { PropsWithTransition } from '../ui/props-with-transition';
import { uiState } from '../ui/ui.state';
import { toolbarIn, toolbarOut } from './toolbar.animations';

/* eslint-disable-next-line */
export interface ToolbarProps extends PropsWithTransition {}

export function Toolbar(props: ToolbarProps) {
  const [ui, setUi] = useRecoilState(uiState);

  const onBtn = () => {
    setUi({
      start: true,
      toolbar: false,
    });
  };

  return (
    <StyledDiv className={props.transition}>
      <Brand />
      <Button onClick={onBtn}>Stop</Button>
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
