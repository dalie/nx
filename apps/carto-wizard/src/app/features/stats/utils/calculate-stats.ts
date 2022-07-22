import { DifficultyLevel, GameMode } from 'app/features/settings';
import { AnswerStat, GameStat } from '../hooks';

export function calculateScore(attempts: number): number {
  switch (attempts) {
    case 1:
      return 100;
    case 2:
      return 50;
    case 3:
      return 25;
    default:
      return 0;
  }
}

export function calculateStats(gameStats: GameStat[], gameMode: GameMode, difficulty: DifficultyLevel) {
  const answers = gameStats
    .filter((gs) => gs.mode === gameMode && gs.difficulty === difficulty)
    .reduce((p: AnswerStat[], c) => {
      return [...p, ...c.answers];
    }, []);

  return (answers.reduce((p, c) => p + calculateScore(c[1]), 0) / (answers.length * 100)) * 100;
}
