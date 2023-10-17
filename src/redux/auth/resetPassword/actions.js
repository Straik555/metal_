import { put, takeLatest, call } from 'redux-saga/effects';
import L from 'i18n-react';
import types from '../../types';
import api from '../../../services/api';
import notification from '../../../services/notification';
import routes from '../../../routes';

export function* postResetPassword({ payload }) {
  const translatePath = 'Notifications.Auth.ResetPassword';
  const translateTitle = `${translatePath}.title`;

  try {
    const { data, status } = yield call(api.auth.resetPassword, {
      // totp: payload.totp,
      email: payload.email,
      captcha: payload.captcha,
    });
    if (status < 200 || status >= 300) throw new Error('Something went wrong');
    yield put({ type: types.RESET_PASSWORD_SUCCESS, payload: data });
    notification({
      type: 'success',
      title: L.translate(translateTitle),
      message: L.translate(`${translatePath}.reset_success`),
    });
    payload.history.push(routes.Auth.Login.path);
  } catch (error) {
    console.dir(error);
    yield put({ type: types.RESET_PASSWORD_FAILURE });
    if (error?.response?.status === 401) return;
    if (
      error?.response?.data?.errors?.totp?.includes(
        'the_totp_field_is_required',
      )
    ) {
      notification({
        type: 'error',
        title: L.translate(translateTitle),
        message: L.translate(`${translatePath}.authenticator_2fa_error`),
      });
    } else {
      if (error?.response?.data?.errors?.includes('invalid_credentials')) {
        notification({
          type: 'error',
          title: L.translate(translateTitle),
          message: L.translate(`${translatePath}.email_is_not_registered`),
        });
      }
      if (error?.response?.data?.errors?.includes('model_not_found')) {
        notification({
          type: 'error',
          title: L.translate(translateTitle),
          message: L.translate(`${translatePath}.email_incorrect`),
        });
      }
    }
  }
}

export function* watcherResetPassword() {
  yield takeLatest(types.RESET_PASSWORD_START, postResetPassword);
}
