import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import L from 'i18n-react';

import { Link } from 'react-router-dom';
import types from '../../../../../redux/types';
import routes from '../../../../../routes';
import { numberValidation, cropNumber } from '../../../../../services/helpers';

import PercentButtons from './PercentButtons';
import { selectedTradePriceSelector } from '../../../../../redux/temporary/selectors';

function StopLimit(props) {
  const {
    auth,
    balance,
    mode,
    assetToTrade,
    assetBalance,
    currentPair,
  } = props;

  const dispatch = useDispatch();
  const initState = {
    stop: '',
    limit: '',
    quantity: '',
    pair_code: currentPair,
    is_margin: 1,
    type: mode.toLowerCase(), // buy or sell
  };
  const [stopLimitOrderState, setStopLimitOrderState] = useState({
    ...initState,
  });
  const [total, setTotal] = useState(
    stopLimitOrderState.limit * stopLimitOrderState.quantity,
  );

  const countOrder = e => {
    if (stopLimitOrderState.limit) {
      setStopLimitOrderState({
        ...stopLimitOrderState,
        quantity: e.target.value,
      });
      setTotal(e.target.value * stopLimitOrderState.limit);
    }
  };

  const handleChangeInput = e => {
    if (numberValidation(e.target.value)) {
      setStopLimitOrderState({
        ...stopLimitOrderState,
        [e.target.name]: e.target.value,
      });
      if (stopLimitOrderState.limit && e.target.name === 'quantity') {
        setTotal(cropNumber(e.target.value * stopLimitOrderState.limit));
      }
      if (stopLimitOrderState.quantity && e.target.name === 'limit') {
        setTotal(cropNumber(e.target.value * stopLimitOrderState.quantity));
      }
    }
  };

  const handleChangeTotal = e => {
    if (stopLimitOrderState.limit) {
      if (numberValidation(e.target.value)) {
        setTotal(e.target.value);
        setStopLimitOrderState({
          ...stopLimitOrderState,
          quantity: cropNumber(e.target.value / stopLimitOrderState.limit),
        });
      }
    }
  };

  const createTrade = () => {
    dispatch({
      type: types.CREATE_STOP_LIMIT_ORDER_START,
      payload: {
        ...stopLimitOrderState,
        stop: +stopLimitOrderState.stop,
        limit: +stopLimitOrderState.limit,
        quantity: +stopLimitOrderState.quantity,
      },
    });
  };

  const handleTrade = e => {
    e.preventDefault();
    if (
      stopLimitOrderState.quantity &&
      stopLimitOrderState.stop &&
      stopLimitOrderState.limit
    ) {
      createTrade();
      setStopLimitOrderState({
        ...initState,
      });
      setTotal('');
    }
  };

  const percentButtonCountValue = perсent => {
    if (+stopLimitOrderState.limit && +stopLimitOrderState.stop) {
      if (mode === 'Buy') {
        return cropNumber((+balance / +stopLimitOrderState.limit) * +perсent);
      }
      return cropNumber(+balance * +perсent);
    }
  };

  const priceFromOrderBook = useSelector(selectedTradePriceSelector);

  useEffect(() => {
    if (priceFromOrderBook) {
      setStopLimitOrderState({
        ...stopLimitOrderState,
        limit: cropNumber(priceFromOrderBook),
      });
      setTotal(cropNumber(stopLimitOrderState.quantity * priceFromOrderBook));
    }
  }, [priceFromOrderBook]);

  useEffect(() => {
    setStopLimitOrderState({
      ...stopLimitOrderState,
      pair_code: currentPair,
    });
  }, [currentPair]);

  return (
    <>
      <div className="input-wrap ">
        <div className="field-wrap trade-input ">
          <input
            autoComplete="off"
            type="text"
            className="trade-input__item "
            placeholder={`${L.translate('Trading.orderCreation.stop')}`}
            name="stop"
            onChange={handleChangeInput}
            value={stopLimitOrderState.stop}
          />
          <p className="input-info">
            <span>{assetBalance.toUpperCase()}</span>
          </p>
        </div>
      </div>
      <div className="input-wrap ">
        <div className="field-wrap trade-input ">
          <input
            autoComplete="off"
            type="text"
            className="trade-input__item "
            placeholder={`${L.translate('Trading.orderCreation.limit')}`}
            name="limit"
            onChange={handleChangeInput}
            value={stopLimitOrderState.limit}
          />
          <p className="input-info">
            <span>{assetBalance.toUpperCase()}</span>
          </p>
        </div>
      </div>
      <div className="input-wrap ">
        <div className="field-wrap trade-input ">
          <input
            autoComplete="off"
            type="text"
            className="trade-input__item "
            placeholder={`${L.translate('Trading.orderCreation.amount')}`}
            name="quantity"
            onChange={handleChangeInput}
            value={stopLimitOrderState.quantity}
          />
          <p className="input-info">
            <span>{assetToTrade.toUpperCase()}</span>
          </p>
        </div>
      </div>
      {auth && (
        <PercentButtons
          countOrder={countOrder}
          percentButtonCountValue={percentButtonCountValue}
        />
      )}

      <div className="input-wrap ">
        <div className="field-wrap trade-input ">
          <input
            autoComplete="off"
            type="text"
            className="trade-input__item "
            placeholder="Total"
            name="total"
            onChange={handleChangeTotal}
            value={total}
          />
          <p className="input-info">
            <span>{assetBalance.toUpperCase()}</span>
          </p>
        </div>
      </div>

      <div className="trade-order">
        {auth ? (
          <button
            type="submit"
            onClick={handleTrade}
            className={
              mode === 'Buy' ? 'order-btn' : 'order-btn order-btn--sell'
            }
          >
            {mode === 'Buy'
              ? L.translate('Trading.orderCreation.buy')
              : L.translate('Trading.orderCreation.sell')}{' '}
            {assetToTrade.toUpperCase()}
          </button>
        ) : (
          <div className="trade-login">
            <Link to={routes.Auth.Login.path}>
              {L.translate('Global.login')}
            </Link>{' '}
            {L.translate('Global.or')}{' '}
            <Link to={routes.Auth.Signup.path}>
              {' '}
              {L.translate('Global.sign_up')}
            </Link>{' '}
            {L.translate('Global.to_trade')}
          </div>
        )}
      </div>
    </>
  );
}

export default StopLimit;
