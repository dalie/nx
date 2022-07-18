import { useMemo } from 'react';
import { useRecoilValue } from 'recoil';
import { countriesState, Country } from '../app.state';
import { DifficultyLevel } from '../difficulty/difficulty';

export function useCountries(difficulty: DifficultyLevel, count: number | null = null): Country[] {
  const countries = useRecoilValue(countriesState);

  return useMemo(() => {
    let filteredCountries: Country[];

    switch (difficulty) {
      case DifficultyLevel.EASY:
        filteredCountries = countries?.filter((c) => c.area > 100000 && c.population > 1000000);
        break;
      case DifficultyLevel.NORMAL:
        filteredCountries = countries?.filter((c) => c.population > 100000);
        break;
      case DifficultyLevel.HARD:
        filteredCountries = countries;
        break;
    }

    return count ? filteredCountries.slice(0, count) : filteredCountries;
  }, [difficulty, count, countries]);
}

export default useCountries;
