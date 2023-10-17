import { put, takeLatest, call } from 'redux-saga/effects';
import api from '../../services/api';
import notification from '../../services/notification';
import types from '../types';

function* getUser() {
  try {
    const { data, status } = yield call(api.settings.user);
    if (status < 200 || status >= 300) throw new Error('Something went wrong');
    yield put({
      type: types.GET_USER_DATA_SUCCESS,
      payload: { ...data.user_data, current_ip: data.current_ip },
    });
  } catch (error) {
    yield put({ type: types.GET_USER_DATA_FAILURE });
    // if (error?.response?.status === 401) return;
  }
}

export function* watcherGetUser() {
  yield takeLatest(types.GET_USER_DATA_START, getUser);
}
