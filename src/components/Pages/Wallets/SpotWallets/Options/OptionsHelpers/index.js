export const checkIsSpotExist = (allSpots, currentCode) => {
  const spots = Object.keys(allSpots);
  if (spots.length === 0) return true;

  const isExistSpot = Boolean(spots.find(spotName => spotName === currentCode));
  return isExistSpot;
};
