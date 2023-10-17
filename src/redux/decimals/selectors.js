import { createSelector } from 'reselect';

export const storeCurrentPair = state => state.currentPair.pair;
export const storeDecimals = state => state.decimals;
export const storeDecimalPairs = state => state.decimals.pairs;
export const storeCurentDecimal = createSelector(
  [storeDecimals, storeCurrentPair],
  (decimals, pair) => {
    if (decimals?.pairs && pair) {
      return decimals?.pairs[pair] || 2; // fixed 8
    }
  },
);
