import { put, takeLatest } from 'redux-saga/effects';
import types from '../types';

export function* setCurrentPair({ payload }) {
  try {
    yield put({ type: types.SET_CURRENT_PAIR_SUCCESS, payload });
  } catch (error) {
    console.error(error);
    yield put({ type: types.SET_CURRENT_PAIR_FAILURE });
  }
}

export function* watcherSetCurrentPair() {
  yield takeLatest(types.SET_CURRENT_PAIR_START, setCurrentPair);
}
