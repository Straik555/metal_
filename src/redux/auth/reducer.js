import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import types from '../types';
import { encryptor } from '../encryptor';
import { period } from '../../components/Base/Chart/datafeed/historyProvider';

const initialState = {
  clearChart: false,
  loader: false,
  socket_token: false,
  hasAntiphishingPhrase: false,
};

const user = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.LOGIN_START:
      return { ...state, loader: true };
    case types.LOGIN_SUCCESS:
      return { ...payload, loader: false };
    case types.LOGIN_FAILURE:
      return { ...state, loader: false };

    // user information

    case types.GET_USER_DATA_SUCCESS:
      return { ...state, ...payload };

    // uploading/deliting personal documents
    case types.DELETE_DOCUMENTS_START:
    case types.UPDATE_DOCUMENTS_START:
      return { ...state, loadingFile: payload.document_id };

    case types.DELETE_DOCUMENTS_FAILURE:
    case types.UPDATE_DOCUMENTS_FAILURE:
      return { ...state, loadingFile: null };

    case types.DELETE_DOCUMENTS_SUCCESS:
      return {
        ...state,
        clearChart: true,
        loadingFile: null,
        documents: state.documents.map(document =>
          document.id === payload.document_id
            ? { ...document, files: [] } // put empty array
            : document,
        ),
      };

    case types.GET_REFRESH_TOKEN_SUCCESS:
      return { ...state, ...payload };

    case types.UPDATE_DOCUMENTS_SUCCESS: // update file properties in redux state
      return {
        ...state,
        loadingFile: null,
        documents: state.documents.map(document =>
          document.id === state.loadingFile
            ? { ...document, files: [payload] } // put uploaded file
            : document,
        ),
      };

    // update user personal date
    case types.UPDATE_USER_DATA_SUCCESS:
      return { ...state, data: payload };

    case types.LOGOUT_SUCCESS:
      period.clearChart = false;
      return initialState;

    case types.CHECK_USER_ANTIPHISHING_DATA_SUCCESS:
      return {
        ...state,
        hasAntiphishingPhrase: true,
      };
    case types.CHECK_USER_ANTIPHISHING_DATA_FAILURE:
      return {
        ...state,
        hasAntiphishingPhrase: false,
      };

    // indentification KYC
    
    case types.GET_COUNTRIES_IDENTIFICATION_START:
      return { ...state};
    case types.GET_COUNTRIES_IDENTIFICATION_SUCCESS:{
     // debugger
      return { ...state ,countries: [...payload]}};
    case types.GET_COUNTRIES_IDENTIFICATION_FAILURE:
      return { ...state };

    case types.GET_LANGUAGES_IDENTIFICATION_START:
      return { ...state};
    case types.GET_LANGUAGES_IDENTIFICATION_SUCCESS:{
       // debugger
      return { ...state ,languages: [...payload]}};
    case types.GET_LANGUAGES_IDENTIFICATION_FAILURE:
      return { ...state };  

    default:
      return state;
  }
};

const authConfig = {
  key: 'MTC_auth',
  storage,
  white: ['socket_token', 'token', 'token_expired_at'],
  transforms: [encryptor],
};

export default persistReducer(authConfig, user);
// export default user;
