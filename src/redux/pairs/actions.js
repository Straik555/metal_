import { put, takeLatest, call, select } from 'redux-saga/effects';
import L from 'i18n-react';
import { toUpdateArray } from '../../services/helpers';
import api from '../../services/api';
import types from '../types';
import notification from '../../services/notification';

export function* getTopPairs() {
  try {
    const { data, status } = yield call(api.trading.getTopPairs);
    if (status < 200 || status >= 300) throw new Error('Something went wrong');
    yield put({
      type: types.GET_TOP_PAIRS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    yield put({
      type: types.GET_TOP_PAIRS_FAILURE,
    });
  }
}

export function* getAssetPairs() {
  try {
    const { data, status } = yield call(api.trading.getAssetPairs);
    if (status < 200 || status >= 300) throw new Error('Something went wrong');
    yield put({
      type: types.GET_ASSET_PAIRS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    yield put({
      type: types.GET_ASSET_PAIRS_FAILURE,
    });
  }
}

export function* getSpotAssetPairs() {
  try {
    const { data, status } = yield call(api.trading.getSpotAssetPairs);
    if (status < 200 || status >= 300) throw new Error('Something went wrong');
    yield put({
      type: types.GET_SPOT_ASSET_PAIRS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    yield put({
      type: types.GET_SPOT_ASSET_PAIRS_FAILURE,
    });
  }
}

export function* getMarginAssetPairs() {
  try {
    const { data, status } = yield call(api.trading.getMarginAssetPairs);
    if (status < 200 || status >= 300) throw new Error('Something went wrong');
    yield put({
      type: types.GET_MARGIN_ASSET_PAIRS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    yield put({
      type: types.GET_MARGIN_ASSET_PAIRS_FAILURE,
    });
  }
}

export function* getFavoriteAssetPairs() {
  try {
    const { data, status } = yield call(api.trading.getFavoriteAssetPairs);
    if (status < 200 || status >= 300) throw new Error('Something went wrong');
    yield put({
      type: types.GET_FAVORITE_ASSET_PAIRS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    yield put({
      type: types.GET_FAVORITE_ASSET_PAIRS_FAILURE,
    });
  }
}

export function* updateFavoriteAssetPair({ payload }) {
  const translatePath = 'Notifications.Pairs';

  try {
    const { id, setIsFavorite } = payload;
    const { status } = yield call(api.trading.updateFavoriteAssetPair, {
      asset_pair_id: id,
    });
    if (status < 200 || status >= 300) throw new Error('Something went wrong');
    const assetPairs = yield select(store => store.assetPairs.assetPairs);
    // const favoritePairs = yield select(store => store.assetPairs.favoritePairs);
    const data = toUpdateArray(id, assetPairs);
    yield put({
      type: types.UPDATE_FAVORITE_ASSET_PAIR_SUCCESS,
      payload: data,
    });
    yield setIsFavorite(prevState => !prevState);
  } catch (error) {
    yield put({
      type: types.UPDATE_FAVORITE_ASSET_PAIR_FAILURE,
    });
    if (
      error?.response?.data?.errors?.asset_pair_id?.includes(
        'the_selected_asset_pair_id_is_invalid',
      )
    ) {
      notification({
        type: 'error',
        message: L.translate(`${translatePath}.common_error`),
      });
    }
  }
}

export function* watcherGetTopPairs() {
  yield takeLatest(types.GET_TOP_PAIRS_START, getTopPairs);
}

export function* watcherGetAssetPairs() {
  yield takeLatest(types.GET_ASSET_PAIRS_START, getAssetPairs);
}

export function* watcherGetFavoriteAssetPairs() {
  yield takeLatest(types.GET_FAVORITE_ASSET_PAIRS_START, getFavoriteAssetPairs);
}

export function* watcherGetSpotAssetPairs() {
  yield takeLatest(types.GET_SPOT_ASSET_PAIRS_START, getSpotAssetPairs);
}

export function* watcherGetMarginAssetPairs() {
  yield takeLatest(types.GET_MARGIN_ASSET_PAIRS_START, getMarginAssetPairs);
}

export function* watcherUpdateFavoriteAssetPair() {
  yield takeLatest(
    types.UPDATE_FAVORITE_ASSET_PAIR_START,
    updateFavoriteAssetPair,
  );
}
