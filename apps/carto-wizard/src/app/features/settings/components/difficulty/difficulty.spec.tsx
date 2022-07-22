import { render } from '@testing-library/react';
import { Difficulty, DifficultyLevel, GameMode } from './difficulty';

describe('Difficulty', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <Difficulty
        onDifficultyChange={() => null}
        settings={{
          countryCount: 0,
          difficulty: DifficultyLevel.EASY,
          gameMode: GameMode.FIND,
        }}
      />
    );
    expect(baseElement).toBeTruthy();
  });
});
