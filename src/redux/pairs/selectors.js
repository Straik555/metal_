export const assetPairsSelector = state => state.assetPairs.assetPairs;
export const favoritePairsSelector = state => state.assetPairs.favoritePairs;
export const topPairsSelector = state => state.assetPairs.topPairs;
export const marginPairsSelector = state => state.assetPairs.marginPairs;
export const spotPairsSelector = state => state.assetPairs.spotPairs;
export const futuresContractsSelector = state =>
  state.assetPairs.futuresContracts;
export const assetPairsLoaderSelector = state => state.assetPairs.loading;
export const topAssetsPairsSelector = state => state.assetPairs.topAssetsPairs;
