import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import types from '../types';
import { encryptor } from '../encryptor';

const initialState = {
  pairs: {},
  loading: false,
};

const formDecimals = arr => {
  return arr.reduce((acc, item) => {
    acc[item?.code] = item?.view_decimal;
    return acc;
  }, {});
};

const decimals = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.GET_ASSET_PAIRS_START:
    case types.GET_SPOT_ASSET_PAIRS_START:
      return {
        ...state,
        loading: true,
      };

    case types.GET_SPOT_ASSET_PAIRS_SUCCESS:
    case types.GET_ASSET_PAIRS_SUCCESS:
      return {
        ...state,
        loading: false,
        pairs: formDecimals(payload),
      };

    case types.UPDATE_ASSET_PAIRS:
      return {
        ...state,
        pairs: formDecimals(payload),
      };
    default:
      return state;
  }
};

const decimalsConfig = {
  key: 'MTC_decimals__pairs',
  storage,
  whitelist: ['pairs'],
  transforms: [encryptor],
};
export default persistReducer(decimalsConfig, decimals);
