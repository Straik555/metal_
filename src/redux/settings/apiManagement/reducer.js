import types from '../../types';

const initialState = {
  APIkey: [],
  loading: false,
};

const APIManagement = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.GET_TOKENS_START:
    case types.CREATE_TOKENS_START:
    case types.DISABLE_TOKENS_START:
    case types.DELETE_TOKENS_START:
      return { ...state, loading: true };
    case types.GET_TOKENS_SUCCESS:
      return { loading: false, APIkey: payload };
    case types.CREATE_TOKENS_SUCCESS:
      return { APIkey: [payload, ...state.APIkey], loading: false };
    case types.DISABLE_TOKENS_SUCCESS:
      return { APIkey: payload, loading: false };
    case types.DELETE_TOKENS_SUCCESS:
      return { loading: false, APIkey: payload };
    case types.GET_TOKENS_FAILURE:
    case types.CREATE_TOKENS_FAILURE:
    case types.DISABLE_TOKENS_FAILURE:
    case types.DELETE_TOKENS_FAILURE:
      return { ...state, loading: false };
    case types.LOGOUT_SUCCESS:
      return initialState;
    default:
      return state;
  }
};

export default APIManagement;
