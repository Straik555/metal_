import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import L from 'i18n-react';
import {
  toCrop,
  cropUsdt,
  numberWithCommas,
} from '../../../../../services/helpers';

import { currentPairSelector } from '../../../../../redux/currentPair/selectors';
import { assetPairsSelector } from '../../../../../redux/pairs/selectors';
import { recentTradesSpotSelector } from '../../../../../redux/trade/spot/selectors';
import { storeCurentDecimal } from '../../../../../redux/decimals/selectors';
import { languageSelector } from '../../../../../redux/lng/selectors';

const InfoOfPairs = () => {
  const assetPairs = useSelector(assetPairsSelector);
  const currentPair = useSelector(currentPairSelector);
  const recentTrades = useSelector(recentTradesSpotSelector);
  const language = useSelector(languageSelector); // need to update language

  const [pairData, setPairData] = useState(null);
  const [priceChange, setPriceChange] = useState(true);
  const [date, setDate] = useState(new Date());
  const decimal = useSelector(storeCurentDecimal);

  const changePairData = activePair => {
    const pairDataNew = assetPairs.find(pair => pair.code === activePair);
    if (pairData && pairDataNew?.change_24_hour !== pairData?.change_24_hour) {
      setPriceChange(pairDataNew?.change_24_hour >= 0);
    }
    setPairData(pairDataNew);
  };

  useEffect(() => {
    const dateAndTime = setInterval(() => setDate(new Date()), 1000);
    return () => {
      clearInterval(dateAndTime);
    };
  }, []);

  useEffect(() => {
    if (assetPairs) {
      changePairData(currentPair);
    }
  }, [assetPairs, currentPair, recentTrades]);
  const pairLastPrice =
    recentTrades[0] && recentTrades[0]?.price >= recentTrades[1]?.price;
  return (
    <div className="info-panel">
      <p className="market-time">{`${date.toLocaleDateString()} ${date.toLocaleTimeString()}`}</p>
      <div className="market-info">
        <div className="change-info">
          <p className="change-info__top">
            {L.translate('Trading.infoOfPairs.last_price')}{' '}
            {pairData ? pairData.code.split('_')[0].toUpperCase() : ''}
          </p>
          <p className="change-info__val">
            <span className={pairLastPrice ? 'green' : 'red'}>
              <i
                className={`fas ${
                  pairLastPrice
                    ? 'fa-long-arrow-alt-up'
                    : 'fa-long-arrow-alt-down'
                }`}
              />
              {/* {cropUsdt(currentPair, pairData?.last_price) || 0} */}
              {numberWithCommas(toCrop(decimal)(recentTrades[0]?.price) || 0)}
            </span>
            <span className="">
              {`$${numberWithCommas(
                toCrop(decimal)(pairData?.last_price_usd) || 0,
              )}`}
            </span>
          </p>
        </div>
        <div className="change-info">
          <p className="change-info__top">
            {L.translate('Trading.infoOfPairs.24h_change')}
          </p>
          <p className="change-info__val">
            <span className={priceChange ? 'green' : 'red'}>
              <i
                className={`fas ${
                  priceChange
                    ? 'fa-long-arrow-alt-up'
                    : 'fa-long-arrow-alt-down'
                }`}
              />
              {`${pairData ? toCrop(2)(pairData.change_24_hour) : 0}%`}
            </span>
          </p>
        </div>
        <div className="change-info">
          <p className="change-info__top">
            {L.translate('Trading.infoOfPairs.24h_high')}
          </p>
          <p className="change-info__val">
            <span className="green">
              {numberWithCommas(toCrop(decimal)(pairData?.high24) || 0)}
            </span>
          </p>
        </div>
        <div className="change-info">
          <p className="change-info__top">
            {L.translate('Trading.infoOfPairs.24h_low')}
          </p>
          <p className="change-info__val">
            <span className="red">
              {numberWithCommas(toCrop(decimal)(pairData?.low24) || 0)}
            </span>
          </p>
        </div>
        {/* <div className="change-info change-info--type2">
          <p className="change-info__top change-info__top--type2">
            {L.translate('Trading.infoOfPairs.price_snapshot')}
          </p>
          <p className="change-info__val">
            <span
              className={
                pairData?.price_snapshot_data?.price_snapshot_change >= 0
                  ? 'green'
                  : 'red'
              }
            >
              {pairData?.price_snapshot_data?.price_snapshot_change || 0}%
            </span>
          </p>
        </div> */}
        <div className="change-info change-info--type2">
          <p className="change-info__top change-info__top--type2">
            {L.translate('Trading.infoOfPairs.24h_volume')}
          </p>
          <p className="change-info__val">
            <span className="">
              {numberWithCommas(toCrop(decimal)(pairData?.volume24h) || 0)}
            </span>
          </p>
        </div>
        {/* <div className="change-info change-info--type2">
          <p className="change-info__top change-info__top--type2">
            {L.translate('Trading.infoOfPairs.total_buy_volume')}
          </p>
          <p className="change-info__val">
            <span className="">
              {numberWithCommas(
                pairData?.price_snapshot_data?.price_snapshot_total_buy || 0,
              )}
            </span>
          </p>
        </div>
        <div className="change-info change-info--type2">
          <p className="change-info__top change-info__top--type2">
            {L.translate('Trading.infoOfPairs.total_sell_volume')}
          </p>
          <p className="change-info__val">
            <span className="">
              {numberWithCommas(
                pairData?.price_snapshot_data?.price_snapshot_total_sell || 0,
              )}
            </span>
          </p>
        </div> */}
      </div>
    </div>
  );
};

// export default InfoOfPairs;
export default React.memo(InfoOfPairs);
