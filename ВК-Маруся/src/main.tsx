import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './assets/styles/global.scss';
import App from './app/App';
import { Provider } from 'react-redux';
// ИСКЛЮЧЕНИЕ: импорт store instance из app слоя необходим для Provider
import { store } from './app/store';

const AppComponent = (
  <Provider store={store}>
    <App />
  </Provider>
);

createRoot(document.getElementById('root')!).render(
  import.meta.env.DEV ? <StrictMode>{AppComponent}</StrictMode> : AppComponent,
);
