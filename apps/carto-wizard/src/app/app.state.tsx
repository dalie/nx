import { atom, DefaultValue, selector } from 'recoil';

interface AppState {
  countries?: {
    name: string;
    flag: string;
    code: string;
    latLng: [number, number];
  }[];
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
        const oldValue = JSON.parse(localStorage.getItem('AppState') ?? '');

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
