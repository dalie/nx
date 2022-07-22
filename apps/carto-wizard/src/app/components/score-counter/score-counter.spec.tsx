import { render } from '@testing-library/react';

import ScoreCounter from './score-counter';

describe('ScoreCounter', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ScoreCounter />);
    expect(baseElement).toBeTruthy();
  });
});
