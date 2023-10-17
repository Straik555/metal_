import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import L from 'i18n-react';

import PairsListItem from '../PairsListItem';
// import nothingImg from '../../../../img/nothing.png';
import types from '../../../../../redux/types';
import routes from '../../../../../routes';
import LoaderTable from '../../../../Base/Loader/LoaderTable';
import {
  assetPairsLoaderSelector,
  favoritePairsSelector,
} from '../../../../../redux/pairs/selectors';

function SpotFavorites(props) {
  const location = useLocation();
  const { searchState } = props;
  const dispatch = useDispatch();
  const pairs = useSelector(favoritePairsSelector);
  // const pairs = useSelector(state => state.assetPairs.spotPairs);

  const isAssetPairsLoading = useSelector(assetPairsLoaderSelector);

  // useEffect(() => {
  //   if (location.pathname === routes.Pairs.Favorites.SpotFavorites.path) {
  //     dispatch({ type: types.GET_FAVORITE_ASSET_PAIRS_START });
  //   }
  // }, [location.pathname]);

  const nothing = () => {
    return (
      <tr>
        <td colSpan="8">
          <div className="nothing-to-show">
            <img src="/img/nothing.png" alt="" />
            <p>{L.translate('Global.no_fav')}</p>
          </div>
        </td>
      </tr>
    );
  };

  const filterFav = (array, search) => {
    if (search) {
      return array.filter(item => item.favorite && item.code.includes(search));
    }
    return array.filter(item => item.favorite);
  };
  const favorite = filterFav(pairs, searchState);

  return (
    <>
      {isAssetPairsLoading ? (
        <LoaderTable colSpan={7} />
      ) : (
        <tbody>
          {favorite?.length && !isAssetPairsLoading
            ? favorite.map(pair => <PairsListItem key={pair.id} pair={pair} />)
            : nothing()}
        </tbody>
      )}
    </>
  );
}

export default SpotFavorites;
