import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BabyInfoProvider } from './context/BabyInfoContext.jsx';
import { RecordProvider } from './context/RecordContext';
import Alert from './components/Alert';

import Router from './routes';

import './config/i18n.js';
import './styles/global.scss';

import { AlertProvider } from './context/Alert';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AlertProvider>
    <RecordProvider>
    <BabyInfoProvider>
    <Alert />
      <Router />
      </BabyInfoProvider>
      </RecordProvider>
    </AlertProvider>
  </StrictMode>,
);
