import types from '../../types';

const initialState = {};

export const selectedContract = (state = initialState, action) => {
  switch (action.type) {
    case types.FUTURES_SELECT_CONTRACT:
      return action.payload;
    case types.LOGOUT_SUCCESS:
      return initialState;
    default:
      return state;
  }
};
