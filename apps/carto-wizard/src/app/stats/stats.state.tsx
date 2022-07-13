import { atom, DefaultValue, selector } from 'recoil';

interface StatsState {
  in1: number;
  in2: number;
  in3: number;
  in4: number;
}

interface GameStats {
  countryStats: StatsState;
  flagsStats: StatsState;
}

const defaultStats: GameStats = {
  countryStats: {
    in1: 0,
    in2: 0,
    in3: 0,
    in4: 0,
  },
  flagsStats: {
    in1: 0,
    in2: 0,
    in3: 0,
    in4: 0,
  },
};
export const statsAtom = atom({
  key: 'gameStatsState',
  default: localStorage.getItem('gameStatsState')
    ? (JSON.parse(localStorage.getItem('gameStatsState') ?? '') as GameStats)
    : defaultStats,
  effects: [
    ({ onSet }) => {
      onSet((newValue) => {
        const oldValue = JSON.parse(localStorage.getItem('gameStatsState') ?? '{}');

        localStorage.setItem('gameStatsState', JSON.stringify({ ...oldValue, ...newValue }));
      });
    },
  ],
});

export const countriesState = selector({
  key: 'countriesStats',
  get: ({ get }) => get(statsAtom).countryStats,
  set: ({ get, set }, newValue) => {
    const stats = get(statsAtom);

    set(statsAtom, {
      ...stats,
      countryStats: newValue instanceof DefaultValue ? defaultStats.countryStats : newValue,
    });
  },
});

export const flagsState = selector({
  key: 'flagsStats',
  get: ({ get }) => get(statsAtom).flagsStats,
  set: ({ get, set }, newValue) => {
    const stats = get(statsAtom);

    set(statsAtom, {
      ...stats,
      countryStats: { ...(newValue instanceof DefaultValue ? defaultStats.flagsStats : newValue) },
    });
  },
});
