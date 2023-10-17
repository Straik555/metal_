import { put, takeLatest, call, fork, all } from 'redux-saga/effects';
import types from '../types';
import api from '../../services/api';
import { rootSagaWalletsCrypto } from './crypto/actions';
import { rootSagaWalletsFiat } from './fiat/actions';
import notification from '../../services/notification';
import { closeModal } from '../../components/Base/Modal';
import { formatCountryName } from '../../services/helpers';

function* getWalletsList() {
  try {
    const { data, status } = yield call(api.wallets.getWalletsList);
    if (status < 200 || status >= 300) throw new Error('Something went wrong');
    yield put({ type: types.GET_WALLETS_SUCCESS, payload: data });
  } catch (error) {
    yield put({ type: types.GET_WALLETS_FAILURE });
    if (error?.response?.status === 401) return;
    console.error(error);
  }
}

function* getWallet({ payload }) {
  try {
    const { data, status } = yield call(api.wallets.getWallet, payload);
    if (status < 200 || status >= 300) throw new Error('Something went wrong');
    yield put({ type: types.GET_WALLET_SUCCESS, payload: data });
  } catch (error) {
    yield put({ type: types.GET_WALLET_FAILURE });
    // if (error?.response?.status === 401) return;
  }
}

function* getWalletsTransactions({ query }) {
  try {
    const { data, status } = yield call(
      api.wallets.getWalletsTransactions,
      query,
    );
    if (status < 200 || status >= 300) throw new Error('Something went wrong');
    yield put({ type: types.GET_WALLETS_TRANSACTIONS_SUCCESS, payload: data });
  } catch (error) {
    yield put({ type: types.GET_WALLETS_TRANSACTIONS_FAILURE });
    if (error?.response?.status === 401) return;
    console.error(error);
  }
}

function* getWalletsTransfer({ body }) {
  try {
    const { data, status } = yield call(api.wallets.getWalletsTransfer, body);
    if (status < 200 || status >= 300) throw new Error('Something went wrong');
    yield put({ type: types.GET_WALLETS_TRANSFER_SUCCESS, payload: data });
  } catch (error) {
    yield put({ type: types.GET_WALLETS_TRANSFER_FAILURE });
    if (error?.response?.status === 401) return;
    console.error(error);
  }
}

function* getWalletsDeposits({ query }) {
  try {
    const { data, status } = yield call(api.wallets.getWalletsDeposits, query);
    if (status < 200 || status >= 300) throw new Error('Something went wrong');
    yield put({ type: types.GET_WALLETS_DEPOSITS_SUCCESS, payload: data });
  } catch (error) {
    yield put({ type: types.GET_WALLETS_DEPOSITS_FAILURE });
    // if (error?.response?.status === 401) return;
  }
}

function* getWalletsWithdrawals({ query }) {
  try {
    const { data, status } = yield call(
      api.wallets.getWalletsWithdrawals,
      query,
    );
    if (status < 200 || status >= 300) throw new Error('Something went wrong');
    yield put({ type: types.GET_WALLETS_WITHDRAWALS_SUCCESS, payload: data });
  } catch (error) {
    yield put({ type: types.GET_WALLETS_WITHDRAWALS_FAILURE });
    if (error?.response?.status === 401) return;
    console.error(error);
  }
}
function* getGoldWithdrawHistory({ query = '' }) {
  try {
    const { data, status } = yield call(
      api.wallets.getGoldWithdrawHistory,
      query,
    );
    if (status < 200 || status >= 300) throw new Error('Something went wrong');
    yield put({
      type: types.GET_WITHDRAWAL_GOLD_REQUEST_HISTORY_SUCCESS,
      payload: data,
    });
  } catch (err) {
    const { response } = err;
  }
}

function* getAssets() {
  try {
    const { data, status } = yield call(api.wallets.getAssets);
    if (status < 200 || status >= 300) throw new Error('Something went wrong');
    yield put({
      type: types.GET_ASSETS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    yield put({
      type: types.GET_ASSETS_FAILURE,
    });
  }
}

function* getAllCoins() {
  try {
    const { data, status } = yield call(api.wallets.getAllCoins);
    if (status < 200 || status >= 300) throw new Error('Something went wrong');
    yield put({ type: types.GET_ALL_COINS_SUCCESS, payload: data });
  } catch (error) {
    yield put({ type: types.GET_ALL_COINS_FAILURE });
    // if (error?.response?.status === 401) return;
  }
}

function* getDepositAddress({ body }) {
  try {
    const { data, status } = yield call(api.wallets.getDepositAddress, body);
    if (status < 200 || status >= 300) throw new Error('Something went wrong');
    yield put({ type: types.GET_DEPOSIT_ADDRESS_SUCCESS, payload: data });
  } catch (error) {
    yield put({ type: types.GET_DEPOSIT_ADDRESS_FAILURE });
    // if (error?.response?.status === 401) return;
  }
}

function* getCountries() {
  try {
    const { data, status } = yield call(api.wallets.getCountries);
    if (status < 200 || status >= 300) throw new Error('Something went wrong');

    const formattedCountries = [...data]
      .sort((a, b) => (a.name > b.name ? 1 : -1))
      .map(country => ({ ...country, name: formatCountryName(country.name) }));

    yield put({
      type: types.GET_COUNTRIES_SUCCESS,
      payload: formattedCountries,
    });
  } catch (err) {
    yield put({ type: types.GET_COUNTRIES_FAILURE });
  }
}

function* getAirports({ countryID }) {
  try {
    const { data, status } = yield call(api.wallets.getAirports, countryID);
    if (status < 200 || status >= 300) throw new Error('Something went wrong');

    yield put({ type: types.GET_AIRPORTS_SUCCESS, payload: data });
  } catch (error) {
    yield put({ type: types.GET_AIRPORTS_FAILURE });
    // if (error?.response?.status === 401) return;
  }
}

export function* rootSagaWallets() {
  yield all([
    takeLatest(types.GET_ASSETS_START, getAssets),
    takeLatest(types.GET_WALLETS_WITHDRAWALS_START, getWalletsWithdrawals),
    takeLatest(types.GET_WALLETS_DEPOSITS_START, getWalletsDeposits),
    takeLatest(types.GET_WALLETS_TRANSACTIONS_START, getWalletsTransactions),
    takeLatest(types.GET_WALLETS_TRANSFER_START, getWalletsTransfer),
    takeLatest(types.GET_WALLET_START, getWallet),
    takeLatest(types.GET_WALLETS_START, getWalletsList),
    takeLatest(types.GET_ALL_COINS_START, getAllCoins),
    takeLatest(types.GET_DEPOSIT_ADDRESS_START, getDepositAddress),
    takeLatest(types.GET_AIRPORTS_START, getAirports),
    takeLatest(types.GET_COUNTRIES_START, getCountries),
    takeLatest(
      types.GET_WITHDRAWAL_GOLD_REQUEST_HISTORY_START,
      getGoldWithdrawHistory,
    ),

    fork(rootSagaWalletsCrypto),
    fork(rootSagaWalletsFiat),
  ]);
}
