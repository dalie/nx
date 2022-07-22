import { ViewState } from 'react-map-gl';
import { atom, DefaultValue, selector } from 'recoil';

export interface MapState {
  style: string;
  viewState: Partial<ViewState>;
}

const defaultState: MapState = {
  style: 'mapbox://styles/dominicalie/cl4zzsuun001i14mmeoqo5f28',
  viewState: {
    latitude: 0,
    longitude: 0,
    zoom: 1.5,
  },
};

export const mapAtom = atom({
  key: 'MapState',
  default: localStorage.getItem('MapState')
    ? (JSON.parse(localStorage.getItem('MapState') ?? '') as MapState)
    : defaultState,
  effects: [
    ({ onSet }) => {
      onSet((newValue) => {
        const oldValue = JSON.parse(localStorage.getItem('MapState') ?? '{}');

        localStorage.setItem('MapState', JSON.stringify({ ...oldValue, ...newValue }));
      });
    },
  ],
});

export const mapViewState = selector({
  key: 'mapViewState',
  get: ({ get }) => get(mapAtom).viewState,
  set: ({ get, set }, newValue) => {
    const map = get(mapAtom);

    set(mapAtom, {
      ...map,
      viewState: newValue instanceof DefaultValue ? defaultState.viewState : newValue,
    });
  },
});
