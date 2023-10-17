import { combineReducers } from 'redux';
import types from '../../../types';

const calculate = (state = {}, { type, payload }) => {
  switch (type) {
    case types.POST_CALCULATE_LIMIT_ORDER_SUCCESS:
      return { ...state, ...payload };
    case types.CALCULATE_LIMIT_ORDER_CLEAR:
      return { ...state, [payload]: {} };
    case types.LOGOUT_SUCCESS:
      return {};
    default:
      return state;
  }
};
export default calculate;
