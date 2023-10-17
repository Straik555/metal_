import types from '../../types';

const initialState = {
  rate: '',
  exchangesData: null,
  loading: false,
};

const instanceExchange = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.GET_EXCHANGE_HISTORY_START:
      return { ...state, loading: true };
    case types.EXCHANGE_RATE_SUCCESS:
      return { ...state, loading: false, rate: payload.rate };
    case types.GET_EXCHANGE_HISTORY_SUCCESS:
      return { ...state, loading: false, exchangesData: payload };
    case types.EXCHANGE_RATE_FAILURE:
    case types.GET_EXCHANGE_HISTORY_FAILURE:
      return { ...state, loading: false };
    case types.LOGOUT_SUCCESS:
      return initialState;
    default:
      return state;
  }
};

export default instanceExchange;
