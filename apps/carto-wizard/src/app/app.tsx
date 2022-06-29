import 'mapbox-gl/dist/mapbox-gl.css';
import { useRecoilState } from 'recoil';
import Map from './map/map';
import Start from './start/start';
import Toolbar from './toolbar/toolbar';
import Ui from './ui/ui';
import { uiState } from './ui/ui.state';

export function App() {
  const [ui] = useRecoilState(uiState);
  return (
    <>
      <Map />
      <Ui>
        {ui.start && <Start />}
        {ui.toolbar && <Toolbar />}
      </Ui>
    </>
  );
}

export default App;
