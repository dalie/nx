import { render } from '@testing-library/react';
import { ScoreCounter } from './score-counter';

describe('ScoreCounter', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ScoreCounter bonus={0} value={0} />);
    expect(baseElement).toBeTruthy();
  });
});
