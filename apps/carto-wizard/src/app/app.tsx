import 'mapbox-gl/dist/mapbox-gl.css';
import { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import AnimatedRoutes from './animated-routes/animated-routes';
import { countriesState } from './app.state';
import { COUNTRIES_API_URL } from './contants';
import Map from './map/map';
import Ui from './ui/ui';

interface JsonCountry {
  cca2: string;
  name: { common: string };
  flags: { svg: string };
  latLng: [number, number];
}

export function App() {
  const [countries, setCountries] = useRecoilState(countriesState);

  useEffect(() => {
    if (!countries || countries.length === 0) {
      const fetchCountries = async () => {
        const response = await fetch(COUNTRIES_API_URL);
        const countries = await response.json();

        setCountries(
          countries.map((c: JsonCountry) => ({
            code: c.cca2,
            name: c.name.common,
            flags: c.flags.svg,
            latLng: c.latLng,
          }))
        );
      };

      fetchCountries();
    }
  }, [countries, setCountries]);

  return (
    <BrowserRouter>
      <Map />
      <Ui>
        <AnimatedRoutes />
      </Ui>
    </BrowserRouter>
  );
}

export default App;
