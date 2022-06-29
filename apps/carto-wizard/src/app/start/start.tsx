import { useRecoilState } from 'recoil';
import Modal from '../modal/modal';
import { uiState } from '../ui/ui.state';

/* eslint-disable-next-line */
export interface StartProps {}

export function Start(props: StartProps) {
  const [ui, setUi] = useRecoilState(uiState);

  const onBtn = () => {
    setUi({
      start: false,
      toolbar: true,
    });
  };

  return (
    <Modal>
      <button onClick={onBtn}>Start</button>
    </Modal>
  );
}

export default Start;
