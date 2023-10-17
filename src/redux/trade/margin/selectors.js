export const singleRepaySelector = state => state.trade.margin.singleRepay;
export const lowRiskMarginSelector = state => state.trade.margin.lowRisk;
export const balanceMarginSelector = state => state.trade.margin.balance;
export const ordersMarginSelector = state => state.trade.margin.tables.orders;
export const historyMarginSelector = state => state.trade.margin.tables.history;
export const tradeHistoryMarginSelector = state =>
  state.trade.margin.tables.tradeHistory.data;
