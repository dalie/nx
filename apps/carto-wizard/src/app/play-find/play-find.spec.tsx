import { render } from '@testing-library/react';

import { PlayFind } from './play-find';

describe('PlayFind', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PlayFind />);
    expect(baseElement).toBeTruthy();
  });
});
