import { put, takeLatest, call } from 'redux-saga/effects';
import L from 'i18n-react';
import types from '../../types';
import api from '../../../services/api';
import notification from '../../../services/notification';
import routes from '../../../routes';

export function* Signup({ payload }) {
  const translatePath = 'Notifications.Auth.SignUp';
  const translateTitle = `${translatePath}.title`;

  try {
    const { data, status } = yield call(api.auth.signup, payload.userData);
    if (status < 200 || status >= 300) throw new Error('Something went wrong');
    yield put({ type: types.SIGNUP_SUCCESS, payload: data });
    notification({
      type: 'success',
      title: L.translate(translateTitle),
      message: L.translate(`${translatePath}.register_success`),
    });
    payload.history.push({
      pathname: routes.Auth.Login.path,
    });
  } catch (error) {
    yield put({ type: types.SIGNUP_FAILURE });
    const errorData = error?.response?.data?.errors;

    if (errorData?.email?.includes('the_email_has_already_been_taken')) {
      notification({
        type: 'error',
        title: L.translate(translateTitle),
        message: L.translate(`${translatePath}.register_email_error`),
      });
      return;
    }
    notification({
      type: 'error',
      title: L.translate(translateTitle),
      message: L.translate(`${translatePath}.register_common_error`),
    });
  }
}

export function* watcherSignup() {
  yield takeLatest(types.SIGNUP_START, Signup);
}
