import { put, takeLatest, call } from 'redux-saga/effects';
import L from 'i18n-react';
import types from '../../types';
import api from '../../../services/api';
import notification from '../../../services/notification';
import routes from '../../../routes';

export function* putChangePassword({ payload }) {
  const translatePath = 'Notifications.Auth.ChangePassword';
  const translateTitle = `${translatePath}.title`;

  try {
    const { data, status } = yield call(api.auth.changePassword, {
      password: payload.password,
      token: payload.token,
    });
    if (status < 200 || status >= 300) throw new Error('Something went wrong');
    yield put({ type: types.CHANGE_PASSWORD_SUCCESS, payload: data });
    notification({
      type: 'success',
      title: L.translate(translateTitle),
      message: L.translate(`${translatePath}.change_success`),
    });
    payload.history.push(routes.Auth.Login.path);
  } catch (error) {
    yield put({ type: types.CHANGE_PASSWORD_FAILURE });
    if (error?.response?.status === 401) return;
    console.dir(error);
  }
}

export function* watcherChangePassword() {
  yield takeLatest(types.CHANGE_PASSWORD_START, putChangePassword);
}
