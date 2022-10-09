import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './store';
import App from './components/App';
import './styles/index.scss';
import React from 'react';

const root = document.getElementById('root');

ReactDOM.createRoot(root as HTMLElement).render(
  <Provider store={store}>
    <App />
  </Provider>
);
