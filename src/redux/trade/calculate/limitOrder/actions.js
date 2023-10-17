import { call, put, takeLatest } from 'redux-saga/effects';
import api from '../../../../services/api';
import types from '../../../types';

export function* postCalculateLimitOrder({ payload, isLogin }) {
  try {
    let response;
    if (isLogin) {
      response = yield call(api.trading.postCalculateLimitOrder, payload);
    } else {
      response = yield call(api.trading.postPublicCalculateLimitOrder, payload);
    }
    const {
      data: { data },
      status,
    } = response;

    if (status < 200 || status >= 300) throw new Error('Something went wrong');

    if (data.type === 'buy') {
      yield put({
        type: types.POST_CALCULATE_LIMIT_ORDER_SUCCESS,
        payload: { buy: data },
      });
    }
    if (data.type === 'sell') {
      yield put({
        type: types.POST_CALCULATE_LIMIT_ORDER_SUCCESS,
        payload: { sell: data },
      });
    }
  } catch (error) {
    yield put({
      type: types.POST_CALCULATE_LIMIT_ORDER_FAILURE,
    });
  }
}

export function* watcherPostCalculateLimitOrder() {
  yield takeLatest(
    types.POST_CALCULATE_LIMIT_ORDER_START,
    postCalculateLimitOrder,
  );
}
