import { useState } from 'react';
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
  const [settings, setSettings] = useState(props.settings);

  const setMode = (mode: 'countries' | 'flags') => {
    const newSettings: DifficultySetting = {
      gameMode: mode,
      difficulty: props.settings.difficulty,
    };

    setSettings(newSettings);
    props.onDifficultyChange(newSettings);
  };

  const setDifficulty = (difficulty: DifficultyLevel) => {
    const newSettings: DifficultySetting = {
      difficulty,
      gameMode: props.settings.gameMode,
    };

    setSettings(newSettings);
    props.onDifficultyChange(newSettings);
  };

  return (
    <Container>
      <Group>
        <GroupedButton active={props.settings.gameMode === 'countries'} onClick={() => setMode('countries')}>
          Choices
        </GroupedButton>
        <GroupedButton active={props.settings.gameMode === 'flags'} onClick={() => setMode('flags')}>
          Find
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
      {settings.gameMode === 'countries' && (
        <p>
          Choices: You will be shown a country on the map and you have to guess the correct one from the four choices.
        </p>
      )}
      {settings.gameMode === 'flags' && <p>Find: You will have to find the country by clicking on the map.</p>}
      {settings.difficulty === DifficultyLevel.EASY && <p>Easy: Only large and populous countries.</p>}
      {settings.difficulty === DifficultyLevel.NORMAL && <p>Normal: Only countries over 100,000 in population.</p>}
      {settings.difficulty === DifficultyLevel.HARD && <p>Hard: All countries and only the flag is shown.</p>}
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

  @media (max-width: 700px) {
    width: 13ch;
  }
`;
