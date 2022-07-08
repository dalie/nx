import { atom, DefaultValue, selector } from 'recoil';

interface UiState {
  start?: boolean;
  toolbar?: boolean;
  timer?: boolean;
}

const defaultState: UiState = {
  start: true,
  toolbar: false,
  timer: true,
};

export const uiAtom = atom({
  key: 'UiState',
  default: localStorage.getItem('UiState')
    ? (JSON.parse(localStorage.getItem('UiState') ?? '') as UiState)
    : defaultState,
  effects: [
    ({ onSet }) => {
      onSet((newValue) => {
        const storageItem = localStorage.getItem('UiState');
        const oldValue = storageItem
          ? JSON.parse(localStorage.getItem('UiState') ?? '')
          : {};

        localStorage.setItem(
          'UiState',
          JSON.stringify({ ...oldValue, ...newValue })
        );
      });
    },
  ],
});

export const uiStartState = selector({
  key: 'uiStartState',
  get: ({ get }) => {
    const ui = get(uiAtom);
    return ui.start;
  },
  set: ({ get, set }, newValue) => {
    const ui = get(uiAtom);

    set(uiAtom, {
      ...ui,
      start: newValue instanceof DefaultValue ? false : newValue,
    });
  },
});

export const uiToolbarState = selector({
  key: 'uiToolbarState',
  get: ({ get }) => {
    const ui = get(uiAtom);
    return ui.toolbar;
  },
  set: ({ get, set }, newValue) => {
    const ui = get(uiAtom);

    set(uiAtom, {
      ...ui,
      toolbar: newValue instanceof DefaultValue ? false : newValue,
    });
  },
});
