import { put, takeLatest, call } from 'redux-saga/effects';
import L from 'i18n-react';
import api from '../../../services/api';
import notification from '../../../services/notification';
import types from '../../types';

const translatePath = 'Notifications.Settings.Dashboard';

function* getDashboard() {
  try {
    const { data, status } = yield call(api.settings.dashboard.getData);
    if (status < 200 || status >= 300) throw new Error('Something went wrong');
    yield put({ type: types.GET_DASHBOARD_SUCCESS, payload: data });
  } catch (error) {
    yield put({ type: types.GET_DASHBOARD_FAILURE });
    if (error?.response?.status === 401) return;
    if (error?.response?.status === 500) return;
    notification({
      type: 'error',
      message: L.translate(`${translatePath}.common_error`),
    });
  }
}

export function* watcherGetDashboard() {
  yield takeLatest(types.GET_DASHBOARD_START, getDashboard);
}

function* updateTokenDiscount({ payload }) {
  try {
    const { data, status } = yield call(
      api.settings.dashboard.updateTokenDiscount,
      payload,
    );
    if (status < 200 || status >= 300) throw new Error('Something went wrong');
    yield put({ type: types.UPDATE_TOKEN_DISKOUNT_SUCCESS, payload: data });
  } catch (error) {
    yield put({ type: types.UPDATE_TOKEN_DISKOUNT_FAILURE });
    if (error?.response?.status === 401) return;
    if (error?.response?.status === 500) return;
    notification({
      type: 'error',
      message: L.translate(`${translatePath}.common_error`),
    });
  }
}

export function* watcherUpdateTokenDiscount() {
  yield takeLatest(types.UPDATE_TOKEN_DISKOUNT_START, updateTokenDiscount);
}

function* getTokenDiscount() {
  try {
    const { data, status } = yield call(
      api.settings.dashboard.getTokenDiscount,
    );
    if (status < 200 || status >= 300) throw new Error('Something went wrong');
    yield put({ type: types.GET_TOKEN_DISKOUNT_SUCCESS, payload: data });
  } catch (error) {
    yield put({ type: types.GET_TOKEN_DISKOUNT_FAILURE });
    if (error?.response?.status === 401) return;
    if (error?.response?.status === 500) return;
    notification({
      type: 'error',
      message: L.translate(`${translatePath}.common_error`),
    });
  }
}

export function* watcherGetTokenDiscount() {
  yield takeLatest(types.GET_TOKEN_DISKOUNT_START, getTokenDiscount);
}
