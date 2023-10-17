import { put, takeLatest, call } from 'redux-saga/effects';
import L from 'i18n-react';
import types from '../types';
import api from '../../services/api';
import notification from '../../services/notification';

const translatePath = 'Notifications.Support';

export function* getTopics() {
  try {
    const { data, status } = yield call(api.support.getTopics);
    if (status < 200 || status >= 300) throw new Error('Something went wrong');
    yield put({ type: types.GET_TOPICS_SUCCESS, payload: data });
  } catch (error) {
    console.dir(error);
    yield put({ type: types.GET_TOPICS_FAILURE });
    // if (error?.response?.status === 401)
  }
}

export function* watcherGetTopics() {
  yield takeLatest(types.GET_TOPICS_START, getTopics);
}

export function* sendContactUsForm({ payload }) {
  try {
    const { data, status } = yield call(api.support.postContactUs, payload);
    if (status < 200 || status >= 300) throw new Error('Something went wrong');
    yield put({ type: types.SEND_CONTACTUS_FORM_SUCCESS, payload: data });
    notification({
      type: 'success',
      message: L.translate(`${translatePath}.sending_success`),
    });
  } catch (error) {
    console.dir(error);
    yield put({ type: types.SEND_CONTACTUS_FORM_FAILURE });
    // if (error?.response?.status === 401) return;
  }
}

export function* watchersendContactUsForm() {
  yield takeLatest(types.SEND_CONTACTUS_FORM_START, sendContactUsForm);
}
