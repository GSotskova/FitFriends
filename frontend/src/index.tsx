import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import {store} from './store';
import HistoryRouter from '../src/components/history-route/history-route';
import browserHistory from './browser-history';
import { checkAuthAction } from './store/api-actions-user';
import 'react-toastify/dist/ReactToastify.css';


store.dispatch(checkAuthAction());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <Provider store = {store}>
    <HistoryRouter history={browserHistory}>
      <App/>
      <ToastContainer />
    </HistoryRouter>
  </Provider>
);

