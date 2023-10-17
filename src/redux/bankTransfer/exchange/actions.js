import { put, takeLatest, call } from 'redux-saga/effects';
import L from 'i18n-react';
import types from '../../types';
import api from '../../../services/api';
import notification from '../../../services/notification';

const translatePath = 'Notifications.Exchange';
const translateTitle = `${translatePath}.title`;

function* getExchangeRate({ payload }) {
  try {
    const { data, status } = yield call(api.bankTransfer.exchangeRate, payload);
    if (status < 200 || status >= 300) throw new Error('Something went wrong');
    yield put({ type: types.EXCHANGE_RATE_SUCCESS, payload: data });
  } catch (error) {
    yield put({ type: types.EXCHANGE_RATE_FAILURE });
    // if (error?.response?.status === 401) return;
  }
}

export function* watcherGetExchangeRate() {
  yield takeLatest(types.EXCHANGE_RATE_START, getExchangeRate);
}

function* makeExchangeRate({ payload }) {
  try {
    const { data, status } = yield call(api.bankTransfer.makeExchange, payload);
    if (status < 200 || status >= 300) throw new Error('Something went wrong');
    yield put({ type: types.EXCHANGE_SUCCESS, payload: data });
    notification({
      type: 'success',
      title: L.translate(translateTitle),
      message: L.translate(`${translatePath}.exchange_success`),
    });
    yield put({ type: types.GET_WALLETS_START });
    yield put({ type: types.GET_EXCHANGE_HISTORY_START });
  } catch (error) {
    const errorDara = error?.response?.data?.errors;
    yield put({ type: types.EXCHANGE_FAILURE });

    if (error?.response?.status === 401) return;

    if (errorDara.includes('min_quantity_limit_exceeded')) {
      notification({
        type: 'error',
        title: L.translate(translateTitle),
        message: L.translate(`${translatePath}.exchange_limit_error`, {
          code: String(payload.exchange_min),
        }),
      });
      return;
    }
    if (errorDara.includes('exchange_rate_not_available')) {
      notification({
        type: 'error',
        title: L.translate(translateTitle),
        message: L.translate(`${translatePath}.exchange_rate_error`),
      });
      return;
    }
    if (errorDara.includes('not_enough_money')) {
      notification({
        type: 'error',
        title: L.translate(translateTitle),
        message: L.translate(`${translatePath}.exchange_balance_error`),
      });
      return;
    }
    notification({
      type: 'error',
      title: L.translate(translateTitle),
      message: L.translate(`${translatePath}.exchange_common_error`),
    });
  }
}

export function* watcherMakeExchange() {
  yield takeLatest(types.EXCHANGE_START, makeExchangeRate);
}

function* getExchangeHistory({ query = '' }) {
  try {
    const { data, status } = yield call(
      api.bankTransfer.getExchangeHistory,
      query,
    );
    if (status < 200 || status >= 300) throw new Error('Something went wrong');
    yield put({ type: types.GET_EXCHANGE_HISTORY_SUCCESS, payload: data });
  } catch (error) {
    yield put({ type: types.GET_EXCHANGE_HISTORY_FAILURE });

    if (error?.response?.status === 401) return;

    if (error?.response?.status >= 500) {
      notification({
        type: 'error',
        title: L.translate(translateTitle),
        message: L.translate(`${translatePath}.exchange_server_error`),
      });
    }
  }
}

export function* watcherGetExchangeHistory() {
  yield takeLatest(types.GET_EXCHANGE_HISTORY_START, getExchangeHistory);
}
