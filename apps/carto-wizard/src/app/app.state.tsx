import { atom, DefaultValue, selector } from 'recoil';

export type Country = {
  area: number;
  bounds: { sw: [number, number]; ne: [number, number] };
  borders: string[];
  capital: string;
  capitalLngLat: [number, number];
  code2: string;
  code3: string;
  flag: string;
  id: number | string;
  lngLat: [number, number];
  name: string;
  population: number;
  region: string;
  subregion: string;
};
interface AppState {
  countries?: Country[];
}

const defaultState: AppState = {
  countries: [],
};

export const appAtom = atom({
  key: 'AppState',
  default: localStorage.getItem('AppState')
    ? (JSON.parse(localStorage.getItem('AppState') ?? '') as AppState)
    : defaultState,
  effects: [
    ({ onSet }) => {
      onSet((newValue) => {
        const oldValue = JSON.parse(localStorage.getItem('AppState') ?? '{}');

        localStorage.setItem('AppState', JSON.stringify({ ...oldValue, ...newValue }));
      });
    },
  ],
});

export const countriesState = selector({
  key: 'appCountriesState',
  get: ({ get }) => get(appAtom).countries,
  set: ({ get, set }, newValue) => {
    const app = get(appAtom);

    set(appAtom, {
      ...app,
      countries: newValue instanceof DefaultValue ? [] : newValue,
    });
  },
});
