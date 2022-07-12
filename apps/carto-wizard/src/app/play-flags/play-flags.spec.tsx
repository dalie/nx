import { render } from '@testing-library/react';

import PlayFlags from './play-flags';

describe('PlayFlags', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PlayFlags />);
    expect(baseElement).toBeTruthy();
  });
});
