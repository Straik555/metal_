import React, { useState, useEffect } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import L from 'i18n-react';

import StopLimit from './StopLimit';
import LimitOrder from './LimitOrder';
import MarketOrder from './MarketOrder';
import {
  cropNumber,
  toCrop,
  numberWithCommas,
  cropUsdt,
} from '../../../../../services/helpers';
import { currentPairSelector } from '../../../../../redux/currentPair/selectors';
import { spotWalletSelector } from '../../../../../redux/wallets/selectors';

const SwitchOrderType = ({ props }) => {
  const { mode, type, asset } = props;
  const balance = mode === 'Buy' ? asset?.buy?.balance : asset?.sell?.balance;
  switch (type) {
    case 'limit_order':
      return (
        <LimitOrder
          assetToTrade={asset?.sell?.code}
          assetBalance={asset?.buy?.code}
          balance={balance}
          mode={mode}
        />
      );
    case 'market_order':
      return (
        <MarketOrder
          assetToTrade={asset?.sell?.code}
          assetBalance={asset?.buy?.code}
          balance={balance}
          mode={mode}
        />
      );
    case 'stop_limit':
      return (
        <StopLimit
          assetToTrade={asset?.sell?.code}
          assetBalance={asset?.buy?.code}
          balance={balance}
          mode={mode}
        />
      );
    default:
      return (
        <LimitOrder
          assetToTrade={asset?.sell?.code}
          assetBalance={asset?.buy?.code}
          balance={balance}
          mode={mode}
        />
      );
  }
};

function BuySellWrapper(props) {
  const { mode, orderType } = props;
  const auth = useSelector(state => !!state.user.token);
  const spot = useSelector(spotWalletSelector);
  const pair = useSelector(currentPairSelector);
  const currentPairBalance = (spot, pair) => {
    const buyCode = pair.split('_')[1];
    const sellCode = pair.split('_')[0];

    if (pair && spot && spot[buyCode] && spot[sellCode]) {
      return {
        buy: { code: buyCode, balance: spot[buyCode].balance },
        sell: { code: sellCode, balance: spot[sellCode].balance },
      };
    }
    return {
      buy: { code: buyCode, balance: 0 },
      sell: { code: sellCode, balance: 0 },
    };
  };

  const asset = currentPairBalance(spot, pair);

  const cropBalance =
    mode === 'Buy'
      ? cropNumber(asset?.buy?.balance)
      : cropNumber(asset?.sell?.balance);

  const sellCode = mode === 'Buy' ? asset?.buy?.code : asset?.sell?.code;
  return (
    <div className="side-panel__col">
      <p className="block-title">
        {mode === 'Buy'
          ? L.translate('Trading.orderCreation.buy')
          : L.translate('Trading.orderCreation.sell')}{' '}
        {asset?.sell?.code.toUpperCase()}
        {auth && (
          <>
            <span>
              {sellCode.toUpperCase()}{' '}
              {L.translate('Trading.orderCreation.balance')}: {cropBalance}
            </span>
          </>
        )}
      </p>
      <SwitchOrderType props={{ mode, type: orderType, asset }} />
    </div>
  );
}

export default BuySellWrapper;
