import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import L from 'i18n-react';

import { currentPairSelector } from '../../../../../redux/currentPair/selectors';
import LimitOrder from './LimitOrder';
import MarketOrder from './MarketOrder';
import StopLimit from './StopLimit';
import { spotWalletSelector } from '../../../../../redux/wallets/selectors';
import { languageSelector } from '../../../../../redux/lng/selectors';
import { numberWithCommas } from '../../../../../services/helpers';

const Balance = ({ mode, assetToTrade, assetBalance, balance }) => {
  const language = useSelector(languageSelector); // need to update language

  return (
    <>
      {mode === 'Buy' ? (
        <p className="block-title">
          {L.translate('Trading.orderCreation.buy')} {assetToTrade}
          <span>
            {assetBalance} {L.translate('Trading.orderCreation.balance')}:{' '}
            {numberWithCommas(balance)}
          </span>
        </p>
      ) : (
        <p className="block-title">
          {L.translate('Trading.orderCreation.sell')} {assetToTrade}
          <span>
            {assetToTrade} {L.translate('Trading.orderCreation.balance')}:{' '}
            {numberWithCommas(balance)}
          </span>
        </p>
      )}
    </>
  );
};

const SwitchOrderType = props => {
  const { mode, type, assetToTrade, assetBalance, balance } = props;

  switch (type) {
    case 'limit_order':
      return (
        <LimitOrder
          assetToTrade={assetToTrade}
          assetBalance={assetBalance}
          balance={balance}
          mode={mode}
        />
      );
    case 'market_order':
      return (
        <MarketOrder
          assetToTrade={assetToTrade}
          assetBalance={assetBalance}
          balance={balance}
          mode={mode}
        />
      );
    case 'stop_limit':
      return (
        <StopLimit
          assetToTrade={assetToTrade}
          assetBalance={assetBalance}
          balance={balance}
          mode={mode}
        />
      );
    default:
      return (
        <LimitOrder
          assetToTrade={assetToTrade}
          assetBalance={assetBalance}
          balance={balance}
          mode={mode}
        />
      );
  }
};

const SidePanel = () => {
  const currentPair = useSelector(currentPairSelector);

  const language = useSelector(languageSelector); // need to update language

  const buyCode = currentPair.split('_')[1];
  const sellCode = currentPair.split('_')[0];
  const buyBalance = useSelector(
    state => state.wallets.spot?.[buyCode]?.balance,
  );
  const sellBalance = useSelector(
    state => state.wallets.spot?.[sellCode]?.balance,
  );

  const [orderType, setOrderType] = useState('limit_order');

  const handleChangeOrderType = e => {
    setOrderType(e.currentTarget.name);
  };

  return (
    <div className="side-panel">
      <div className="market-panel market-panel--type2">
        <div className="panel-tab">
          <button
            type="button"
            name="limit_order"
            className={orderType === 'limit_order' ? 'btn active' : 'btn'}
            onClick={e => handleChangeOrderType(e)}
          >
            {L.translate('Trading.orderCreation.limit_order')}{' '}
          </button>
          <button
            type="button"
            name="market_order"
            className={orderType === 'market_order' ? 'btn active' : 'btn'}
            onClick={e => handleChangeOrderType(e)}
          >
            {L.translate('Trading.orderCreation.market_order')}{' '}
          </button>
          <button
            type="button"
            name="stop_limit"
            className={orderType === 'stop_limit' ? 'btn active' : 'btn'}
            onClick={e => handleChangeOrderType(e)}
          >
            {L.translate('Trading.orderCreation.stop_limit')}{' '}
            <span className="limit-info">
              <i
                className="far fa-question-circle"
                style={{ pointerEvents: 'none' }}
              />
              <span className="hint">
                <span className="hint-block">
                  {L.translate('Trading.orderCreation.stop_limit_info')}{' '}
                </span>
              </span>
            </span>
          </button>
        </div>
      </div>
      <div className="side-panel__row">
        <div className="side-panel__col">
          <Balance
            mode="Buy"
            assetToTrade={sellCode.toUpperCase()}
            assetBalance={buyCode.toUpperCase()}
            balance={buyBalance || 0}
          />

          <SwitchOrderType
            type={orderType}
            mode="Buy"
            assetToTrade={sellCode.toUpperCase()}
            assetBalance={buyCode.toUpperCase()}
            balance={buyBalance || 0}
          />
        </div>
        <div className="side-panel__col">
          <Balance
            mode="Sell"
            assetToTrade={sellCode.toUpperCase()}
            assetBalance={buyCode.toUpperCase()}
            balance={sellBalance || 0}
          />
          <SwitchOrderType
            type={orderType}
            mode="Sell"
            assetToTrade={sellCode.toUpperCase()}
            assetBalance={buyCode.toUpperCase()}
            balance={sellBalance || 0}
          />
        </div>
      </div>
    </div>
  );
};

// export default SidePanel;
export default React.memo(SidePanel);
