import { render } from '@testing-library/react';

import { StatsPage } from './stats.page';

describe('StatsPage', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<StatsPage />);
    expect(baseElement).toBeTruthy();
  });
});
