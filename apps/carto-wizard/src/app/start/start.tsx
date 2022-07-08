import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import Button from '../button/button';
import Modal from '../modal/modal';
import { PropsWithTransition } from '../ui/props-with-transition';
import { uiState } from '../ui/ui.state';

/* eslint-disable-next-line */
export interface StartProps extends PropsWithTransition {}

export function Start(props: StartProps) {
  const [ui, setUi] = useRecoilState(uiState);

  const onBtn = () => {
    setUi({
      start: false,
      toolbar: true,
    });
  };

  return (
    <Modal {...props}>
      <StyledDiv>
        <h1>CartoWizard</h1>
        <Button onClick={onBtn}>Start</Button>
      </StyledDiv>
    </Modal>
  );
}

export default Start;

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
