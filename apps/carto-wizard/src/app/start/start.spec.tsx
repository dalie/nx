import { render } from '@testing-library/react';

import Start from './start';

describe('Start', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Start />);
    expect(baseElement).toBeTruthy();
  });
});
