import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import L from 'i18n-react';

import PairsListItem from './PairsListItem';
// import nothingImg from '../../../../img/nothing.png';
import types from '../../../../redux/types';
import Loader from '../../../Base/Loader';
import LoaderTable from '../../../Base/Loader/LoaderTable';
import {
  assetPairsLoaderSelector,
  spotPairsSelector,
} from '../../../../redux/pairs/selectors';

function PairsSpot(props) {
  const { searchState } = props;
  const isAssetPairsLoading = useSelector(assetPairsLoaderSelector);
  const dispatch = useDispatch();
  const spot = useSelector(spotPairsSelector);

  // useEffect(() => {
  //   dispatch({ type: types.GET_SPOT_ASSET_PAIRS_START });
  // }, []);

  const nothing = () => {
    return (
      <tr>
        <td colSpan="8">
          <div className="nothing-to-show">
            <img src="/img/nothing.png" alt="" />
            <p>{L.translate('Global.nothing')}</p>
          </div>
        </td>
      </tr>
    );
  };

  const filterWithSearch = (array, search) => {
    if (search) {
      return array.filter(item => item.code.includes(search));
    }
    return array;
  };

  const spotToShow = filterWithSearch(spot, searchState);

  return (
    <>
      {isAssetPairsLoading ? (
        <LoaderTable colSpan={7} />
      ) : (
        <tbody>
          {spotToShow?.length && !isAssetPairsLoading
            ? spotToShow.map(pair => (
                <PairsListItem key={pair.id} pair={pair} />
              ))
            : nothing()}
        </tbody>
      )}
    </>
  );
}

export default PairsSpot;
