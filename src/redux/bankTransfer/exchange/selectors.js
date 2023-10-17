export const instanceExchangeSelector = state => state.instanceExchange;
export const instanceExchangeRateSelector = state =>
  state.instanceExchange.rate;
export const exchangeHistorySelector = state =>
  state.instanceExchange.exchangesData;
export const exchangeIsLoadingSelector = state =>
  state.instanceExchange.loading;
