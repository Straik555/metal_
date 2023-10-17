export const getGoldAssetPairs = assets => {
  if (!assets || !assets.length) return [];
  const goldPairsCodes = ['usd', 'eur', 'mtcg'];

  return assets.filter(({ code }) => {
    if (!code) return false;
    return goldPairsCodes.some(pairCode => pairCode === code.toLowerCase());
  });
};

export const removeEinNumString = num => {
  const result = String(num).split('e')[0];
  return result;
};
