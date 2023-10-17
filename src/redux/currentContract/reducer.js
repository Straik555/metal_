import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import types from '../types';
import { encryptor } from '../encryptor';

const initialState = {
  contract: 'BTCUSD',
};

const currentContract = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_CURRENT_CONTRACT_SUCCESS:
      return { contract: action.payload };
    case types.LOGOUT_SUCCESS:
      return initialState;
    default:
      return state;
  }
};

const languageConfig = {
  key: 'MTC_currentContract',
  storage,
  whitelist: ['contract'],
  transforms: [encryptor],
};
export default persistReducer(languageConfig, currentContract);
