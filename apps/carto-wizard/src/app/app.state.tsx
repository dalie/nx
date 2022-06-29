import { atom } from 'recoil';

interface AppState {
  ui: {
    start: boolean;
    toolbar: boolean;
  };
}

const defaultState: AppState = {
  ui: {
    start: true,
    toolbar: false,
  },
};

export const appState = atom({
  key: 'AppState',
  default: localStorage.getItem('AppState')
    ? (JSON.parse(localStorage.getItem('AppState') ?? '') as AppState)
    : defaultState,
  effects: [
    ({ onSet }) => {
      onSet((newValue) => {
        localStorage.setItem('AppState', JSON.stringify(newValue));
      });
    },
  ],
});
