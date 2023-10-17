import { put, takeLatest, call, all } from 'redux-saga/effects';
import L from 'i18n-react';
import api from '../../../services/api';
import notification from '../../../services/notification';
import types from '../../types';

const translatePath = 'Notifications.Settings.Identification';
const translateTitle = `${translatePath}.title`;

function* updateData({ payload }) {
  try {
    const { data, status } = yield call(
      api.settings.identification.updatePersonaData,
      payload,
    );
    if (status < 200 || status >= 300) throw new Error('Something went wrong');
    yield put({ type: types.UPDATE_USER_DATA_SUCCESS, payload: data });
    notification({
      type: 'success',
      title: L.translate(translateTitle),
      message: L.translate(`${translatePath}.updating_success`),
    });
  } catch (error) {
    yield put({ type: types.UPDATE_USER_DATA_FAILURE });
    if (error?.response?.data?.errors?.includes('no_document_file_present')) {
      notification({
        type: 'error',
        title: L.translate(translateTitle),
        message: L.translate(`${translatePath}.error_uploading_photo`),
      });
      return;
    }
    if (error?.response?.status === 400) {
      notification({
        type: 'error',
        title: L.translate(translateTitle),
        message: L.translate(`${translatePath}.error_already_verified`),
      });
    }
    // if (error?.response?.status === 401) return;
    // notification({
    //   type: 'error',
    //   message: 'Something went wrong',
    // });
  }
}

function* updateDocument({ payload }) {
  try {
    const { data, status } = yield call(
      api.settings.identification.updateDocument,
      payload,
    );
    if (status < 200 || status >= 300) throw new Error('Something went wrong');
    yield put({
      type: types.UPDATE_DOCUMENTS_SUCCESS,
      payload: data,
    });
    notification({
      type: 'success',
      title: L.translate(translateTitle),
      message: L.translate(`${translatePath}.updating_success`),
    });
  } catch (error) {
    yield put({ type: types.UPDATE_DOCUMENTS_FAILURE });
    if (error?.response?.status === 400) {
      notification({
        type: 'error',
        title: L.translate(translateTitle),
        message: L.translate(`${translatePath}.error_file_updating`),
      });
    }
    // if (error?.response?.status === 401) return;
    // notification({
    //   type: 'error',
    //   message: 'Something went wrong',
    // });
  }
}

function* deleteDocument({ payload }) {
  try {
    const { status } = yield call(
      api.settings.identification.deleteDocument,
      payload.file_id,
    );
    if (status < 200 || status >= 300) throw new Error('Something went wrong');
    yield put({ type: types.DELETE_DOCUMENTS_SUCCESS, payload });
    notification({
      type: 'success',
      title: L.translate(translateTitle),
      message: L.translate(`${translatePath}.updating_success`),
    });
  } catch (error) {
    yield put({ type: types.DELETE_DOCUMENTS_FAILURE });
    if (error?.response?.status === 400) {
      notification({
        type: 'error',
        title: L.translate(translateTitle),
        message: L.translate(`${translatePath}.error_file_deleting`),
      });
    }
    // if (error?.response?.status === 401) return;
    // notification({
    //   type: 'error',
    //   message: 'Something went wrong',
    // });
  }
}

export function* watcherIdentification() {
  yield all([
    takeLatest(types.DELETE_DOCUMENTS_START, deleteDocument),
    takeLatest(types.UPDATE_DOCUMENTS_START, updateDocument),
    takeLatest(types.UPDATE_USER_DATA_START, updateData),
  ]);
}
