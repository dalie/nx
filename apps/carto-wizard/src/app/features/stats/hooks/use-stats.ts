import { DifficultyLevel, GameMode } from 'app/features/settings';
import { atom, useRecoilState } from 'recoil';

export type AnswerStat = [number | string, number]; //[countryId, attempts]

export interface GameStat {
  mode: GameMode;
  difficulty: DifficultyLevel;
  answers: AnswerStat[];
}

const statsAtom = atom({
  key: 'gameStatsState',
  default: JSON.parse(localStorage.getItem('gameStatsState') ?? '[]') as GameStat[],
  effects: [
    ({ onSet }) => {
      onSet((newValue) => {
        localStorage.setItem('gameStatsState', JSON.stringify(newValue));
      });
    },
  ],
});

export function useStats(): [GameStat[], (gameStat: GameStat) => void] {
  const [stats, setStats] = useRecoilState(statsAtom);

  const addStats = (gameStat: GameStat) => {
    setStats((oldValue) => [...oldValue, gameStat]);
  };
  return [stats, addStats];
}
