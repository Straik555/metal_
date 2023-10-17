export const formatTradingPair = spotToBeTraded => {
  switch (spotToBeTraded.toLowerCase()) {
    case 'usdt':
      return 'btc_usdt';
    case 'gold':
      return 'gold_usd';
    default:
      return `${spotToBeTraded}_usdt`;
  }
};
