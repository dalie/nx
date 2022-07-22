import { Button, Modal } from 'app/components';
import { difficultySettingsState } from 'app/store';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { Difficulty, DifficultySetting, GameMode } from '../components';

export function SettingsPage() {
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

export default SettingsPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;
