import React, { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import L from 'i18n-react';

import { Link } from 'react-router-dom';
import types from '../../../../../redux/types';
import {
  numberValidation,
  cropNumber,
  toCrop,
  numberWithCommas,
} from '../../../../../services/helpers';
import routes from '../../../../../routes';

import PercentButtons from './PercentButtons';
import { currentPairSelector } from '../../../../../redux/currentPair/selectors';
import { tokenSelector } from '../../../../../redux/auth/selectors';
import { calcSelector } from '../../../../../redux/trade/calculate/selectors';

function MarketOrder({ balance, mode, assetToTrade, assetBalance }) {
  const auth = useSelector(state => !!state.user.token);
  const currentPair = useSelector(currentPairSelector);
  const calculate = useSelector(calcSelector);

  const token = useSelector(tokenSelector);
  const isLogin = token && axios.defaults.headers.common.Authorization;
  const dispatch = useDispatch();
  const calData = calculate?.marketOrder[mode.toLowerCase()];

  const initState = {
    pair_code: currentPair,
    quantity: '',
    type: `market_${mode.toLowerCase()}`, // buy or sell
  };
  const [marketOrderState, setMarketOrderState] = useState({ ...initState });
  // const assetPairs = useSelector(state => state.assetPairs.assetPairs);
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
    const { value, name } = e.target;
    if (numberValidation(value)) {
      setMarketOrderState({
        ...marketOrderState,
        [name]: value,
      });
    }
  };

  const createTrade = () => {
    if (mode === 'Buy') {
      dispatch({
        type: types.CREATE_ORDER_START,
        payload: {
          ...marketOrderState,
          quantity: +calData?.total,
        },
      });
    } else {
      dispatch({
        type: types.CREATE_ORDER_START,
        payload: {
          ...marketOrderState,
          quantity: +marketOrderState.quantity,
        },
      });
    }
  };

  const handleTrade = e => {
    e.preventDefault();
    if (marketOrderState.quantity) {
      createTrade();
    }

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
    }
    return () => {
      dispatch({
        type: types.CALCULATE_MARKET_ORDER_CLEAR,
        // payload: `market_${mode.toLowerCase()}`,
        payload: `market_${mode.toLowerCase()}`,
      });
    };
  }, [currentPair, marketOrderState, mode]);

  const percentButtonCountValue = percent => {
    // if (mode === 'Buy') {
    //   // return cropNumber((+balance / lastPrice) * +percent);
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
            {/* <span>{assetToTrade && assetToTrade?.toUpperCase()}</span> */}

            {mode === 'Buy' ? (
              <span>{assetBalance && assetBalance?.toUpperCase()}</span>
            ) : (
              <span>{assetToTrade && assetToTrade?.toUpperCase()}</span>
            )}
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
          {L.translate('Trading.orderCreation.total')}:{' '}
          <span>~{numberWithCommas(toCrop(8)(calData?.total) || 0)}</span>{' '}
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
        {L.translate('Trading.orderCreation.fee')}:{' '}
        <span>~ {numberWithCommas(cropNumber(calData?.commission) || 0)}</span>{' '}
        {mode === 'Buy' ? (
          <span>{assetToTrade && assetToTrade?.toUpperCase()}</span>
        ) : (
          <span>{assetBalance && assetBalance?.toUpperCase()}</span>
        )}{' '}
      </span>
      <span className="trade-val">
        {L.translate('Trading.orderCreation.filled')}:{' '}
        <span>~ {cropNumber(calData?.total_percent, 2) || 0} %</span>{' '}
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

export default MarketOrder;
