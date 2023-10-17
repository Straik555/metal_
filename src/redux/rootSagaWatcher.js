import { fork, all, spawn } from 'redux-saga/effects';
import { rootSagaAuth } from './auth/actions';
import { watcherSetLanguage } from './lng/actions';
import * as assetPairs from './pairs/actions';
import * as spotTrade from './trade/spot/actions';
import * as marginTrade from './trade/margin/actions';
import { watcherResetPassword } from './auth/resetPassword/actions';
import { watchOnSocket } from './sockets/action';
import { rootSagaWallets } from './wallets/actions';
import { watcherSignup } from './auth/signup/actions';
import { watcherSetCurrentPair } from './currentPair/actions';
import { watcherGetTopics, watchersendContactUsForm } from './support/actions';
import * as createOrder from './trade/actions';
import { watcherPostCalculateLimitOrder } from './trade/calculate/limitOrder/actions';
import { watcherPostCalculateMarketOrder } from './trade/calculate/marketOrder/actions';
import { watcherChangePassword } from './auth/changePassword/actions';
import { watcherGetUser } from './settings/actions';
import * as apiManagement from './settings/apiManagement/actions';
import { watcherIdentification } from './settings/identification/actions';
import { watcherSetModal } from './modal/actions';
import * as security from './settings/security/actions';
import {
  watcherGetDashboard,
  watcherUpdateTokenDiscount,
  watcherGetTokenDiscount,
} from './settings/dashboard/actions';
import { watcherSetCurrentContract } from './currentContract/actions';

import {
  watcherGetExchangeRate,
  watcherMakeExchange,
  watcherGetExchangeHistory,
} from './bankTransfer/exchange/actions';
import {
  watcherVerifyUserIP,
  watcherRecentCode,
} from './auth/verifyUserIP/actions';
import { watcherSetInterval } from './interval/actions';
import { feesWatcher } from './fees/actions';
import { rootSagaIdentificationKYC } from './auth/verifyUserKYC/actions'

export function* rootSaga() {
  // -----// sockets_start //-----//
  yield fork(watchOnSocket); // try spawn

  // -----// Other //-----//
  yield fork(rootSagaAuth);
  yield fork(watcherResetPassword);
  yield fork(watcherChangePassword);
  yield fork(watcherSignup);
  yield fork(watcherSetLanguage);
  yield fork(watcherGetTopics);
  yield fork(watchersendContactUsForm);
  yield fork(assetPairs.watcherGetTopPairs);
  yield fork(assetPairs.watcherGetAssetPairs);
  yield fork(assetPairs.watcherGetFavoriteAssetPairs);
  yield fork(assetPairs.watcherGetSpotAssetPairs);
  yield fork(assetPairs.watcherGetMarginAssetPairs);
  yield fork(assetPairs.watcherUpdateFavoriteAssetPair);
  yield fork(watcherVerifyUserIP);
  yield fork(watcherRecentCode);
  yield spawn(rootSagaIdentificationKYC);

  // -----// Get user data //-----//
  yield fork(watcherGetUser);

  // -----// Identification //-----//
  yield fork(watcherIdentification);

  // -----// API management //-----//
  yield fork(apiManagement.watcherGetTokens);
  yield fork(apiManagement.watcherPostCreateTokens);
  yield fork(apiManagement.watcherDisableTokens);
  yield fork(apiManagement.watcherDeleteTokens);

  // -----// Dashboard //-----//
  yield fork(watcherGetDashboard);
  yield fork(watcherUpdateTokenDiscount);
  yield fork(watcherGetTokenDiscount);

  // -----// Security //-----//
  yield fork(security.watcherUsersResetPassword);
  yield fork(security.watcherGetUserSecurityData);
  yield fork(security.watcherGetSecretKey);

  // -----// trade //-----//
  yield fork(createOrder.watcherCreateOrder);
  yield fork(createOrder.watcherCreateStopLimitOrder);

  // -----// spot //-----//
  yield fork(spotTrade.watcherSpotGetOrders);
  yield fork(spotTrade.watcherSpotCancelOrder);
  yield fork(spotTrade.watcherSpotCancelAllOrders);
  yield fork(spotTrade.watcherSpotGetHistory);
  yield fork(spotTrade.watcherSpotGetTradeHistory);
  yield fork(spotTrade.watcherSpotGetOrderBook);
  yield fork(spotTrade.watcherSpotGetRecentTrades);
  // -----// margin //-----//
  yield fork(marginTrade.watcherMarginGetOrders);
  yield fork(marginTrade.watcherMarginCancelOrder);
  yield fork(marginTrade.watcherMarginCancelAllOrders);
  yield fork(marginTrade.watcherMarginGetHistory);
  yield fork(marginTrade.watcherMarginGetTradeHistory);
  yield fork(marginTrade.watcherMarginLowRisk);
  yield fork(marginTrade.watcherMarginBorrows);
  yield fork(marginTrade.watcherMarginSingleBorrow);
  yield fork(marginTrade.watcherMarginPostBorrow);
  yield fork(marginTrade.watcherMarginGetRepay);
  yield fork(marginTrade.watcherMarginPostRepay);
  yield fork(marginTrade.watcherMarginPostTransform);

  // -----// wallets // ----- //
  yield fork(rootSagaWallets);

  // ---- // currentPair // ----- //
  yield fork(watcherSetCurrentPair);

  // ---- // currentPair // ----- //
  yield fork(watcherSetCurrentContract);

  // ---- // watcherPostCalculate // ----- //
  yield fork(watcherPostCalculateMarketOrder);
  yield fork(watcherPostCalculateLimitOrder);
  yield fork(watcherSetModal);

  // ---- // instance exchange // ----- //
  yield fork(watcherGetExchangeRate);
  yield fork(watcherMakeExchange);
  yield fork(watcherGetExchangeHistory);

  yield fork(watcherSetInterval);

  // ---- // fees // ----- //
  yield fork(feesWatcher);
}
