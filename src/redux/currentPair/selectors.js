// import { createSelector } from 'reselect';

// const spotWalletSelector = state => state.wallets.spot;
export const currentPairSelector = state => state.currentPair.pair;
// export const currentPairBalance = createSelector(
//   state => state.wallets.spot,
//   state => state.currentPair.pair,
//   (spot, pair) => {
//     const buyCode = pair.split('_')[1];
//     const sellCode = pair.split('_')[0];
//     if (pair && spot && spot[buyCode] && spot[sellCode]) {
//       return {
//         buy: { code: buyCode, balance: spot[buyCode].balance },
//         sell: { code: sellCode, balance: spot[sellCode].balance },
//       };
//     }
//     return {
//       buy: { code: 'buyCode', balance: 0 },
//       sell: { code: 'sellCode', balance: 0 },
//     };
//   },
// );
