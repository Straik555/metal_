export const walletSelector = state => state.wallets;
export const invoiceWalletSelector = state => state.wallets.invoice;
export const recentDepositHistoryWalletSelector = state =>
  state.wallets.recentDepositHistory;
export const recentWithdrawHistoryWalletSelector = state =>
  state.wallets.recentWithdrawHistory;
export const recentGoldWithdrawHistoryWalletSelector = state =>
  state.wallets.recentGoldWithdrawHistory;
export const transactionHistoryWalletSelector = state =>
  state.wallets.transactionHistory;
export const transferHistoryWalletSelector = state =>
  state.wallets.transferHistory;
export const airdropWalletSelector = state => state.wallets.airdrop;
export const spotWalletSelector = state => state.wallets.spot;
export const marginWalletSelector = state => state.wallets.margin;
export const loadingWalletSelector = state => state.wallets.loading;

export const jTestBalanceSelector = state =>
  state?.wallets?.spot?.jtesta?.balance;
export const jTestViewDecimalSelector = state =>
  state?.wallets?.spot?.jtesta?.asset?.view_decimal;

export const airdropSelector = state =>
  state.wallets?.airdrop?.balance?.dividends;
export const marginSingleBorrowWalletSelector = state =>
  state.trade.margin.singleBorrow;

export const assetsWalletSelector = state => state.assets.assets;
export const depositAddressSelector = state => state.wallets.depositAddress;
export const loadingAddressSelector = state => state.wallets.loadingAddress;
export const countriesSelector = state => state.wallets.countries;
export const airportsSelector = state => state.wallets.airports;
export const paymentWindowUrlSelector = state => state.wallets.depositWindowUrl;
