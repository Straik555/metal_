export const filterSearch = (data, substring) => {
  return data.filter(aset =>
    aset.code.toUpperCase().includes(substring.toUpperCase()),
  );
};

export const dataPairs = (pathname, arr1, arr2, searchSubstring) => {
  const data = arr1;
  // if (pathname.includes('margin')) {
  //   data = arr1.filter(asset => asset.for_margin);
  // }
  const serchData = filterSearch(data, searchSubstring);
  return serchData;
  // return mapperFavorites(serchData, arr2);
};
