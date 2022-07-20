import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { difficultySettingsState } from '../app.state';
import Button from '../button/button';
import Difficulty, { DifficultySetting, GameMode } from '../difficulty/difficulty';
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
        <Button to="/stats">Stats</Button>
        <Difficulty settings={difficultySettings as DifficultySetting} onDifficultyChange={onDifficultyChange} />
        <Button to={`/play/${difficultySettings.gameMode === GameMode.FIND ? 'find' : 'guess'}`}>Start</Button>
      </Container>
    </Modal>
  );
}

export default Welcome;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;
