import { useRecoilState } from 'recoil';
import { uiState } from '../ui/ui.state';

/* eslint-disable-next-line */
export interface ToolbarProps {}

export function Toolbar(props: ToolbarProps) {
  const [ui, setUi] = useRecoilState(uiState);

  const onBtn = () => {
    setUi({
      start: true,
      toolbar: false,
    });
  };

  return (
    <div>
      <button onClick={onBtn}>Stop</button>
    </div>
  );
}

export default Toolbar;
