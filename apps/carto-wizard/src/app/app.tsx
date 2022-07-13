import 'mapbox-gl/dist/mapbox-gl.css';
import { useEffect } from 'react';
import { MapProvider } from 'react-map-gl';
import { BrowserRouter } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import AnimatedRoutes from './animated-routes/animated-routes';
import { countriesState, Country } from './app.state';
import { COUNTRIES_API_URL } from './contants';
import Map from './map/map';
import Ui from './ui/ui';

export function App() {
  const [countries, setCountries] = useRecoilState<Country[] | undefined>(countriesState);

  useEffect(() => {
    if (!countries || countries.length === 0) {
      const fetchCountries = async () => {
        const response = await fetch(COUNTRIES_API_URL);
        const countries = await response.json();

        setCountries(
          countries.map((c: Country) => ({ ...c, flag: `https://flagcdn.com/${c.code2.toLowerCase()}.svg` }))
        );
      };

      fetchCountries();
    }
  }, [countries, setCountries]);

  return (
    <BrowserRouter>
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
