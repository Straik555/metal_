export const selectedTradeSelector = state => state.temporary.selectedTrade;
export const selectedTradePriceSelector = state =>
  state.temporary.selectedTrade.price;

export const selectedContractSelector = state =>
  state.temporary.selectedContract.symbol;
