import { render } from '@testing-library/react';

import Difficulty from './difficulty';

describe('Difficulty', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Difficulty />);
    expect(baseElement).toBeTruthy();
  });
});
