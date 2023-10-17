import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import L from 'i18n-react';

import { Link } from 'react-router-dom';
import routes from '../../../../../routes';
import types from '../../../../../redux/types';
import { numberValidation, cropNumber } from '../../../../../services/helpers';

import PercentButtons from './PercentButtons';
import { selectedTradeSelector } from '../../../../../redux/temporary/selectors';

const LimitOrder = ({
  auth,
  balance,
  assetToTrade,
  assetBalance,
  mode,
  currentPair,
  calculate,
}) => {
  const dispatch = useDispatch();
  const initState = {
    pair_code: currentPair,
    quantity: '', // amount
    price: '',
    type: mode.toLowerCase(), // buy or sell
    is_margin: 1,
  };
  const [limitOrderState, setLimitOrderState] = useState({
    ...initState,
  });

  const calData = calculate?.limitOrder[mode.toLowerCase()];
  const [total, setTotal] = useState('');

  const handleChangeTotal = e => {
    if (numberValidation(e.target.value)) {
      if (limitOrderState.price) {
        if (numberValidation(e.target.value)) {
          setTotal(e.target.value);
          setLimitOrderState({
            ...limitOrderState,
            quantity: cropNumber(e.target.value / limitOrderState.price),
          });
        }
      }
    }
  };

  const countOrder = e => {
    if (limitOrderState.price) {
      if (+e.target.value >= 0) {
        setLimitOrderState({
          ...limitOrderState,
          quantity: e.target.value,
        });
        // setTotal(cropNumber(calData?.total));
        setTotal(cropNumber(limitOrderState.price * e.target.value));
      }
    }
  };

  const handleChangeInput = e => {
    if (numberValidation(e.target.value)) {
      setLimitOrderState({
        ...limitOrderState,
        [e.target.name]: e.target.value,
      });
      // setTotal(cropNumber(calData?.total));  // HERE NOT USED DATA FROM API BECAUSE OF INCORRECT COUNTING
      if (e.target.name === 'price') {
        if (limitOrderState.quantity) {
          setTotal(cropNumber(limitOrderState.quantity * e.target.value));
        }
      }
      if (e.target.name === 'quantity') {
        if (limitOrderState.price) {
          setTotal(cropNumber(e.target.value * limitOrderState.price));
        }
      }
    }
  };

  const createTrade = () => {
    dispatch({
      type: types.CREATE_ORDER_START,
      payload: {
        ...limitOrderState,
        quantity: +limitOrderState.quantity,
        price: +limitOrderState.price,
      },
    });
    setLimitOrderState({
      pair_code: currentPair,
      quantity: '', // amount
      price: '',
      type: mode.toLowerCase(), // buy or sell
      is_margin: 1,
    });
  };

  const handleTrade = e => {
    e.preventDefault();
    if (limitOrderState.quantity && limitOrderState.price) {
      createTrade();
      setLimitOrderState({ ...initState });
      setTotal('');
    }
  };

  useEffect(() => {
    if (
      currentPair &&
      +limitOrderState.quantity &&
      +limitOrderState.price &&
      mode
    ) {
      dispatch({
        type: types.POST_CALCULATE_LIMIT_ORDER_START,
        isLogin: auth,
        payload: {
          pair: currentPair,
          quantity: +limitOrderState.quantity,
          price: +limitOrderState.price,
          type: mode.toLowerCase(),
        },
      });
    }
    return () => {
      dispatch({
        type: types.CALCULATE_LIMIT_ORDER_CLEAR,
        payload: mode.toLowerCase(),
      });
    };
  }, [currentPair, limitOrderState, mode]);

  const percentButtonCountValue = percent => {
    if (mode === 'Buy') {
      return cropNumber((+balance / +limitOrderState.price) * +percent);
    }
    return cropNumber(+balance * +percent);
  };

  const priceFromOrderBook = useSelector(selectedTradeSelector);

  useEffect(() => {
    if (priceFromOrderBook) {
      setLimitOrderState({
        ...limitOrderState,
        price: cropNumber(priceFromOrderBook),
      });
      setTotal(limitOrderState.quantity * priceFromOrderBook);
    }
  }, [priceFromOrderBook]);

  useEffect(() => {
    setLimitOrderState({
      ...limitOrderState,
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
            placeholder={`${L.translate('Trading.orderCreation.amount')}`}
            value={limitOrderState.quantity}
            name="quantity"
            onChange={handleChangeInput}
            required
          />
          <p className="input-info">
            <span>{assetToTrade.toUpperCase()}</span>
          </p>
        </div>
      </div>
      <div className="input-wrap ">
        <div className="field-wrap trade-input ">
          <input
            autoComplete="off"
            type="text"
            className="trade-input__item "
            placeholder={`${L.translate('Trading.orderCreation.price')}`}
            value={limitOrderState.price}
            name="price"
            onChange={handleChangeInput}
            required
          />
          <p className="input-info">
            <span>{assetBalance.toUpperCase()}</span>
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
            placeholder={`${L.translate('Trading.orderCreation.total')}`}
            name="total"
            onChange={handleChangeTotal}
            value={total}
          />
          <p className="input-info">
            <span>{assetBalance.toUpperCase()}</span>
          </p>
        </div>
      </div>
      {/* <span style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span className="trade-val">
          Total: <span>{cropNumber(calData?.total) || 0}</span>{' '}
          {assetBalance.toUpperCase()}
        </span>
        <span className="trade-val">
          $ {cropNumber(calData?.total_in_usd) || 0}
        </span>
      </span> */}
      <span className="trade-val">
        {L.translate('Trading.orderCreation.fee')}:{' '}
        <span>~ {cropNumber(calData?.commission) || 0}</span>{' '}
        {mode === 'Buy' ? (
          <span>{assetToTrade && assetToTrade?.toUpperCase()}</span>
        ) : (
          <span>{assetBalance && assetBalance?.toUpperCase()}</span>
        )}{' '}
      </span>
      <div className="trade-order">
        {auth ? (
          <button
            type="submit"
            className={
              mode === 'Buy' ? 'order-btn' : 'order-btn order-btn--sell'
            }
            onClick={handleTrade}
          >
            {mode === 'Buy'
              ? L.translate('Trading.orderCreation.buy')
              : L.translate('Trading.orderCreation.sell')}{' '}
            {assetToTrade.toUpperCase()}
          </button>
        ) : (
          <div className="trade-login">
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
          </div>
        )}
      </div>
    </>
  );
};

export default LimitOrder;
