import { atom } from 'recoil';

interface UiState {
  start: boolean;
  toolbar: boolean;
}

const defaultState: UiState = {
  start: true,
  toolbar: false,
};

export const uiState = atom({
  key: 'UiState',
  default: localStorage.getItem('UiState')
    ? (JSON.parse(localStorage.getItem('UiState') ?? '') as UiState)
    : defaultState,
  effects: [
    ({ onSet }) => {
      onSet((newValue) => {
        localStorage.setItem('UiState', JSON.stringify(newValue));
      });
    },
  ],
});
