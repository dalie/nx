import { atom, DefaultValue, selector } from 'recoil';
import { Country } from '../app.state';
interface PlayState {
  currentCountry: Country | null;
  isPlaying: boolean;
}

const defaultState: PlayState = {
  currentCountry: null,
  isPlaying: false,
};

export const playAtom = atom({
  key: 'PlayState',
  default: localStorage.getItem('PlayState')
    ? (JSON.parse(localStorage.getItem('PlayState') ?? '') as PlayState)
    : defaultState,
  effects: [
    ({ onSet }) => {
      onSet((newValue) => {
        const storageItem = localStorage.getItem('PlayState');
        const oldValue = storageItem ? JSON.parse(localStorage.getItem('PlayState') ?? '') : {};

        localStorage.setItem('PlayState', JSON.stringify({ ...oldValue, ...newValue }));
      });
    },
  ],
});

export const playCurrentCountryState = selector({
  key: 'playCurrentCountryState',
  get: ({ get }) => get(playAtom).currentCountry,
  set: ({ get, set }, newValue) => {
    const play = get(playAtom);

    set(playAtom, {
      ...play,
      currentCountry: newValue instanceof DefaultValue ? null : newValue,
    });
  },
});

export const isPlayingState = selector({
  key: 'playIsPlaying',
  get: ({ get }) => get(playAtom).isPlaying,
  set: ({ get, set }, newValue) => {
    const play = get(playAtom);

    set(playAtom, {
      ...play,
      isPlaying: newValue instanceof DefaultValue ? false : newValue,
    });
  },
});
