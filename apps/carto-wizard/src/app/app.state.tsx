import { atom, DefaultValue, selector } from 'recoil';

export type Country = {
  name: string;
  flags: string;
  code: string;
  latLng: [number, number];
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
