import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import L from 'i18n-react';

import BuySellWrapper from './BuySellWrapper';
import { calcSelector } from '../../../../../redux/trade/calculate/selectors';
import { languageSelector } from '../../../../../redux/lng/selectors';
import { spotWalletSelector } from '../../../../../redux/wallets/selectors';

const SidePanel = () => {
  const [orderType, setOrderType] = useState('limit_order');
  const language = useSelector(languageSelector); // need to update language
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
        <BuySellWrapper orderType={orderType} mode="Buy" />
        <BuySellWrapper orderType={orderType} mode="Sell" />
      </div>
    </div>
  );
};

export default SidePanel;
