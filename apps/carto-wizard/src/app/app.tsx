import 'mapbox-gl/dist/mapbox-gl.css';
import { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import AnimatedRoutes from './animated-routes/animated-routes';
import { appAtom } from './app.atom';
import { COUNTRIES_API_URL } from './contants';
import Map from './map/map';
import Ui from './ui/ui';

export function App() {
  const setAppState = useSetRecoilState(appAtom);

  useEffect(() => {
    const fetchCountries = async () => {
      const response = await fetch(COUNTRIES_API_URL);
      const countries = await response.json();

      setAppState((currentState) => {
        return {
          ...currentState,
          countries,
        };
      });
    };

    fetchCountries();
  }, [setAppState]);

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
