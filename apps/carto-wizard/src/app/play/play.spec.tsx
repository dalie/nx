import { render } from '@testing-library/react';

import Play from './play';

describe('Play', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Play />);
    expect(baseElement).toBeTruthy();
  });
});
