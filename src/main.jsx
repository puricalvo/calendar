import React, { Suspense } from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from'./i18n';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from "react-router-dom";



import { Calendario } from './Calendario';
import { store } from './store';
import './styles.css';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <I18nextProvider i18n={i18n} >
        <Provider store={store}>
          <BrowserRouter>
          <Suspense fallback={<h1>Cargando......</h1>}>
            <Calendario />
          </Suspense>
          </BrowserRouter>
        </Provider> 
      </I18nextProvider>
  </React.StrictMode>
)
