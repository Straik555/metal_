export const recentTradesSpotSelector = state => state.trade.spot.recentTrades;
export const lastPriceSelector = state =>
  state.trade?.spot?.recentTrades[0]?.price;
export const orderBookSpotSelector = state => state.trade.spot.orderBook;
export const historySpotSelector = state => state.trade.spot.tables.history;
export const ordersSpotSelector = state => state.trade.spot.tables.orders;
export const tradeHistoryDataSpotSelector = state =>
  state.trade.spot.tables.tradeHistory.data;
export const tradeHistorySpotSelector = state =>
  state.trade.spot.tables.tradeHistory;
