import { useEffect, useState } from 'react';
import { usePopup } from 'react-hook-popup';

export function App() {
  const [showPopup, closePopup] = usePopup('test', () => <h1>test</h1>);

  const [showPopupState, setShowPopupState] = useState(false);

  useEffect(() => {
    if (showPopupState) {
      showPopup();
    } else {
      closePopup();
    }
  }, [showPopup, closePopup, showPopupState]);
  return (
    <button onClick={() => setShowPopupState(!showPopupState)}>
      Show Alert
    </button>
  );
}

export default App;
