import { put, takeLatest, call } from 'redux-saga/effects';
import L from 'i18n-react';
import types from '../../types';
import api from '../../../services/api';
import notification from '../../../services/notification';

const translatePath = 'Notifications.Settings.Security';
const translateTitle = `${translatePath}.title`;

export function* putUsersResetPassword({ payload }) {
  try {
    const { data, status } = yield call(
      api.settings.security.resetPassword,
      payload,
    );
    if (status < 200 || status >= 300) throw new Error('Something went wrong');
    yield put({ type: types.USERS_RESET_PASSWORD_SUCCESS, payload: data });
    notification({
      type: 'success',
      title: L.translate(translateTitle),
      message: L.translate(`${translatePath}.success_password_change`),
    });
  } catch (error) {
    console.dir(error);
    yield put({ type: types.USERS_RESET_PASSWORD_FAILURE });
    if (error?.response?.status === 401) return;
    if (error?.response?.data?.errors?.includes('invalid_totp_code')) {
      notification({
        type: 'error',
        title: L.translate(translateTitle),
        message: L.translate(`${translatePath}.error_data_incorrect`),
      });
    }
  }
}

export function* getUsersSecurityData() {
  try {
    const { data, status } = yield call(api.settings.security.getUserData);
    if (status < 200 || status >= 300) throw new Error('Something went wrong');
    yield put({ type: types.GET_USER_SECURITY_DATA_SUCCESS, payload: data });
  } catch (error) {
    console.dir(error);
    yield put({ type: types.GET_USER_SECURITY_DATA_FAILURE });
    // if (error?.response?.status === 401) return;
  }
}

export function* getSecretKey() {
  try {
    const { data, status } = yield call(api.settings.security.getSecretKey);
    if (status < 200 || status >= 300) throw new Error('Something went wrong');
    yield put({ type: types.GET_SECRET_KEY_SUCCESS, payload: data });
  } catch (error) {
    console.dir(error);
    yield put({ type: types.GET_SECRET_KEY_FAILURE });
    // if (error?.response?.status === 401) return;
  }
}

export function* watcherUsersResetPassword() {
  yield takeLatest(types.USERS_RESET_PASSWORD_START, putUsersResetPassword);
}

export function* watcherGetUserSecurityData() {
  yield takeLatest(types.GET_USER_SECURITY_DATA_START, getUsersSecurityData);
}

export function* watcherGetSecretKey() {
  yield takeLatest(types.GET_SECRET_KEY_START, getSecretKey);
}
