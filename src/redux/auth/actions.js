import { put, takeLatest, call, all } from 'redux-saga/effects';
import L from 'i18n-react';
import types from '../types';
import api from '../../services/api';
import notification from '../../services/notification';
import routes from '../../routes';

const translatePath = 'Notifications.Auth.Login';
const translateTitle = `${translatePath}.title`;

function* postLogin({ payload }) {
  try {
    const { data, status } = yield call(api.auth.login, payload.loginData);
    if (status < 200 || status >= 300) throw new Error('Something went wrong');
    yield put({ type: types.LOGIN_SUCCESS, payload: data });
  } catch (error) {
    console.dir(error);
    yield put({ type: types.LOGIN_FAILURE });
    if (error?.response?.status === 401) return;
    if (
      error?.response?.data?.errors?.totp &&
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
      if (error?.response?.data?.errors.includes('invalid_credentials')) {
        notification({
          type: 'error',
          title: L.translate(translateTitle),
          message: L.translate(`${translatePath}.error_credentials`),
        });
      }
      if (error?.response?.data?.errors.includes('email_not_confirmed')) {
        notification({
          type: 'error',
          title: L.translate(translateTitle),
          message: L.translate(`${translatePath}.error_email_confirm`),
        });
      }
      if (error?.response?.data?.errors.includes('invalid_totp_code')) {
        notification({
          type: 'error',
          title: L.translate(translateTitle),
          message: L.translate(`${translatePath}.error_totp_code`),
        });
      }
      if (error?.response?.data?.errors.includes('ip_not_verified')) {
        payload.history.push({
          pathname: routes.Auth.NewIP.path,
          state: {
            email: payload.loginData.email,
          },
        });
      }
      if (error?.response?.data?.errors.includes('model_not_found')) {
        notification({
          type: 'error',
          title: L.translate(translateTitle),
          message: L.translate(`${translatePath}.error_email_not_registered`),
        });
      }
      if (error?.response?.data?.errors.includes('user_blocked')) {
        notification({
          type: 'error',
          title: L.translate(translateTitle),
          message: L.translate(`${translatePath}.error_blocked`),
        });
      }
    }
  }
}

function* logout({ payload }) {
  try {
    if (payload.type === 'back') {
      const { status } = yield call(api.auth.logout);
      if (status < 200 || status >= 300)
        throw new Error('Something went wrong');
    } else {
      payload.history.replace(routes.Auth.Login.path);
    }

    yield put({ type: types.LOGOUT_SUCCESS });
  } catch (error) {
    yield put({ type: types.LOGOUT_FAILURE });
    // if (error?.response?.status === 401) return;
  }
}

function* putConfirmEmail({ payload }) {
  try {
    const { data, status } = yield call(api.auth.confirmEmail, payload);
    if (status < 200 || status >= 300) throw new Error('Something went wrong');
    yield put({ type: types.CONFIRM_EMAIL_SUCCESS, payload: data });
    notification({
      type: 'success',
      title: L.translate(translateTitle),
      message: L.translate(`${translatePath}.email_confrim_success`),
    });
  } catch (error) {
    notification({
      type: 'warning',
      title: L.translate(translateTitle),
      message: L.translate(`${translatePath}.email_confrim_warning`),
    });
    yield put({ type: types.CONFIRM_EMAIL_FAILURE });
  }
}

function* getRefreshToken() {
  try {
    const { data, status } = yield call(api.auth.refreshToken);
    if (status < 200 || status >= 300) throw new Error('Something went wrong');
    yield put({
      type: types.GET_REFRESH_TOKEN_SUCCESS,
      payload: { token: data.token, last_login: data.token_expired_at },
    });
  } catch (error) {
    yield put({ type: types.GET_REFRESH_TOKEN_FAILURE });
    // if (error?.response?.status === 401) return;
    // notification({ type: 'error', message: 'Something went wrong' });
  }
}

function* checkAntiphishingState() {
  try {
    const { data, status } = yield call(
      api.settings.security.getAntiphishingState,
    );
    if (status !== 200) throw new Error('Something went wrong');

    const check = Boolean(data.enable); // Backend returns 1 when enable === true, 0 when enable === false, or just enable: false.

    if (check) yield put({ type: types.CHECK_USER_ANTIPHISHING_DATA_SUCCESS });
    else yield put({ type: types.CHECK_USER_ANTIPHISHING_DATA_FAILURE });
  } catch (error) {
    yield put({ type: types.CHECK_USER_ANTIPHISHING_DATA_FAILURE });
  }
}

function* setAntiphishingState({ body }) {
  try {
    const { data, status } = yield call(
      api.settings.security.setAntiphishingState,
      body,
    );
    if (status !== 201) throw new Error('Something went wrong');
    const check = data.enable;
    // In this case backend returns actual enable state so, one more call checkAntiphishingState fn is not required.

    if (check) yield put({ type: types.CHECK_USER_ANTIPHISHING_DATA_SUCCESS });
    else yield put({ type: types.CHECK_USER_ANTIPHISHING_DATA_FAILURE });
  } catch (error) {
    yield put({ type: types.CHECK_USER_ANTIPHISHING_DATA_FAILURE });
  }
}

export function* rootSagaAuth() {
  yield all([
    takeLatest(types.CONFIRM_EMAIL_START, putConfirmEmail),
    takeLatest(types.LOGOUT_START, logout),
    takeLatest(types.LOGIN_START, postLogin),
    takeLatest(types.GET_REFRESH_TOKEN_START, getRefreshToken),
    takeLatest(
      types.CHECK_USER_ANTIPHISHING_DATA_START,
      checkAntiphishingState,
    ),
    takeLatest(types.SET_USER_ANTIPHISHING_DATA_START, setAntiphishingState),
  ]);
}
