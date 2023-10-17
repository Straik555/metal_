import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import L from 'i18n-react';
import api from '../../../services/api';
import notification from '../../../services/notification';
import types from '../../types';

function* postGenerateAddressForWallet({ walletId }) {
  const translatePath = 'Notifications.Deposit';
  const translateTitle = `${translatePath}.title`;

  try {
    const { status, data } = yield call(
      api.wallets.crypto.postGenerateAddressForWallet,
      walletId,
    );
    if (status !== 201) throw new Error('Something went wrong');
    yield put({
      type: types.POST_GENERATE_ADRESS_WALLETS_SUCCESS,
      payload: data.address,
    });

    notification({
      type: 'success',
      title: L.translate(translateTitle),
      message: L.translate(`${translatePath}.adress_creating_success`),
    });
  } catch (error) {
    yield put({
      type: types.POST_GENERATE_ADRESS_WALLETS_FAILURE,
    });
    if (error?.response?.status === 401) return;

    notification({
      type: 'error',
      title: L.translate(translateTitle),
      message: L.translate(`${translatePath}.adress_creating_error`),
    });
  }
}

function* postCreateWithdrawalRequest({ body, query = '' }) {
  const translatePath = 'Notifications.Withdraw';
  const translateTitle = `${translatePath}.title`;

  try {
    const { data, status } = yield call(
      api.wallets.crypto.postCreateWithdrawalRequest,
      body,
    );
    if (status < 200 || status >= 300) throw new Error('Something went wrong');
    yield put({
      type: types.POST_CREATE_WITHDRAWAL_REQUEST_SUCCESS,
      payload: data,
    });

    // to update the withdrawals history
    yield put({
      type: types.GET_WALLETS_WITHDRAWALS_START,
      query,
    });

    // to update balance
    yield put({ type: types.GET_WALLETS_START });

    notification({
      type: 'success',
      title: L.translate(translateTitle),
      message: L.translate(`${translatePath}.withdraw_success`),
    });
  } catch (error) {
    yield put({ type: types.POST_CREATE_WITHDRAWAL_REQUEST_FAILURE });
    const errorData = error?.response?.data?.errors;

    if (errorData?.includes('fee_greater_amount')) {
      notification({
        type: 'error',
        title: L.translate(translateTitle),
        message: L.translate(`${translatePath}.withdraw_error_fee`),
      });
      return;
    }
    if (errorData?.includes('wrong_wallet_address')) {
      notification({
        type: 'error',
        title: L.translate(translateTitle),
        message: L.translate(`${translatePath}.withdraw_error_adress`),
      });
      return;
    }
    if (error?.response?.status === 504) {
      notification({
        type: 'error',
        title: L.translate(translateTitle),
        message: L.translate(`${translatePath}.withdraw_server_overloaded`),
      });
      return;
    }
    if (error?.response?.status >= 500) {
      notification({
        type: 'error',
        title: L.translate(translateTitle),
        message: L.translate(`${translatePath}.withdraw_server_error`),
      });
      return;
    }

    notification({
      type: 'error',
      title: L.translate(translateTitle),
      message: L.translate(`${translatePath}.common_error`),
    });
  }
}

function* deleteWithdrawalDepositRequest({ body, query }) {
  try {
    const { status } = yield call(
      api.wallets.crypto.deleteWithdrawalDepositRequest,
      body,
    );
    if (status < 200 || status >= 300) throw new Error('Something went wrong');
    yield put({
      type: types.DELETE_WITHDRAWAL_DEPOSIT_SUCCESS,
    });
    yield put({
      type: types.GET_WALLETS_TRANSACTIONS_START,
      query,
    });
  } catch (error) {
    yield put({
      type: types.DELETE_WITHDRAWAL_DEPOSIT_FAILURE,
    });
  }
}

function* postCreateWithdrawalGoldRequest({ body, clearForm }) {
  const translatePath = 'Notifications.Withdraw';
  const translateTitle = `${translatePath}.title`;

  try {
    const { status } = yield call(
      api.wallets.crypto.postCreateWithDrawalGoldRequest,
      body,
    );
    if (status < 200 || status >= 300) throw new Error('Something went wrong');

    yield put({ type: types.GET_WITHDRAWAL_GOLD_REQUEST_HISTORY_START });
    yield put({ type: types.GET_WALLETS_START });
    notification({
      type: 'success',
      title: L.translate(translateTitle),
      message: L.translate(`${translatePath}.withdraw_success`),
    });
    if (typeof clearForm === 'function') clearForm();
  } catch (error) {
    if (error?.response?.status === 504) {
      notification({
        type: 'error',
        title: L.translate(translateTitle),
        message: L.translate(`${translatePath}.withdraw_server_overloaded`),
      });
      return;
    }
    if (error?.response?.status >= 500) {
      notification({
        type: 'error',
        title: L.translate(translateTitle),
        message: L.translate(`${translatePath}.withdraw_server_error`),
      });
      return;
    }
    notification({
      type: 'error',
      title: L.translate(translateTitle),
      message: L.translate(`${translatePath}.common_error`),
    });
  }
}

export function* rootSagaWalletsCrypto() {
  yield all([
    takeLatest(
      types.DELETE_WITHDRAWAL_DEPOSIT_START,
      deleteWithdrawalDepositRequest,
    ),
    takeLatest(
      types.POST_CREATE_WITHDRAWAL_REQUEST_START,
      postCreateWithdrawalRequest,
    ),
    takeLatest(
      types.POST_GENERATE_ADRESS_WALLETS_START,
      postGenerateAddressForWallet,
    ),
    takeLatest(
      types.POST_CREATE_WITHDRAWAL_GOLD_REQUEST_START,
      postCreateWithdrawalGoldRequest,
    ),
  ]);
}
