import styled from 'styled-components';
import Button from '../button/button';
import Modal from '../modal/modal';
import { ToggleButton, ToggleButtonGroup } from '../toggle-button';

/* eslint-disable-next-line */
export interface WelcomeProps {}

export function Welcome(props: WelcomeProps) {
  return (
    <Modal>
      <Container>
        <h1>CartoWizard</h1>
        <List>
          <Button to="/play/countries">Countries</Button>
          <Button to="/play/flags">Flags</Button>
        </List>
        <ToggleButtonGroup>
          <ToggleButton />
          <ToggleButton />
          <ToggleButton />
        </ToggleButtonGroup>
      </Container>
    </Modal>
  );
}

export default Welcome;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const List = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin: 1rem 1rem 3rem 1rem;

  & > * {
    width: 20ch;
    aspect-ratio: 4/3;
  }
`;
