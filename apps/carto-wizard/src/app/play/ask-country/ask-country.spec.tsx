import { render } from '@testing-library/react';

import AskCountry from './ask-country';

describe('AskCountry', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AskCountry />);
    expect(baseElement).toBeTruthy();
  });
});
