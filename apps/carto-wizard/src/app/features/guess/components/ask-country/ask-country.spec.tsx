import { render } from '@testing-library/react';
import { AskCountry } from './ask-country';

describe('AskCountry', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <AskCountry
        answer={{}}
        choices={[]}
        hardBonus={false}
        hideName={false}
        maxBonus={0}
        onBonusScore={() => null}
        onCorrectAnswer={() => null}
      />
    );
    expect(baseElement).toBeTruthy();
  });
});
