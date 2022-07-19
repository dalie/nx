import { Feature, FeatureCollection, Position } from 'geojson';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useEffect } from 'react';
import { MapProvider } from 'react-map-gl';
import { BrowserRouter } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { environment } from '../environments/environment';
import AnimatedRoutes from './animated-routes/animated-routes';
import { countriesState, Country } from './app.state';
import { COUNTRIES_API_URL } from './contants';
import Map from './map/map';
import Ui from './ui/ui';

interface FeatureProperties {
  name: string;
  alpha2Code: string;
  alpha3Code: string;
  capital: string;
  region: string;
  subregion: string;
  population: number;
  latlng: [number, number];
  area: number;
  borders: string[];
  flag: string;
  capitalLngLat: [string, string];
  lngLat: [number, number];
}

export function App() {
  const [countries, setCountries] = useRecoilState(countriesState);

  const toCountry = (f: Feature) => {
    const calculateBounds = (feature: Feature) => {
      const coordinates: Position[] = [];
      if (feature.geometry.type === 'Polygon') {
        coordinates.push(...feature.geometry.coordinates[0]);
      } else if (feature.geometry.type === 'MultiPolygon') {
        feature.geometry.coordinates.forEach((g) =>
          g.forEach((p) => {
            coordinates.push(...p);
          })
        );
      }

      const bounds = {
        sw: [coordinates[0][0], coordinates[0][1]],
        ne: [coordinates[0][0], coordinates[0][1]],
      };

      coordinates.forEach((c) => {
        if (c[0] < bounds.sw[0]) {
          bounds.sw[0] = c[0];
        }

        if (c[0] > bounds.ne[0]) {
          bounds.ne[0] = c[0];
        }

        if (c[1] < bounds.sw[1]) {
          bounds.sw[1] = c[1];
        }

        if (c[1] > bounds.ne[1]) {
          bounds.ne[1] = c[1];
        }
      });
      return bounds;
    };

    const properties = f.properties as FeatureProperties;

    //flag: `https://flagcdn.com/${c.code2.toLowerCase()}.svg`;
    return {
      id: f.id,
      area: properties.area,
      borders: properties.borders,
      bounds: calculateBounds(f),
      capital: properties.capital,
      capitalLngLat: properties.capitalLngLat
        ? [(parseFloat(properties.capitalLngLat[0] ?? 0), parseFloat(properties.capitalLngLat[1] ?? 0))]
        : [0, 0],
      code2: properties.alpha2Code,
      code3: properties.alpha3Code,
      flag: `https://flagcdn.com/${properties.alpha2Code.toLowerCase()}.svg`,
      lngLat: properties.lngLat,
      name: properties.name,
      population: properties.population,
      region: properties.region,
      subregion: properties.subregion,
    } as Country;
  };
  useEffect(() => {
    if (!countries || countries.length === 0) {
      const fetchCountries = async () => {
        const response = await fetch(COUNTRIES_API_URL);
        const features: FeatureCollection = await response.json();

        setCountries(features.features.map((f) => toCountry(f)));
      };

      fetchCountries();
    }
  }, [countries, setCountries]);

  return (
    <BrowserRouter basename={environment.baseUrl}>
      <MapProvider>
        <Map location={[0, 0]} />
        <Ui>
          <AnimatedRoutes />
        </Ui>
      </MapProvider>
    </BrowserRouter>
  );
}

export default App;
