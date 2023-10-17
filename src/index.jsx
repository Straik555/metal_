import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, useHistory } from 'react-router-dom';
import { Provider, useDispatch } from 'react-redux';
import { NotificationContainer } from 'react-notifications';
import { PersistGate } from 'redux-persist/integration/react';
import App from './components/App';
import './styles/css/index.css';
import 'react-phone-input-2/lib/style.css';
import { store, persistor } from './redux/store';
import { axiosInterceptors } from './services/axiosInterceptors';
import Loader from './components/Base/Loader';

import '../node_modules/react-grid-layout/css/styles.css';
import '../node_modules/react-resizable/css/styles.css';

console.log(
  `%cBuild version: ${process.env.REACT_APP_VERSION || 'localhost'}`,
  'color: #0B6623; background: #000; padding: 15px 50px; font-size: 16px;',
);

export const Index = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  axiosInterceptors({ history, dispatch });
  return (
    <>
      <App />
      <NotificationContainer />
    </>
  );
};

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={<Loader />} persistor={persistor}>
      <BrowserRouter>
        <Index />
      </BrowserRouter>
    </PersistGate>
  </Provider>,
  document.getElementById('root'),
);
