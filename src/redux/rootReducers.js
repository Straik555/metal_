import { combineReducers } from 'redux';
import language from './lng/reducer';
import assetPairs from './pairs/reducers';
import user from './auth/reducer';
import trade from './trade/reducers';
import socket from './sockets/reducer';
import { wallets, assets } from './wallets/reducer';
import currentPair from './currentPair/reducer';
import contactUS from './support/reducer';
import temporary from './temporary/reducers';
import settings from './settings/reducers';
import modal from './modal/reducer';
import currentContract from './currentContract/reducer';
import instanceExchange from './bankTransfer/exchange/reducer';
import interval from './interval/reducer';
import fees from './fees/reducer';
import decimals from './decimals/reducers';

const rootReducers = combineReducers({
  decimals,
  // fees,
  interval,
  modal,
  socket,
  user,
  language,
  assetPairs,
  trade,
  wallets,
  currentPair,
  currentContract,
  assets,
  contactUS,
  temporary,
  settings,
  instanceExchange,
  fees,
});

export default rootReducers;
