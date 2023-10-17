import { put, takeLatest } from 'redux-saga/effects';
import types from '../types';

export function* setInterval({ payload }) {
  try {
    yield put({ type: 'SET_INTERVAL_SUCCESS', payload });
  } catch (error) {
    console.error(error);
    yield put({ type: 'SET_INTERVAL_FAILURE' });
  }
}

export function* watcherSetInterval() {
  yield takeLatest('SET_INTERVAL_START', setInterval);
}
