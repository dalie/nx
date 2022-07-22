import { render } from '@testing-library/react';

import { GuessPage } from './guess.page';

describe('PlayGuess', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<GuessPage />);
    expect(baseElement).toBeTruthy();
  });
});
