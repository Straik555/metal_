import types from '../types';

const initialState = {
  status: false,
  Dom: null,
};

const modal = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.SET_MODAL_SUCCESS:
      return payload;
    case types.LOGOUT_SUCCESS:
      return initialState;
    default:
      return state;
  }
};

export default modal;
