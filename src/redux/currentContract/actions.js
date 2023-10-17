import { put, takeLatest } from 'redux-saga/effects';
import types from '../types';

export function* setCurrentContract({ payload }) {
  try {
    yield put({ type: types.SET_CURRENT_CONTRACT_SUCCESS, payload });
  } catch (error) {
    console.error(error);
    yield put({ type: types.SET_CURRENT_CONTRACT_FAILURE });
  }
}

export function* watcherSetCurrentContract() {
  yield takeLatest(types.SET_CURRENT_CONTRACT_START, setCurrentContract);
}
