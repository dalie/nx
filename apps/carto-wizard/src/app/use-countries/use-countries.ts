import { useMemo } from 'react';
import { useRecoilValue } from 'recoil';
import { countriesState, Country } from '../app.state';
import { DifficultyLevel } from '../difficulty/difficulty';

export function useCountries(difficulty: DifficultyLevel): Country[] {
  const countries = useRecoilValue(countriesState);

  return useMemo(() => {
    switch (difficulty) {
      case DifficultyLevel.EASY:
        return countries?.filter((c) => c.area > 100000 && c.population > 1000000);
      case DifficultyLevel.NORMAL:
        return countries?.filter((c) => c.population > 100000);

      case DifficultyLevel.HARD:
        return countries;
    }
  }, [difficulty, countries]);
}

export default useCountries;
