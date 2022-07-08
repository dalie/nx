import styled from 'styled-components';
import Button from '../button/button';
import Modal from '../modal/modal';

/* eslint-disable-next-line */
export interface WelcomeProps {}

export function Welcome(props: WelcomeProps) {
  return (
    <Modal {...props}>
      <StyledDiv>
        <h1>CartoWizard</h1>
        <Button to="/select">Start</Button>
      </StyledDiv>
    </Modal>
  );
}

export default Welcome;

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
