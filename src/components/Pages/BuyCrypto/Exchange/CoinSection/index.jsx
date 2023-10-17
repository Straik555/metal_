import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SocketTopAssetsPairs from '../../../../HOC/SocketTopAssetsPairs';
import {
  topAssetsPairsSelector,
  topPairsSelector,
} from '../../../../../redux/pairs/selectors';
import types from '../../../../../redux/types';
import CoinWrapper from './CoinWrapper';

const CoinSection = ({ assets }) => {
  const topAssetsPairs = useSelector(topAssetsPairsSelector);
  const topPairs = useSelector(topPairsSelector);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: types.GET_TOP_PAIRS_START });
  }, []);

  const findAsset = (assetCode, array) => {
    if (array?.length > 0) {
      return array.map(asset => {
        if (asset.code.includes(assetCode)) {
          return (
            <CoinWrapper
              key={asset?.id}
              coin_name={asset?.code}
              last_price_usd={asset?.last_price_usd}
              change_24={asset?.change_24_hour}
              view_decimal={asset?.view_decimal}
            />
          );
        }
      });
    }
  };

  return (
    <>
      <SocketTopAssetsPairs />
      <div className="container">
        <div className="exchange-coins">
          {topPairs?.map(pair => findAsset(pair?.pair_code, topAssetsPairs))}
        </div>
      </div>
    </>
  );
};

export default CoinSection;
