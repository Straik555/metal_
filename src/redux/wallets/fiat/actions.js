import { all, call, put, takeLatest } from 'redux-saga/effects';
import L from 'i18n-react';
import api from '../../../services/api';
import notification from '../../../services/notification';
import types from '../../types';

const translatePath = 'Notifications.Fiat';
const translateDepositTitle = `${translatePath}.title`;
const translateWithdrawalTitle = 'Notifications.Withdraw.title';

function* postCreateBankDepositRequest({ payload, setGenerate }) {
  try {
    const { data, status } = yield call(
      api.wallets.fiat.postCreateBankDepositRequest,
      payload,
    );
    if (status < 200 || status >= 300) throw new Error('Something went wrong');
    yield put({
      type: types.POST_CREATE_BANK_DEPOSITE_REQUEST_SUCCESS,
      payload: data,
    });
    setGenerate(true);
    notification({
      type: 'success',
      title: L.translate(translateDepositTitle),
      message: L.translate(`${translatePath}.invoice_success`),
    });
  } catch (error) {
    yield put({
      type: types.POST_CREATE_BANK_DEPOSITE_REQUEST_FAILURE,
    });
    if (error.response.status === 403) {
      notification({
        type: 'error',
        title: L.translate(translateDepositTitle),
        message: L.translate(`${translatePath}.invoice_verify_error`),
      });
    }
  }
}

function* sendPayPalDepositRequest({ body }) {
  try {
    const { data, status } = yield call(
      api.wallets.fiat.sendPayPalDepositRequest,
      body,
    );
    if (status < 200 || status >= 300) throw new Error('Something went wrong');
    const url = data?.url?.ready;

    yield put({
      type: types.SEND_PAY_PAL_DEPOSIT_REQUEST_SUCCESS,
      payload: url,
    });
    window.open(url);
  } catch (e) {
    yield put({ type: types.SEND_PAY_PAL_DEPOSIT_REQUEST_FAILURE });
    const errorData = e?.response?.data?.errors;

    if (
      typeof errorData.includes === 'function' &&
      errorData.includes('too_small_amount_for_a_deposit')
    ) {
      notification({
        type: 'error',
        title: L.translate(translateDepositTitle),
        message: L.translate(`${translatePath}.small_amount_to_deposit`),
      });
      return;
    }

    notification({
      type: 'error',
      title: L.translate(translateDepositTitle),
      message: L.translate(`Notifications.common_error`),
    });
  }
}

function* sendPayPalFiatWithdrawalRequest({ body }) {
  try {
    const { data, status } = yield call(
      api.wallets.fiat.sendPayPalFiatWithdrawalRequest,
      body,
    );
    if (status < 200 || status >= 300) throw new Error('Something went wrong');

    notification({
      type: 'success',
      title: L.translate(translateWithdrawalTitle),
      message: L.translate(`${translatePath}.request_success`),
    });
  } catch (e) {
    console.log(e.response);
    notification({
      type: 'error',
      title: L.translate(translateWithdrawalTitle),
      message: L.translate(`Notifications.common_error`),
    });
  }
}

export function* rootSagaWalletsFiat() {
  yield all([
    takeLatest(
      types.POST_CREATE_BANK_DEPOSITE_REQUEST_START,
      postCreateBankDepositRequest,
    ),
    takeLatest(
      types.SEND_PAY_PAL_DEPOSIT_REQUEST_START,
      sendPayPalDepositRequest,
    ),
    takeLatest(
      types.SEND_PAY_PAL_FIAT_WITHDRAWAL_REQUEST_START,
      sendPayPalFiatWithdrawalRequest,
    ),
  ]);
}
