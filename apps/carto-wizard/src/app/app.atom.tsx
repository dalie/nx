import { atom } from 'recoil';

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
        const oldValue = localStorage.getItem('AppState');

        localStorage.setItem('AppState', JSON.stringify(newValue));
      });
    },
  ],
});
