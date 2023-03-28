import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './styles/index.scss';
import ScrollToTop from './components/ScrollToTop';
import Context from './components/Context';
import './i18n';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Suspense fallback={<div className="loading">Loading...</div>}>
      <BrowserRouter>
        <Context>
          <ScrollToTop />
          <App />
        </Context>
      </BrowserRouter>
    </Suspense>
  </React.StrictMode>,
);
