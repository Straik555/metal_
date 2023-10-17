import { call, put, takeLatest } from 'redux-saga/effects';
import api from '../../../../services/api';
import types from '../../../types';

export function* postCalculateMarketOrder({ payload, isLogin }) {
  try {
    let response;
    if (isLogin) {
      response = yield call(api.trading.postCalculateMarketOrder, payload);
    } else {
      response = yield call(
        api.trading.postPublicCalculateMarketOrder,
        payload,
      );
    }
    const {
      data: { data },
      status,
    } = response;
    if (status < 200 || status >= 300) throw new Error('Something went wrong');
    if (data.type === 'buy' || data.type === 'market_buy') {
      yield put({
        type: types.POST_CALCULATE_MARKET_ORDER_SUCCESS,
        payload: { buy: data },
      });
    }
    if (data.type === 'sell' || data.type === 'market_sell') {
      yield put({
        type: types.POST_CALCULATE_MARKET_ORDER_SUCCESS,
        payload: { sell: data },
      });
    }
  } catch (error) {
    yield put({
      type: types.POST_CALCULATE_MARKET_ORDER_FAILURE,
    });
  }
}

export function* watcherPostCalculateMarketOrder() {
  yield takeLatest(
    types.POST_CALCULATE_MARKET_ORDER_START,
    postCalculateMarketOrder,
  );
}
export function* postPublicCalculateMarketOrder({ payload }) {
  try {
    const {
      data: { data },
      status,
    } = yield call(api.trading.postPublicCalculateMarketOrder, payload);
    if (status < 200 || status >= 300) throw new Error('Something went wrong');
    if (data.type === 'buy' || data.type === 'market_buy') {
      yield put({
        type: types.POST_PUBLIC_CALCULATE_MARKET_ORDER_SUCCESS,
        payload: { buy: data },
      });
    }
    if (data.type === 'sell' || data.type === 'market_sell') {
      yield put({
        type: types.POST_PUBLIC_CALCULATE_MARKET_ORDER_SUCCESS,
        payload: { sell: data },
      });
    }
  } catch (error) {
    yield put({
      type: types.POST_PUBLIC_CALCULATE_MARKET_ORDER_FAILURE,
    });
  }
}

export function* watcherPostPublicCalculateMarketOrder() {
  yield takeLatest(
    types.POST_PUBLIC_CALCULATE_MARKET_ORDER_START,
    postPublicCalculateMarketOrder,
  );
}
