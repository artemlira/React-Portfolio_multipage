import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './styles/index.scss';
import ScrollToTop from './components/ScrollToTop';
import Context from './components/Context';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Context>
        <ScrollToTop />
        <App />
      </Context>
    </BrowserRouter>
  </React.StrictMode>,
);
