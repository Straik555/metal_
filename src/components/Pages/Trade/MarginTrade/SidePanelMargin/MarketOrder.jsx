import React, { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import L from 'i18n-react';

import axios from 'axios';
import { Link } from 'react-router-dom';
import routes from '../../../../../routes';
import types from '../../../../../redux/types';
import { numberValidation, cropNumber } from '../../../../../services/helpers';

import PercentButtons from './PercentButtons';
import { tokenSelector } from '../../../../../redux/auth/selectors';

function MarketOrder({
  balance,
  mode,
  assetToTrade,
  assetBalance,
  auth,
  currentPair,
  calculate,
}) {
  const token = useSelector(tokenSelector);
  const isLogin = token && axios.defaults.headers.common.Authorization;
  const dispatch = useDispatch();
  const calData = calculate?.marketOrder[`${mode.toLowerCase()}`];

  const initState = {
    pair_code: currentPair,
    quantity: '',
    type: `market_${mode.toLowerCase()}`, // buy or sell
    is_margin: 1,
  };
  const [marketOrderState, setMarketOrderState] = useState({
    ...initState,
  });

  const [total, setTotal] = useState();
  const [fee, setFee] = useState();

  // const [lastPrice, setLastPrice] = useState();

  // useEffect(() => {
  //   assetPairs.find(pair => {
  //     if (pair.code === currentPair) {
  //       setLastPrice(pair.last_price);
  //     }
  //   });
  // }, [currentPair]);

  const countOrder = e => {
    setMarketOrderState({
      ...marketOrderState,
      quantity: e.target.value,
    });
  };

  const handleChangeInput = e => {
    if (numberValidation(e.target.value)) {
      setMarketOrderState({
        ...marketOrderState,
        [e.target.name]: e.target.value,
      });
    }
  };

  const createTrade = () => {
    dispatch({
      type: types.CREATE_ORDER_START,
      payload: {
        ...marketOrderState,
        quantity: +marketOrderState.quantity,
      },
    });
  };

  const handleTrade = e => {
    e.preventDefault();
    // if (marketOrderState.quantity) {
    //   if (mode === 'Buy') {
    //     createTrade();
    //   } else {
    //     createTrade();
    //   }
    // }
    createTrade();
    setMarketOrderState({
      ...initState,
    });
  };

  useEffect(() => {
    if (currentPair && +marketOrderState.quantity && mode) {
      dispatch({
        type: types.POST_CALCULATE_MARKET_ORDER_START,
        isLogin,
        payload: {
          pair: currentPair,
          quantity: marketOrderState.quantity,
          price: 0,
          type: `market_${mode.toLowerCase()}`,
        },
      });
      setTotal(calData?.total);
      setFee(calData?.commission);
    }
    return () => {
      dispatch({
        type: types.CALCULATE_MARKET_ORDER_CLEAR,
        payload: `market_${mode.toLowerCase()}`,
      });
    };
  }, [currentPair, marketOrderState, mode]);

  const percentButtonCountValue = percent => {
    // if (mode === 'Buy') {
    //   return cropNumber(+balance * +percent);
    // } else {
    //   return cropNumber(+balance * +percent);
    // }
    return cropNumber(+balance * +percent);
  };

  useEffect(() => {
    setMarketOrderState({
      ...marketOrderState,
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
            name="quantity"
            onChange={handleChangeInput}
            value={marketOrderState.quantity}
            required
          />
          <p className="input-info">
            {mode === 'Buy' ? (
              <span>{assetBalance && assetBalance?.toUpperCase()}</span>
            ) : (
              <span>{assetToTrade && assetToTrade?.toUpperCase()}</span>
            )}{' '}
          </p>
        </div>
      </div>

      {auth && (
        <PercentButtons
          countOrder={countOrder}
          percentButtonCountValue={percentButtonCountValue}
        />
      )}

      <span style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span className="trade-val">
          {/* Total: <span>{cropNumber(calData?.total) || 0}</span>{' '} */}
          {L.translate('Trading.orderCreation.total')}:{' '}
          <span>{cropNumber(total) || 0}</span>{' '}
          {mode === 'Buy' ? (
            <span>{assetToTrade && assetToTrade?.toUpperCase()}</span>
          ) : (
            <span>{assetBalance && assetBalance?.toUpperCase()}</span>
          )}{' '}
        </span>
        {/* <span className="trade-val">
          $ {cropNumber(calData?.total_in_usd) || 0}
        </span> */}
      </span>
      <span className="trade-val">
        {/* Fee: <span>~ {cropNumber(calData?.commission) || 0}</span>{' '} */}
        {L.translate('Trading.orderCreation.fee')}:{' '}
        <span>~ {cropNumber(fee) || 0}</span>{' '}
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
            onClick={e => handleTrade(e)}
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
}

export default MarketOrder;
