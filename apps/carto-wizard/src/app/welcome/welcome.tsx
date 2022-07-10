import styled from 'styled-components';
import Button from '../button/button';
import Modal from '../modal/modal';
import { Link } from 'react-router-dom';

/* eslint-disable-next-line */
export interface WelcomeProps {}

export function Welcome(props: WelcomeProps) {
  return (
    <Modal>
      <Container>
        <h1>CartoWizard</h1>
        <List>
          <ListItem>
            <Link to="/play">Countries</Link>
          </ListItem>
          <ListItem>
            <Link to="/play">Flags</Link>
          </ListItem>
        </List>
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
  gap: 1rem;
  margin: 1rem 1rem 3rem 1rem;
`;

const ListItem = styled.div`
  aspect-ratio: 4/3;
  width: 20ch;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
`;
