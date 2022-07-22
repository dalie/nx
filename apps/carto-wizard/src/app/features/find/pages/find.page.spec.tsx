import { render } from '@testing-library/react';
import { FindPage } from './find.page';

describe('FindPage', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FindPage />);
    expect(baseElement).toBeTruthy();
  });
});
