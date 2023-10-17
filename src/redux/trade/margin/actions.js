import { put, takeLatest, call } from 'redux-saga/effects';
import L from 'i18n-react';
import types from '../../types';
import api from '../../../services/api';
import notification from '../../../services/notification';
import { closeModal } from '../../../components/Base/Modal';

const translatePath = 'Notifications';

function* getOrders({ payload }) {
  try {
    const { data, status } = yield call(
      api.trading.margin.getOpenOrders,
      payload,
    );
    if (status < 200 || status >= 300) throw new Error('Something went wrong');
    yield put({ type: types.MARGIN_GET_ORDERS_LIST_SUCCESS, payload: data });
  } catch (error) {
    yield put({ type: types.MARGIN_GET_ORDERS_LIST_FAILURE });
    console.dir(error);
    if (error?.response?.status === 401) return;
    console.error('Get orders - Something went wrong');
  }
}

export function* watcherMarginGetOrders() {
  yield takeLatest(types.MARGIN_GET_ORDERS_LIST_START, getOrders);
}

function* cancelOrder({ payload }) {
  try {
    const { status } = yield call(api.trading.cancelOrder, payload);
    if (status < 200 || status >= 300) throw new Error('Something went wrong');
    yield put({ type: types.MARGIN_CANCEL_OPEN_ORDER_SUCCESS });
    // notification({ type: 'success', message: 'Order canceled successfully' });
  } catch (error) {
    yield put({ type: types.MARGIN_CANCEL_OPEN_ORDER_FAILURE });
    console.dir(error);
    if (error?.response?.status === 401) return;
    console.error('Cancel order - Something went wrong');
  }
}

export function* watcherMarginCancelOrder() {
  yield takeLatest(types.MARGIN_CANCEL_OPEN_ORDER_START, cancelOrder);
}

function* cancelAllOrders({ payload }) {
  try {
    const { status } = yield call(
      api.trading.margin.cancelAllOpenedOrders,
      payload,
    );
    if (status < 200 || status >= 300) throw new Error('Something went wrong');
    yield put({ type: types.MARGIN_CANCEL_ALL_ORDERS_SUCCESS });
    closeModal();
    // notification({
    //   type: 'success',
    //   message: 'All orders canceled successfully',
    // });
    yield put({
      type: types.MARGIN_GET_ORDERS_LIST_START,
      payload: {
        params: {
          per_page: 100,
        },
      },
    });
  } catch (error) {
    yield put({ type: types.MARGIN_CANCEL_ALL_ORDERS_FAILURE });
    console.dir(error);
    if (error?.response?.status === 401) return;
    console.error('Cancel all orders - Something went wrong');
  }
}

export function* watcherMarginCancelAllOrders() {
  yield takeLatest(types.MARGIN_CANCEL_ALL_ORDERS_START, cancelAllOrders);
}

function* getHistory({ payload }) {
  try {
    const { data, status } = yield call(
      api.trading.margin.getOrderHistory,
      payload,
    );
    if (status < 200 || status >= 300) throw new Error('Something went wrong');
    yield put({ type: types.MARGIN_GET_ORDERS_HISTORY_SUCCESS, payload: data });
  } catch (error) {
    yield put({ type: types.MARGIN_GET_ORDERS_HISTORY_FAILURE });
    console.dir(error);
    if (error?.response?.status === 401) return;
    console.error('Something went wrong');
  }
}

export function* watcherMarginGetHistory() {
  yield takeLatest(types.MARGIN_GET_ORDERS_HISTORY_START, getHistory);
}

function* getTradeHistory({ payload }) {
  try {
    const { data, status } = yield call(
      api.trading.margin.getTradeHistory,
      payload,
    );
    if (status < 200 || status >= 300) throw new Error('Something went wrong');
    yield put({ type: types.MARGIN_GET_TRADE_HISTORY_SUCCESS, payload: data });
  } catch (error) {
    yield put({ type: types.MARGIN_GET_TRADE_HISTORY_FAILURE });
    console.dir(error);
    if (error?.response?.status === 401) return;
    console.error('Something went wrong');
  }
}

export function* watcherMarginGetTradeHistory() {
  yield takeLatest(types.MARGIN_GET_TRADE_HISTORY_START, getTradeHistory);
}

function* getLowRisk() {
  try {
    const { data, status } = yield call(api.margin.getLowRisk);
    if (status < 200 || status >= 300) throw new Error('Something went wrong');
    yield put({ type: types.MARGIN_GET_LOW_RISK_SUCCESS, payload: data });
  } catch (error) {
    yield put({ type: types.MARGIN_GET_LOW_RISK_FAILURE });
    console.dir(error);
    if (error?.response?.status === 401) return;
    console.error('Something went wrong');
  }
}

