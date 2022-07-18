import { useState } from 'react';
import styled from 'styled-components';
import Button from '../button/button';

export enum GameMode {
  FIND,
  GUESS,
}
export enum DifficultyLevel {
  EASY,
  NORMAL,
  HARD,
}
export interface DifficultySetting {
  countryCount: number | null;
  gameMode: GameMode;
  difficulty: DifficultyLevel;
}

/* eslint-disable-next-line */
export interface DifficultyProps {
  settings: DifficultySetting;
  onDifficultyChange: (setting: DifficultySetting) => void;
}

export function Difficulty(props: DifficultyProps) {
  const [settings, setSettings] = useState(props.settings);

  const setMode = (mode: GameMode) => {
    const newSettings: DifficultySetting = {
      gameMode: mode,
      countryCount: props.settings.countryCount,
      difficulty: props.settings.difficulty,
    };

    setSettings(newSettings);
    props.onDifficultyChange(newSettings);
  };

  const setDifficulty = (difficulty: DifficultyLevel) => {
    const newSettings: DifficultySetting = {
      difficulty,
      countryCount: props.settings.countryCount,
      gameMode: props.settings.gameMode,
    };

    setSettings(newSettings);

    props.onDifficultyChange(newSettings);
  };

  const setCountryCount = (value: number | null) => {
    const newSettings: DifficultySetting = {
      countryCount: value,
      difficulty: props.settings.difficulty,
      gameMode: props.settings.gameMode,
    };

    setSettings(newSettings);
    props.onDifficultyChange(newSettings);
  };

  const countryCountOptions = [5, 10, 50, null];

  return (
    <Container>
      <Group>
        <GroupedButton active={props.settings.gameMode === GameMode.GUESS} onClick={() => setMode(GameMode.GUESS)}>
          Choices
        </GroupedButton>
        <GroupedButton active={props.settings.gameMode === GameMode.FIND} onClick={() => setMode(GameMode.FIND)}>
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
      <Group>
        {countryCountOptions.map((o) => (
          <SmallGroupedButton key={o} active={props.settings.countryCount === o} onClick={() => setCountryCount(o)}>
            {o ?? 'All'}
          </SmallGroupedButton>
        ))}
      </Group>
      {settings.gameMode === GameMode.GUESS && (
        <p>
          Guess: You will be shown a country on the map and you have to guess the correct one from the four choices.
        </p>
      )}
      {settings.gameMode === GameMode.FIND && <p>Find: You will have to find the country by clicking on the map.</p>}
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

const SmallGroupedButton = styled(GroupedButton)`
  width: 7ch;
`;
