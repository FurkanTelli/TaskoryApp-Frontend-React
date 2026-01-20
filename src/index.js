import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
// import 'primereact/resources/themes/lara-light-blue/theme.css';  // Tema
import 'primereact/resources/primereact.css';                     // PrimeReact stil
import 'primeicons/primeicons.css';                               // İkonlar
import 'primeflex/primeflex.css';                                 // Flex yardımcı sınıfları
import './index.css';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { BrowserRouter } from 'react-router-dom';
import { PrimeReactProvider } from 'primereact/api';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <PrimeReactProvider>
          <App />
        </PrimeReactProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);


