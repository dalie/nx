import styled from 'styled-components';
import Button from '../button/button';

export enum DifficultyLevel {
  EASY,
  NORMAL,
  HARD,
}
export interface DifficultySetting {
  gameMode: 'countries' | 'flags';
  difficulty: DifficultyLevel;
}

/* eslint-disable-next-line */
export interface DifficultyProps {
  settings: DifficultySetting;
  onDifficultyChange: (setting: DifficultySetting) => void;
}

export function Difficulty(props: DifficultyProps) {
  const setMode = (mode: 'countries' | 'flags') => {
    props.onDifficultyChange({
      gameMode: mode,
      difficulty: props.settings.difficulty,
    });
  };

  const setDifficulty = (difficulty: DifficultyLevel) => {
    props.onDifficultyChange({
      difficulty,
      gameMode: props.settings.gameMode,
    });
  };

  return (
    <Container>
      <Group>
        <GroupedButton active={props.settings.gameMode === 'countries'} onClick={() => setMode('countries')}>
          Countries
        </GroupedButton>
        <GroupedButton active={props.settings.gameMode === 'flags'} onClick={() => setMode('flags')}>
          Flags
        </GroupedButton>
      </Group>
      <Group>
        <GroupedButton
          active={props.settings.difficulty === DifficultyLevel.EASY}
          onClick={() => setDifficulty(DifficultyLevel.EASY)}
        >
          Easy
        </GroupedButton>
        <GroupedButton
          active={props.settings.difficulty === DifficultyLevel.NORMAL}
          onClick={() => setDifficulty(DifficultyLevel.NORMAL)}
        >
          Normal
        </GroupedButton>
        <GroupedButton
          active={props.settings.difficulty === DifficultyLevel.HARD}
          onClick={() => setDifficulty(DifficultyLevel.HARD)}
        >
          Hard
        </GroupedButton>
      </Group>
    </Container>
  );
}

export default Difficulty;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

const Group = styled.div`
  display: flex;
`;

const GroupedButton = styled(Button)`
  width: 15ch;
  &:not(:first-child) {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
  &:not(:last-child) {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
`;
