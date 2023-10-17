import { call, put, takeLatest } from 'redux-saga/effects';
import api from '../../services/api';
import types from '../types';

export function* createOrder(payload) {
  try {
    const { data, status } = yield call(api.trading.createOrder, payload);
    if (status < 200 || status >= 300) throw new Error('Something went wrong');
    yield put({
      type: types.CREATE_ORDER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    yield put({
      type: types.CREATE_ORDER_FAILURE,
    });
  }
}

export function* createStopLimitOrder(payload) {
  try {
    const { data, status } = yield call(
      api.trading.createStopLimitOrder,
      payload,
    );

    if (status < 200 || status >= 300) throw new Error('Something went wrong');
    yield put({
      type: types.CREATE_STOP_LIMIT_ORDER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    yield put({
      type: types.CREATE_STOP_LIMIT_ORDER_FAILURE,
    });
  }
}

export function* watcherCreateOrder() {
  yield takeLatest(types.CREATE_ORDER_START, createOrder);
}

export function* watcherCreateStopLimitOrder() {
  yield takeLatest(types.CREATE_STOP_LIMIT_ORDER_START, createStopLimitOrder);
}
