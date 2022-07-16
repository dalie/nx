import { render } from '@testing-library/react';

import { PlayGuess } from './play-guess';

describe('PlayCountries', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PlayGuess />);
    expect(baseElement).toBeTruthy();
  });
});
