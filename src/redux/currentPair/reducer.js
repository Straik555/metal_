import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import types from '../types';
import { encryptor } from '../encryptor';

const initialState = {
  pair: 'btc_usdt',
};

const currentPair = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.SET_CURRENT_PAIR_SUCCESS:
      return { pair: payload };
    case types.LOGOUT_SUCCESS: {
      return initialState;
    }
    default:
      return state;
  }
};

const currentPairConfig = {
  key: 'MTC_currentPair',
  storage,
  whitelist: ['pair'],
  transforms: [encryptor],
};
export default persistReducer(currentPairConfig, currentPair);
