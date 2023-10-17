import types from '../../types';

const initialState = { discounts: null, settings: null };
export default (state = initialState, { type, payload }) => {
  switch (type) {
    case types.GET_DASHBOARD_START:
      return { ...state, settings: null };

    case types.GET_DASHBOARD_FAILURE:
      return { ...state };

    case types.GET_DASHBOARD_SUCCESS:
      return { ...state, settings: payload };

    case types.GET_TOKEN_DISKOUNT_SUCCESS:
    case types.UPDATE_TOKEN_DISKOUNT_SUCCESS:
      return { ...state, discounts: payload };
    case types.LOGOUT_SUCCESS:
      return initialState;
    default:
      return state;
  }
};
