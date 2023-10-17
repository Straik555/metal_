import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import L from 'i18n-react';

import { openModal } from '../../../../Base/Modal';
import ModalMargin from '../../../../Base/Modals/ModalMargin';
import BuySellWrapper from './BuySellWrapper';
import { currentPairSelector } from '../../../../../redux/currentPair/selectors';
import { calcSelector } from '../../../../../redux/trade/calculate/selectors';

const SidePanel = props => {
  const [orderType, setOrderType] = useState('limit_order');

  const pair = useSelector(currentPairSelector);
  const calculate = useSelector(calcSelector);

  const handleChangeOrderType = e => {
    setOrderType(e.currentTarget.name);
  };

  const handleOpen = ({ target }) => {
    if (target?.value) {
      openModal(() => (
        <ModalMargin active={target.value} assetCode={pair.split('_')[0]} />
      ));
    }
  };
  return (
    <div className="side-panel">
      {/* <div className="market-type"></div> */}
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
        <div className="margin-trade-action">
          <div className="margin-trade-action__btn">
            <button
              className="btn"
              type="button"
              value="transfer"
              onClick={handleOpen}
            >
              {L.translate('Trading.orderCreation.transfer')}{' '}
            </button>
            <button
              className="btn"
              type="button"
              value="borrow"
              onClick={handleOpen}
            >
              {L.translate('Trading.orderCreation.borrow')}{' '}
            </button>
            <button
              className="btn"
              type="button"
              value="repay"
              onClick={handleOpen}
            >
              {L.translate('Trading.orderCreation.repay')}
            </button>
          </div>
        </div>
      </div>

      <div className="side-panel__row">
        <BuySellWrapper
          orderType={orderType}
          mode="Buy"
          calculate={calculate}
        />
        <BuySellWrapper
          orderType={orderType}
          mode="Sell"
          calculate={calculate}
        />
      </div>
    </div>
  );
};

export default SidePanel;
