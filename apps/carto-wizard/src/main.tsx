import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { PopupProvider } from 'react-hook-popup';
import { RecoilRoot } from 'recoil';

import App from './app/app';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <StrictMode>
    <RecoilRoot>
      <PopupProvider>
        <App />
      </PopupProvider>
    </RecoilRoot>
  </StrictMode>
);
