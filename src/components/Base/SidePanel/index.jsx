import React, { useState } from 'react';
import BuySellWrapper from './BuySellWrapper';

const SidePanel = () => {
  const [orderType, setOrderType] = useState('limit_order');

  const handleChangeOrderType = e => {
    setOrderType(e.target.name);
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
            Limit order
          </button>
          <button
            type="button"
            name="market_order"
            className={orderType === 'market_order' ? 'btn active' : 'btn'}
            onClick={e => handleChangeOrderType(e)}
          >
            Market order
          </button>
          <button
            type="button"
            name="stop_limit"
            className={orderType === 'stop_limit' ? 'btn active' : 'btn'}
            onClick={e => handleChangeOrderType(e)}
          >
            Stop-limit
            <span className="limit-info">
              <i className="far fa-question-circle" />
              <span className="hint">
                <span className="hint-block">
                  To buy or sell a coin once the price reaches a specified price
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
