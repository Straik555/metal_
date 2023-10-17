import { combineReducers } from 'redux';
import types from '../../types';

const lowRisk = (state = [], { type, payload }) => {
  switch (type) {
    case types.MARGIN_GET_LOW_RISK_SUCCESS:
      return payload;

    default:
      return state;
  }
};

const initialStateTables = {
  orders: [],
  history: [],
  tradeHistory: [],
};

const tables = (state = {}, { type, payload }) => {
  switch (type) {
    case types.MARGIN_GET_ORDERS_LIST_SUCCESS:
      return { ...state, orders: payload.data };

    case types.MARGIN_CANCEL_ALL_ORDERS_SUCCESS:
      return { ...state, orders: [] };
    case types.UPDATE_MARGIN_OPEN_ORDERS:
      return { ...state, orders: payload };

    case types.MARGIN_GET_ORDERS_HISTORY_SUCCESS:
      return { ...state, history: payload.data };
    case types.UPDATE_MARGIN_CLOSED_ORDERS:
      return { ...state, history: payload };

    case types.MARGIN_GET_TRADE_HISTORY_SUCCESS:
      return { ...state, tradeHistory: payload };
    case types.LOGOUT_SUCCESS:
      return initialStateTables;
    default:
      return state;
  }
};

const borrows = (state = [], { type, payload }) => {
  switch (type) {
    case types.MARGIN_GET_BORROWS_SUCCESS:
      return payload.borrows;
    case types.LOGOUT_SUCCESS:
      return [];
    default:
      return state;
  }
};

const initialStateSingleBorrow = {
  orders: [],
  history: [],
  tradeHistory: [],
};

const singleBorrow = (
  state = { interest: 0, borrowed: 0, max_borrow: 0 },
  { type, payload },
) => {
  switch (type) {
    case types.MARGIN_GET_SINGLE_BORROW_SUCCESS:
      return payload;
    case types.LOGOUT_SUCCESS:
      return initialStateSingleBorrow;
    default:
      return state;
  }
};

const initialStateSingleRepay = {
  available_balance: 0,
  interest: 0,
  borrowed: 0,
  total_debt: 0,
};

const singleRepay = (
  state = { available_balance: 0, interest: 0, borrowed: 0, total_debt: 0 },
  { type, payload },
) => {
  switch (type) {
    case types.MARGIN_GET_SINGLE_REPAY_SUCCESS:
      return payload;
    case types.LOGOUT_SUCCESS:
      return initialStateSingleRepay;
    default:
      return state;
  }
};

export default combineReducers({
  tables,
  lowRisk,
  borrows,
  singleBorrow,
  singleRepay,
});
