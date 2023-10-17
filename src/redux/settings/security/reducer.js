import types from '../../types';

const initialState = {
  securityData: [],
  secretKey: null,
  loader: false,
};

const UserSecurityData = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.GET_USER_SECURITY_DATA_START:
    case types.GET_SECRET_KEY_START:
      return { ...state, loader: true };
    case types.GET_USER_SECURITY_DATA_SUCCESS:
      return { ...state, securityData: payload, loader: false };
    case types.GET_SECRET_KEY_SUCCESS:
      return { ...state, secretKey: payload, loader: false };
    case types.GET_USER_SECURITY_DATA_FAILURE:
    case types.GET_SECRET_KEY_FAILURE:
      return { ...state, loader: false };
    case types.LOGOUT_SUCCESS:
      return initialState;
    default:
      return state;
  }
};

export default UserSecurityData;
