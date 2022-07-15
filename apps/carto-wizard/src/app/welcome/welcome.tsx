import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { difficultySettingsState } from '../app.state';
import Button from '../button/button';
import Difficulty, { DifficultySetting } from '../difficulty/difficulty';
import Modal from '../modal/modal';

/* eslint-disable-next-line */
export interface WelcomeProps {}

export function Welcome(props: WelcomeProps) {
  const [difficultySettings, setDifficultySettings] = useRecoilState(difficultySettingsState);

  const onDifficultyChange = (difficulty: DifficultySetting) => {
    setDifficultySettings(difficulty);
  };

  return (
    <Modal>
      <Container>
        <h1>CartoWizard</h1>
        <Difficulty settings={difficultySettings as DifficultySetting} onDifficultyChange={onDifficultyChange} />
        <Button to={`/play/${difficultySettings?.gameMode}`}>Start</Button>
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
