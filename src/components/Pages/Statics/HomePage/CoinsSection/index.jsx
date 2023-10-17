import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import types from '../../../../../redux/types';
import CoinWrapper from './CoinWrapper';
import SocketTopAssetsPairs from '../../../../HOC/SocketTopAssetsPairs';
import {
  topPairsSelector,
  topAssetsPairsSelector,
} from '../../../../../redux/pairs/selectors';

const CoinSection = () => {
  const topAssetsPairs = useSelector(topAssetsPairsSelector);
  const topPairs = useSelector(topPairsSelector);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: types.GET_TOP_PAIRS_START });
  }, []);

  // It was using while we needed just 3 pairs with usdt at the main paige
  // const findThreePairs = (selectedPairs, crypto) => {
  //   if (
  //     (crypto.code.includes('btc') ||
  //       crypto.code.includes('testa') ||
  //       crypto.code.includes('eth')) &&
  //     selectedPairs.length < 3
  //   ) {
  //     selectedPairs = [
  //       ...selectedPairs,
  //       <CoinWrapper
  //         key={crypto?.id}
  //         coin_name={crypto?.code}
  //         last_price_usd={crypto?.last_price_usd}
  //         change_24={crypto?.change_24_hour}
  //         // assets={assets}
  //       />,
  //     ];
  //     return selectedPairs;
  //   }
  //   return selectedPairs;
  // };

  const findAsset = (assetCode, array) => {
    if (array?.length > 0) {
      return array.map(asset => {
        if (asset.code.includes(assetCode)) {
          return (
            <CoinWrapper
              view_decimal={asset?.view_decimal}
              key={asset?.id}
              coin_name={asset?.code}
              last_price_usd={asset?.last_price_usd}
              change_24={asset?.change_24_hour}
            />
          );
        }
      });
    }
  };

  return (
    <section className="coins-section">
      <SocketTopAssetsPairs />
      <div className="container">
        <div className="row">
          {topPairs?.map(pair => findAsset(pair?.pair_code, topAssetsPairs))}
        </div>
      </div>
    </section>
  );
};

export default CoinSection;
