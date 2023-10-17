import { put, takeLatest, call } from 'redux-saga/effects';
import L from 'i18n-react';
import types from '../../types';
import api from '../../../services/api';
import notification from '../../../services/notification';
import routes from '../../../routes';

const translatePath = 'Notifications.Auth.VerifyIP';
const translateTitle = `${translatePath}.title`;

function* verifyUserIP({ payload }) {
  try {
    const { data, status } = yield call(api.auth.verifyUserIP, {
      code: payload.code,
      email: payload.email,
    });
    if (status < 200 || status >= 300) throw new Error('Something went wrong');
    yield put({ type: types.VERIFY_USER_IP_SUCCESS, payload: data });
    notification({
      type: 'success',
      title: L.translate(translateTitle),
      message: L.translate(`${translatePath}.verify_success`),
    });
    payload.history.push(routes.Auth.Login.path);
    // yield put({
    //   type: types.LOGIN_START,
    //   payload: { loginData: payload.loginData },
    // });
  } catch (error) {
    console.dir(error);
    yield put({ type: types.VERIFY_USER_IP_FAILURE });
    if (error?.response?.status === 401) return;
    if (error?.response?.data?.errors.includes('invalid_verification_code')) {
      notification({
        type: 'error',
        title: L.translate(translateTitle),
        message: L.translate(`${translatePath}.wrong_code`),
      });
    }
  }
}

export function* watcherVerifyUserIP() {
  yield takeLatest(types.VERIFY_USER_IP_START, verifyUserIP);
}

function* recentCode({ payload }) {
  try {
    const { data, status } = yield call(api.auth.recentCode, payload);
    if (status < 200 || status >= 300) throw new Error('Something went wrong');
    yield put({ type: types.RECENT_CODE_SUCCESS, payload: data });
    notification({
      type: 'success',
      title: L.translate(translateTitle),
      message: L.translate(`${translatePath}.recent_code_message`),
    });
  } catch (error) {
    yield put({ type: types.RECENT_CODE_FAILURE });
    if (error?.response?.status === 401) return;
    console.dir(error);
  }
}

export function* watcherRecentCode() {
  yield takeLatest(types.RECENT_CODE_START, recentCode);
}
