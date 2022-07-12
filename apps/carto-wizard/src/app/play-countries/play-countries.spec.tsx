import { render } from '@testing-library/react';

import PlayCountries from './play-countries';

describe('PlayCountries', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PlayCountries />);
    expect(baseElement).toBeTruthy();
  });
});
