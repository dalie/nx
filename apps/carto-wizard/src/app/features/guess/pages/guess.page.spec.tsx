import { render } from '@testing-library/react';
import { GuessPage } from './guess.page';

describe('GuessPage', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<GuessPage />);
    expect(baseElement).toBeTruthy();
  });
});
