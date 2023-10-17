import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import types from '../types';
import { encryptor } from '../encryptor';

const initialState = {
  interval: '60',
};

const interval = (state = initialState, { type, payload }) => {
  switch (type) {
    case 'SET_INTERVAL_SUCCESS':
      return { interval: payload };
    case types.LOGOUT_SUCCESS:
      return initialState;
    default:
      return state;
  }
};

const intervalConfig = {
  key: 'MTC_interval',
  storage,
  whitelist: ['interval'],
  transforms: [encryptor],
};
export default persistReducer(intervalConfig, interval);
