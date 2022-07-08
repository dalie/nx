import 'mapbox-gl/dist/mapbox-gl.css';
import { Transition } from 'react-transition-group';
import { useRecoilState } from 'recoil';
import { ANIMATION_DELAY } from './contants';
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
        <Transition in={ui.start} timeout={ANIMATION_DELAY}>
          {(state) => state !== 'exited' && <Start transition={state} />}
        </Transition>
        <Transition in={ui.toolbar} timeout={ANIMATION_DELAY}>
          {(state) => state !== 'exited' && <Toolbar transition={state} />}
        </Transition>
      </Ui>
    </>
  );
}

export default App;
