import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import types from '../types';
import { encryptor } from '../encryptor';

const language = (state = { language: 'EN' }, { type, payload }) => {
  switch (type) {
    case types.SET_LANGUAGE_SUCCESS:
      return { language: payload };
    default:
      return state;
  }
};

const languageConfig = {
  key: 'MTC_language',
  storage,
  whitelist: ['language'],
  transforms: [encryptor],
};
export default persistReducer(languageConfig, language);
