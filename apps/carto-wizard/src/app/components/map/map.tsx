import { DifficultyLevel, GameMode } from 'app/features/settings';
import { difficultySettingsState } from 'app/store';
import { MapboxEvent, MapboxGeoJSONFeature, MapLayerMouseEvent, MapMouseEvent } from 'mapbox-gl';
import { useCallback, useEffect, useState } from 'react';
import MapGl, { Layer, LayerProps, Source } from 'react-map-gl';
import { useRecoilValue } from 'recoil';

interface MapInteractivitySettings {
  boxZoom?: boolean;
  doubleClickZoom?: boolean;
  dragRotate?: boolean;
  dragPan?: boolean;
  keyboard?: boolean;
  scrollZoom?: boolean;
  touchPitch?: boolean;
  touchZoomRotate?: boolean;
}
/* eslint-disable-next-line */
export interface MapProps {
  location: [number, number];
}

export function Map(props: MapProps) {
  const gameSettings = useRecoilValue(difficultySettingsState);
  const [hoveredFeature, setHoveredFeature] = useState<MapboxGeoJSONFeature | null>(null);
  const [mapSettings, setMapSettings] = useState<MapInteractivitySettings>({});

  useEffect(() => {
    if (gameSettings.gameMode === GameMode.GUESS && gameSettings.difficulty === DifficultyLevel.HARD) {
      setMapSettings({
        boxZoom: false,
        doubleClickZoom: false,
        dragRotate: false,
        dragPan: false,
        keyboard: false,
        scrollZoom: false,
        touchPitch: false,
        touchZoomRotate: false,
      });
    } else {
      setMapSettings({});
    }
  }, [gameSettings]);

  const onMapLoad = (e: MapboxEvent) => {
    e.target.setFog({});
  };

  const onMapClick = (e: MapMouseEvent) => {
    console.log(e.lngLat);
  };

  const layerStyles: LayerProps = {
    id: 'countries',
    interactive: true,
    type: 'fill',
    paint: {
      'fill-outline-color': '#f00',
      'fill-color': ['case', ['boolean', ['feature-state', 'hover'], false], 'rgba(255,0,0,0.75)', 'rgba(255,0,0,0)'],
    },
    source: 'countries_source',
    'source-layer': 'processed',
  };

  // const onMapMouseMove = useCallback(
  //   (event: MapLayerMouseEvent) => {
  //     const country = event.features && event.features[0];
  //     if (hoveredFeature && hoveredFeature.id !== country?.id) {
  //       event.target.setFeatureState(hoveredFeature, { hover: false });
  //       setHoveredFeature(null);
  //     }
  //     if (country && country.id !== hoveredFeature?.id) {
  //       event.target.setFeatureState(country, { hover: true });
  //       setHoveredFeature(country);
  //       //console.log(country);
  //     }
  //   },
  //   [hoveredFeature]
  // );

  return (
    <MapGl
      id="gameMap"
      interactiveLayerIds={['countries']}
      mapboxAccessToken="pk.eyJ1IjoiZG9taW5pY2FsaWUiLCJhIjoiY2tuZzJ0YWtvMDcwejJxczlwa2NtbW0zeSJ9.ire3NMM19l7z4Zeqa20RVw"
      initialViewState={{
        longitude: -10,
        latitude: 25,
        zoom: 1.75,
      }}
      maxZoom={8}
      minZoom={1.75}
      style={{ width: '100%', height: '100%' }}
      mapStyle="mapbox://styles/dominicalie/cktkdp5ye4yre17pb7tiy8yvs"
      onLoad={onMapLoad}
      onClick={onMapClick}
      maxPitch={0}
      //onMouseMove={onMapMouseMove}
      //onMouseOut={() => setHoveredFeature(null)}
      {...mapSettings}
    >
      <Source id="countries_source" type="vector" url="mapbox://dominicalie.6qx7hy0c">
        <Layer {...layerStyles} />
      </Source>
    </MapGl>
  );
}

export default Map;
