import { render } from '@testing-library/react';

import AskFlag from './ask-flag';

describe('AskFlag', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AskFlag />);
    expect(baseElement).toBeTruthy();
  });
});
