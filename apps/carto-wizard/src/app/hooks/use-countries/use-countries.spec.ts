import { act, renderHook } from '@testing-library/react';
import { DifficultyLevel } from '../../features/settings/components';
import { useCountries } from './use-countries';

describe('useCountries', () => {
  it('should render successfully', () => {
    const { result } = renderHook(() => useCountries(DifficultyLevel.EASY));

    expect(result.current).toBe(104);
  });
});
