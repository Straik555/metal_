import { all, call, put, takeLatest } from 'redux-saga/effects';
import api from '../../services/api';
import types from '../types';

function* getAssetFees({ assetID }) {
  try {
    const { data, status } = yield call(api.fees.getFees, assetID);
    if (status < 200 || status >= 300) throw new Error('Something went wrong');
    yield put({ type: types.GET_ASSET_FEES_SUCCESS, payload: data });
  } catch (e) {
    const { response } = e;
  }
}

function* getAllFees() {
  try {
    const { data, status } = yield call(api.fees.getAllFees);
    if (status < 200 || status >= 300) throw new Error('Something went wrong');
    yield put({ type: types.GET_ALL_FEES_SUCCESS, payload: data });
  } catch (e) {
    const { response } = e;
  }
}

export function* feesWatcher() {
  yield all([
    takeLatest(types.GET_ASSET_FEES_START, getAssetFees),
    takeLatest(types.GET_ALL_FEES_START, getAllFees),
  ]);
}
