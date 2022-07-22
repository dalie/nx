import { render } from '@testing-library/react';

import AnimatedRoutes from './animated-routes';

describe('AnimatedRoutes', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AnimatedRoutes />);
    expect(baseElement).toBeTruthy();
  });
});
