import axios from 'axios';

export default {
  auth: {
    login: data => axios.post(`/api/login`, data),
    logout: () => axios.post(`/api/logout`),
    resetPassword: data => axios.post(`/api/password_reset`, data),
    signup: data => axios.post(`/api/register`, data),
    changePassword: data => axios.put(`/api/user/password`, data),
    confirmEmail: data => axios.put(`/api/email_confirmation`, data),
    verifyUserIP: data => axios.put(`/api/whitelist_ip`, data),
    recentCode: email => axios.post(`/api/whitelist_ip/resend`, email),
    refreshToken: () => axios.get(`/api/token/refresh`),
  },
  fees: {
    getFees: assetID => axios.get(`/api/user/fees?asset_id=${assetID}`),
    getAllFees: () => axios.get(`/api/assets_fees`),
  },
  settings: {
    user: () => axios.get('/api/user', { params: { with_doc: true } }),
    apiManagement: {
      getToken: () => axios.get('/api/api_tokens'),
      createToken: data => axios.post('/api/api_tokens', data),
      disable: data => axios.put(`/api/api_tokens/${data.id}`, data),
      delete: data => axios.delete(`/api/api_tokens/${data}`),
    },
    identification: {
      updatePersonaData: data => axios.put('/api/user/data/update', data),
      updateDocument: data => axios.post('/api/user/document/file', data),
      deleteDocument: id => axios.delete(`/api/user/document/file/${id}`),
      getCountryKYC: () => axios.get(`/api/kyc/countries`),
      getLanguagesKYC: () => axios.get(`/api/kyc/languages`),
      getVerificationKYC: (data) => axios.post(`/api/kyc/auth`, data),
    },
    security: {
      resetPassword: data => axios.put('/api/settings/change_password', data),
      getUserData: () => axios.get(`/api/user/security`),
      getAntiphishingState: () => axios.get('/api/settings/antiphishing'),
      setAntiphishingState: body =>
        axios.post('/api/settings/antiphishing', body),
    },
    dashboard: {
      getData: () => axios.get('/api/user/dashboard'),
      updateTokenDiscount: data => axios.put(`/api/user/token_discount`, data),
      getTokenDiscount: () => axios.get(`/api/user/token_discount`),
    },
  },
  wallets: {
    getWalletsList: () => axios.get('/api/settings/wallets'),
    getAssets: () => axios.get(`/api/assets`),
    getWallet: id => axios.get(`/api/settings/wallets/${id}`),
    getWalletsTransactions: query =>
      axios.get(`/api/settings/wallets/transactions${query}`),
    getWalletsTransfer: body =>
      axios.get(`/api/settings/wallets/transfers`, body),
    getWalletsDeposits: query =>
      axios.get(`/api/settings/wallets/deposits?wallet_id=${query}`),
    getWalletsWithdrawals: query =>
      axios.get(`/api/settings/wallets/withdrawals?wallet_id=${query}`),
    getGoldWithdrawHistory: query =>
      axios.get(`/api/settings/wallets/withdrawal_gold_request/${query}`),
    getAllCoins: () => axios.get('/api/settings/wallets/get_coins'),
    getDepositAddress: body =>
      axios.post('/api/settings/wallets/get_deposit', body),
    airdrop: {
      getAirdropTransactions: body =>
        axios.get(`/api/settings/dividends`, body),
      postTransferToSpot: body =>
        axios.post(`/api/settings/dividends/transfer_to_spot`, body),
    },
    fiat: {
      postCreateBankDepositRequest: body =>
        axios.post(`/api/settings/wallets/bank_deposit`, body),
      sendPayPalDepositRequest: body =>
        axios.post('/api/payment/paypal/deposit/new', body),
      sendPayPalFiatWithdrawalRequest: body =>
        axios.post('/api/payment/paypal/withdraw/new', body),
    },
    crypto: {
      postGenerateAddressForWallet: id =>
        axios.post(`/api/settings/wallets/${id}/generate_address`),

      postCreateWithDrawalGoldRequest: body =>
        axios.post('/api/settings/wallets/withdrawal_gold_request', body),
      postCreateWithdrawalRequest: body =>
        axios.post(`/api/settings/wallets/withdrawal_request`, body), // new api (does't works) /api/settings/wallets/withdraw
      deleteWithdrawalDepositRequest: body =>
        axios.delete(`/api/settings/wallets/transactions`, body),
    },
    getCountries: () => axios.get('/api/airports/countires'),
    getAirports: countryID => axios.get(`/api/airports/countires/${countryID}`),
  },
  trading: {
    getTopPairs: () => axios.get('/api/top_pairs'),
    getAssetPairs: () => axios.get('/api/assets_pairs'),
    getOrderBook: ({ activePair, data }) =>
      axios.get(`/api/order_book/${activePair}`, data),
    getSpotAssetPairs: () => axios.get('/api/assets_pairs/spot'), // for spot pairs list
    getMarginAssetPairs: () => axios.get('/api/assets_pairs/margin'), // for margin market list
    getFavoriteAssetPairs: () => axios.get('/api/assets_pairs/favorite'), // for fav market list
    updateFavoriteAssetPair: body =>
      axios.put('/api/assets_pairs/favorite', body),
    postCalculateMarketOrder: data =>
      axios.post(`/api/calculate_market_order`, data),
    postCalculateLimitOrder: data =>
      axios.post(`/api/calculate_limit_order`, data),
    postPublicCalculateMarketOrder: data =>
      axios.post(`/api/custom/calculate_market_order`, data),
    postPublicCalculateLimitOrder: data =>
      axios.post(`/api/custom/calculate_limit_order`, data),
    getRecentTrades: (activePair, data) =>
      axios.get(`/api/trades/${activePair}`, data),

    // ---- tables block / market page
    getOrders: data => axios.get('/api/my_orders/opened', data),
    cancelOrder: activePair => axios.post(`/api/orders/${activePair}/cancel`),
    cancelAllOrders: data => axios.post(`/api/order/cancel/all`, data),
    cancelOpenedLimitOrder: id =>
      axios.post(`/api/stop_limit_orders/${id}/cancel`),
    getTradesHistory: data => axios.get('/api/trades_history', data),
    getOrdersBook: ({ activePair, limit }) =>
      axios.get(`/api/order_book/${activePair}/${limit}`),
    getHistory: data => axios.get('/api/orders_history', data),
    getFunds: () => axios.get('/api/settings/wallet'),
    loadRecentTrades: ({ activePair, params }) =>
      axios.get(`/api/trades/${activePair}`, { params }),
    createOrder: ({ payload }) => axios.post('/api/orders', payload),
    createStopLimitOrder: ({ payload }) =>
      axios.post('/api/stop_limit_orders', payload),

    margin: {
      getOpenOrders: data => axios.get(`/api/my_orders/opened/margin`, data),
      getOrderHistory: data => axios.get('/api/my_orders/all/margin', data),
      getTradeHistory: data =>
        axios.get('/api/orders_transactions/margin', data),
      cancelAllOpenedOrders: data =>
        axios.post(`/api/order/cancel/all/margin`, data),
    },
  },
  chart: {
    getHistoryChart: query => axios.get(`/api/history${query}`),
  },
  support: {
    getTopics: () => axios.get('/api/topics'),
    postContactUs: data => axios.post('/api/contact_us', data),
  },
  margin: {
    getLowRisk: () => axios.get('/api/low_risk'),
    openMargin: () => axios.post('/api/open_margin'),
    getBalance: () => axios.get('/api/margin_balances'),
    getBorrow: params => axios.get('/api/get_borrow', { params }),
    getBorrows: () => axios.get('/api/get_borrows'),
    getRepay: params => axios.get('/api/get_repay', { params }),
    getRapyas: () => axios.get('/api/get_repays'),
    getBalanceHistory: () => axios.get('/api/user_margin_balance_history'),
    getInterestHistory: () => axios.get('/api/interest_history'),
    transferToMargin: data => axios.post('/api/transfer_to_margin', data),
    transferToExchange: data => axios.post('/api/transfer_to_exchange', data),
    transferToSpot: data => axios.post('/api/transfer_to_spot', data),
    borrowing: data => axios.post('/api/borrowing_margin_balances', data),
    repay: data => axios.post('/api/repay_margin_balances', data),
  },
  bankTransfer: {
    exchangeRate: assets => axios.post(`/api/exchange_rate`, assets),
    makeExchange: data => axios.post(`/api/exchange`, data),
    getExchangeHistory: query => axios.get(`api/exchanges${query}`),
  },
};
