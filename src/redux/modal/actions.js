import { put, takeLatest } from 'redux-saga/effects';
import types from '../types';

export function* setModal({ payload }) {
  try {
    yield put({ type: types.SET_MODAL_SUCCESS, payload });
  } catch (error) {
    console.error(error);
    yield put({ type: types.SET_MODAL_FAILURE });
  }
}

export function* watcherSetModal() {
  yield takeLatest(types.SET_MODAL_START, setModal);
}
