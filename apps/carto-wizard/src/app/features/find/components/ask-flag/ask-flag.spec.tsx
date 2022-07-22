import { render } from '@testing-library/react';
import { AskFlag } from './ask-flag';

describe('AskFlag', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AskFlag answer={{}} onCorrectAnswer={() => null} onGiveUp={() => null} />);
    expect(baseElement).toBeTruthy();
  });
});
