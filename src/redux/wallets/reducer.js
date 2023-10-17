import types from '../types';

const initialState = {
  invoice: null,
  recentDepositHistory: null,
  recentWithdrawHistory: {},
  recentGoldWithdrawHistory: {},
  transactionHistory: null,
  transferHistory: null,
  airdrop: null,
  allCoins: null,
  depositAddress: '',
  loadingAddress: false,
  loading: false,
  spot: {},
  countries: [],
  airports: [],
  loadingCountries: false,
  depositWindowUrl: '',
};

// because of fucking binance
const createObjectWithCorrectKeys = obj => {
  const correctObj = {};

  Object.keys(obj).forEach(key => {
    const newKey = obj[key].coin?.toLowerCase();
    correctObj[newKey] = obj[key];
  });

  return correctObj;
};

export const wallets = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.GET_WALLETS_TRANSACTIONS_START:
    case types.GET_WALLETS_START:
    case types.GET_AIRDROP_TRANSACTIONS_START:
    case types.GET_ALL_COINS_START:
    case types.GET_WALLETS_TRANSFER_START:
    case types.GET_AIRPORTS_START:
    case types.SEND_PAY_PAL_DEPOSIT_REQUEST_START:
      return {
        ...state,
        loading: true,
      };
    case types.GET_DEPOSIT_ADDRESS_START:
      return {
        ...state,
        loadingAddress: true,
      };
    case types.GET_COUNTRIES_START:
      return {
        ...state,
        loadingCountries: true,
      };

    case types.POST_CREATE_BANK_DEPOSITE_REQUEST_SUCCESS:
      return {
        ...state,
        invoice: payload,
      };
    case types.GET_WALLETS_DEPOSITS_SUCCESS:
      return {
        ...state,
        recentDepositHistory: payload,
      };
    case types.GET_WALLETS_WITHDRAWALS_SUCCESS:
      return {
        ...state,
        recentWithdrawHistory: payload,
      };
    case types.GET_WITHDRAWAL_GOLD_REQUEST_HISTORY_SUCCESS:
      return {
        ...state,
        recentGoldWithdrawHistory: payload,
      };
    case types.GET_AIRPORTS_SUCCESS:
      return {
        ...state,
        airports: payload,
      };
    case types.GET_WALLETS_TRANSACTIONS_SUCCESS:
      return {
        ...state,
        transactionHistory: payload,
        loading: false,
      };
    case types.GET_WALLETS_TRANSFER_SUCCESS:
      return {
        ...state,
        transferHistory: payload,
        loading: false,
      };
    case types.GET_WALLETS_SUCCESS:
    case types.UPDATE_WALLETS:
      return {
        ...state,
        loading: false,
        ...payload,
      };
    case types.GET_AIRDROP_TRANSACTIONS_SUCCESS:
      return {
        ...state,
        airdrop: payload,
        loading: false,
      };

    case types.GET_ALL_COINS_SUCCESS:
      return {
        ...state,
        allCoins: createObjectWithCorrectKeys(payload),
        loading: false,
      };
    case types.GET_DEPOSIT_ADDRESS_SUCCESS:
      return {
        ...state,
        depositAddress: payload,
        loadingAddress: false,
      };
    case types.GET_COUNTRIES_SUCCESS:
      return {
        ...state,
        loadingCountries: false,
        countries: payload,
      };
    case types.SEND_PAY_PAL_DEPOSIT_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        depositWindowUrl: payload,
      };
    case types.GET_WALLETS_TRANSACTIONS_FAILURE:
    case types.GET_WALLETS_FAILURE:
    case types.GET_AIRDROP_TRANSACTIONS_FAILURE:
    case types.GET_WALLETS_TRANSFER_FAILURE:
    case types.GET_ALL_COINS_FAILURE:
    case types.GET_AIRPORTS_FAILURE:
    case types.SEND_PAY_PAL_DEPOSIT_REQUEST_FAILURE:
      return {
        ...state,
        loading: false,
      };
    case types.GET_COUNTRIES_FAILURE:
      return {
        ...state,
        loadingCountries: false,
      };

    case types.GET_DEPOSIT_ADDRESS_FAILURE:
      return {
        ...state,
        loadingAddress: false,
      };

    case types.POST_GENERATE_ADRESS_WALLETS_START: // Same case like GET_ADRESS but, we need to generate new one.
      return {
        ...state,
        loadingAddress: true,
      };
    case types.POST_GENERATE_ADRESS_WALLETS_SUCCESS:
      return {
        ...state,
        loadingAddress: false,
        depositAddress: payload,
      };
    case types.POST_GENERATE_ADRESS_WALLETS_FAILURE:
      return {
        ...state,
        loadingAddress: false,
      };
    case types.CLEAR_DEPOSIT_WINDOW_URL:
      return {
        ...state,
        depositWindowUrl: '',
      };

    case types.LOGOUT_SUCCESS:
      return initialState;
    default:
      return state;
  }
};

const initialStateAssets = {
  assets: [],
  loading: false,
};

export const assets = (state = initialStateAssets, action) => {
  switch (action.type) {
    case types.GET_ASSETS_START:
      return {
        ...state,
        loading: true,
      };
    case types.GET_ASSETS_SUCCESS:
      return {
        ...state,
        assets: action.payload,
        loading: false,
      };
    case types.GET_ASSETS_FAILURE:
      return {
        ...state,
        loading: false,
      };
    // case types.LOGOUT_SUCCESS:
    //   return initialStateAssets;
    default:
      return state;
  }
};
