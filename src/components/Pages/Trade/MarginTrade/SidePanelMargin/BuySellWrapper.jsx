import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import L from 'i18n-react';

import StopLimit from './StopLimit';
import LimitOrder from './LimitOrder';
import MarketOrder from './MarketOrder';
import { toCrop, cropNumber } from '../../../../../services/helpers';
import { currentPairSelector } from '../../../../../redux/currentPair/selectors';
import { marginWalletSelector } from '../../../../../redux/wallets/selectors';
import { userAuthBool } from '../../../../../redux/auth/selectors';

function BuySellWrapper(props) {
  const { mode, orderType, calculate } = props;
  const auth = useSelector(userAuthBool);
  const currentPair = useSelector(currentPairSelector);
  const [asset, setAsset] = useState({
    toTrade: '',
    balance: '',
  });

  // const balance = 10;
  useEffect(() => {
    setAsset({
      ...asset,
      toTrade: currentPair.split('_')[0],
      balance: currentPair.split('_')[1],
    });
  }, [currentPair]);

  const margin = useSelector(marginWalletSelector);
  const balance = margin && margin[asset?.balance]?.balance;
  const balanceForSell = margin && margin[asset?.toTrade]?.balance;

  const handleSwitchOrderType = type => {
    switch (type) {
      case 'limit_order':
        return (
          <LimitOrder
            assetToTrade={asset.toTrade}
            assetBalance={asset.balance}
            balance={mode === 'Buy' ? balance : balanceForSell}
            auth={auth}
            mode={mode}
            currentPair={currentPair}
            calculate={calculate}
          />
        );
      case 'market_order':
        return (
          <MarketOrder
            assetToTrade={asset.toTrade}
            assetBalance={asset.balance}
            balance={mode === 'Buy' ? balance : balanceForSell}
            auth={auth}
            mode={mode}
            currentPair={currentPair}
            calculate={calculate}
          />
        );
      case 'stop_limit':
        return (
          <StopLimit
            assetToTrade={asset.toTrade}
            assetBalance={asset.balance}
            balance={mode === 'Buy' ? balance : balanceForSell}
            auth={auth}
            mode={mode}
            currentPair={currentPair}
          />
        );
      default:
        return (
          <LimitOrder
            assetToTrade={asset.toTrade}
            assetBalance={asset.balance}
            balance={mode === 'Buy' ? balance : balanceForSell}
            auth={auth}
            mode={mode}
            currentPair={currentPair}
          />
        );
    }
  };

  return (
    <div className="side-panel__col">
      <p className="block-title">
        {mode === 'Buy'
          ? L.translate('Trading.orderCreation.buy')
          : L.translate('Trading.orderCreation.sell')}{' '}
        {asset.toTrade.toUpperCase()}
        {auth && (
          <>
            {mode === 'Buy' ? (
              <span>
                {asset.balance.toUpperCase()}{' '}
                {L.translate('Trading.orderCreation.balance')}:{' '}
                {cropNumber(balance)}
              </span>
            ) : (
              <span>
                {asset.toTrade.toUpperCase()}{' '}
                {L.translate('Trading.orderCreation.balance')}:{' '}
                {cropNumber(balanceForSell)}
              </span>
            )}
          </>
        )}
      </p>
      {handleSwitchOrderType(orderType)}
    </div>
  );
}

export default BuySellWrapper;

/* <div className="trade-slide">
    <div className="trade-slide__line">
      <div className="slide-val"></div>
    </div>
    
    <button className="trade-slide__btn"></button>
  </div>
*/
