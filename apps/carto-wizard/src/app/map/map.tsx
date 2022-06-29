import { MapboxEvent } from 'mapbox-gl';
import MapGl from 'react-map-gl';

/* eslint-disable-next-line */
export interface MapProps {}

export function Map(props: MapProps) {
  const onMapLoad = (e: MapboxEvent) => {
    e.target.setFog({});
  };

  return (
    <MapGl
      mapboxAccessToken="pk.eyJ1IjoiZG9taW5pY2FsaWUiLCJhIjoiY2tuZzJ0YWtvMDcwejJxczlwa2NtbW0zeSJ9.ire3NMM19l7z4Zeqa20RVw"
      projection={'globe'}
      initialViewState={{
        longitude: -10,
        latitude: 25,
        zoom: 1.75,
      }}
      style={{ width: '100%', height: '100%' }}
      mapStyle="mapbox://styles/dominicalie/cl4zzsuun001i14mmeoqo5f28"
      onLoad={onMapLoad}
    />
  );
}

export default Map;
