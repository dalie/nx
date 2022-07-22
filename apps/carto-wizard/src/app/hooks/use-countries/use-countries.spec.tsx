import { act, renderHook } from '@testing-library/react';
import * as React from 'react';

import useCountries from './use-countries';

describe('useCountries', () => {
  it('should render successfully', () => {
    const { result } = renderHook(() => useCountries());

    expect(result.current.count).toBe(0);

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(1);
  });
});