export function* watcherMarginLowRisk() {
  yield takeLatest(types.MARGIN_GET_LOW_RISK_START, getLowRisk);
}

function* getBorrows() {
  try {
    const { data, status } = yield call(api.margin.getBorrows);
    if (status < 200 || status >= 300) throw new Error('Something went wrong');
    yield put({ type: types.MARGIN_GET_BORROWS_SUCCESS, payload: data });
  } catch (error) {
    yield put({ type: types.MARGIN_GET_BORROWS_FAILURE });
    console.dir(error);
    if (error?.response?.status === 401) return;
    console.error('Something went wrong');
  }
}

export function* watcherMarginBorrows() {
  yield takeLatest(types.MARGIN_GET_BORROWS_START, getBorrows);
}

function* getSingleBorrow({ payload }) {
  try {
    const { data, status } = yield call(api.margin.getBorrow, payload);
    if (status < 200 || status >= 300) throw new Error('Something went wrong');
    yield put({ type: types.MARGIN_GET_SINGLE_BORROW_SUCCESS, payload: data });
  } catch (error) {
    yield put({ type: types.MARGIN_GET_SINGLE_BORROW_FAILURE });
    console.dir(error);
    if (error?.response?.status === 401) return;
    console.error('Something went wrong');
  }
}

export function* watcherMarginSingleBorrow() {
  yield takeLatest(types.MARGIN_GET_SINGLE_BORROW_START, getSingleBorrow);
}

function* postBorrow({ payload }) {
  try {
    const { status } = yield call(api.margin.borrowing, payload);
    if (status < 200 || status >= 300) throw new Error('Something went wrong');
    yield put({ type: types.MARGIN_POST_BORROW_SUCCESS });
    yield put({
      type: types.MARGIN_GET_SINGLE_BORROW_START,
      payload: { asset_id: payload.asset_id },
    });
    notification({
      type: 'success',
      message: L.translate(`${translatePath}.success`),
    });
    closeModal();
  } catch (error) {
    yield put({ type: types.MARGIN_POST_BORROW_FAILURE });
    console.dir(error);
    if (error?.response?.status === 401) return;
    console.error('Something went wrong');
  }
}

export function* watcherMarginPostBorrow() {
  yield takeLatest(types.MARGIN_POST_BORROW_START, postBorrow);
}

function* getRepay({ payload }) {
  try {
    const { data, status } = yield call(api.margin.getRepay, payload);
    if (status < 200 || status >= 300) throw new Error('Something went wrong');
    yield put({ type: types.MARGIN_GET_SINGLE_REPAY_SUCCESS, payload: data });
  } catch (error) {
    yield put({ type: types.MARGIN_GET_SINGLE_REPAY_FAILURE });
    console.dir(error);
    if (error?.response?.status === 401) return;
    console.error('Something went wrong');
  }
}

export function* watcherMarginGetRepay() {
  yield takeLatest(types.MARGIN_GET_SINGLE_REPAY_START, getRepay);
}

function* postRepay({ payload }) {
  try {
    const { status } = yield call(api.margin.repay, payload);
    if (status < 200 || status >= 300) throw new Error('Something went wrong');
    yield put({ type: types.MARGIN_POST_REPAY_SUCCESS });
    yield put({
      type: types.MARGIN_GET_SINGLE_REPAY_START,
      payload: { asset_id: payload.asset_id },
    });
    notification({
      type: 'success',
      message: L.translate(`${translatePath}.success`),
    });
    closeModal();
  } catch (error) {
    yield put({ type: types.MARGIN_POST_REPAY_FAILURE });
    console.dir(error);
    if (error?.response?.status === 401) return;
    console.error('Something went wrong');
  }
}

export function* watcherMarginPostRepay() {
  yield takeLatest(types.MARGIN_POST_REPAY_START, postRepay);
}

function* postTransform({ payload }) {
  try {
    const { status } = yield call(
      payload.type ? api.margin.transferToMargin : api.margin.transferToSpot,
      payload.data,
    );
    if (status < 200 || status >= 300) throw new Error('Something went wrong');
    yield put({ type: types.MARGIN_POST_TRANSFORM_SUCCESS });
    yield put({ type: types.GET_WALLETS_START });
    notification({
      type: 'success',
      message: L.translate(`${translatePath}.success`),
    });
    closeModal();
  } catch (error) {
    yield put({ type: types.MARGIN_POST_TRANSFORM_FAILURE });
    console.dir(error);
    if (error?.response?.status === 422) {
      notification({
        type: 'error',
        message: L.translate(`${translatePath}.money_error`),
      });
      return;
    }
    if (error?.response?.status === 401) return;
    console.error('Something went wrong');
  }
}

export function* watcherMarginPostTransform() {
  yield takeLatest(types.MARGIN_POST_TRANSFORM_START, postTransform);
}
