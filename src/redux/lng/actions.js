import { put, takeLatest } from 'redux-saga/effects';
import types from '../types';

export function* setLanguage({ payload }) {
  try {
    yield put({ type: types.SET_LANGUAGE_SUCCESS, payload });
  } catch (error) {
    console.error(error);
    yield put({ type: types.SET_LANGUAGE_FAILURE });
  }
}

export function* watcherSetLanguage() {
  yield takeLatest(types.SET_LANGUAGE_START, setLanguage);
}
