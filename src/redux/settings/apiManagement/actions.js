import { put, takeLatest, call, select } from 'redux-saga/effects';
import L from 'i18n-react';
import types from '../../types';
import api from '../../../services/api';
import notification from '../../../services/notification';

export const getAPIKeys = state => state.settings.apiManagement.APIkey;
const translatePath = 'Notifications.Settings.API';
const translateTitle = `${translatePath}.title`;

export function* getTokens() {
  try {
    const { data, status } = yield call(api.settings.apiManagement.getToken);
    if (status < 200 || status >= 300) throw new Error('Something went wrong');
    const dataReverse = [].concat(data.tokens).reverse();
    yield put({ type: types.GET_TOKENS_SUCCESS, payload: dataReverse });
  } catch (error) {
    console.dir(error);
    yield put({ type: types.GET_TOKENS_FAILURE });
    // if (error?.response?.status === 401) return;
  }
}

export function* postCreateToken({ payload }) {
  try {
    const { data, status } = yield call(
      api.settings.apiManagement.createToken,
      payload,
    );
    if (status < 200 || status >= 300) throw new Error('Something went wrong');
    yield put({ type: types.CREATE_TOKENS_SUCCESS, payload: data.token });
    notification({
      type: 'success',
      title: L.translate(translateTitle),
      message: L.translate(`${translatePath}.key_creating_success`),
    });
  } catch (error) {
    console.dir(error);
    yield put({ type: types.CREATE_TOKENS_FAILURE });
    // if (error?.response?.status === 401) return;
  }
}

export function* putUpdateToken({ payload }) {
  try {
    const newStatus = Object.assign(payload);
    newStatus.status = !newStatus.status;
    const { data, status } = yield call(
      api.settings.apiManagement.disable,
      newStatus,
    );
    if (status < 200 || status >= 300) throw new Error('Something went wrong');
    const APIKeys = yield select(getAPIKeys);
    const currentKeyIndex = APIKeys.findIndex(key => key.id === data.token.id);
    APIKeys.splice(currentKeyIndex, 1, data.token);
    yield put({ type: types.DISABLE_TOKENS_SUCCESS, payload: APIKeys });
  } catch (error) {
    yield put({ type: types.DISABLE_TOKENS_FAILURE });
    // if (error?.response?.status === 401) return;
  }
}

export function* deleteToken({ payload }) {
  try {
    const { data, status } = yield call(
      api.settings.apiManagement.delete,
      payload,
    );
    if (status < 200 || status >= 300) throw new Error('Something went wrong');
    const APIKeys = yield select(getAPIKeys);
    const currentKeyIndex = APIKeys.findIndex(key => key.id === data.token.id);
    APIKeys.splice(currentKeyIndex, 1);
    yield put({ type: types.DELETE_TOKENS_SUCCESS, payload: APIKeys });
    notification({
      type: 'success',
      title: L.translate(translateTitle),
      message: L.translate(`${translatePath}.key_deleting_success`),
    });
  } catch (error) {
    yield put({ type: types.DELETE_TOKENS_FAILURE });
    // if (error?.response?.status === 401) return;
  }
}

export function* watcherGetTokens() {
  yield takeLatest(types.GET_TOKENS_START, getTokens);
}

export function* watcherPostCreateTokens() {
  yield takeLatest(types.CREATE_TOKENS_START, postCreateToken);
}

export function* watcherDisableTokens() {
  yield takeLatest(types.DISABLE_TOKENS_START, putUpdateToken);
}

export function* watcherDeleteTokens() {
  yield takeLatest(types.DELETE_TOKENS_START, deleteToken);
}
