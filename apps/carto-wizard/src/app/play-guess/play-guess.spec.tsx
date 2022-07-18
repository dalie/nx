import { render } from '@testing-library/react';

import { PlayGuess } from './play-guess';

describe('PlayGuess', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PlayGuess />);
    expect(baseElement).toBeTruthy();
  });
});
