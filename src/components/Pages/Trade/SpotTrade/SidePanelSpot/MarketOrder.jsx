import React, { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import L from 'i18n-react';
import types from '../../../../../redux/types';
import {
  numberValidation,
  cropNumber,
  toCrop,
  numberWithCommas,
} from '../../../../../services/helpers';

import PercentButtons from './PercentButtons';
import { currentPairSelector } from '../../../../../redux/currentPair/selectors';
import { tokenSelector } from '../../../../../redux/auth/selectors';
import { calcSelector } from '../../../../../redux/trade/calculate/selectors';
import AuthSection from './AuthSection';
import notification from '../../../../../services/notification';
import { spotWalletSelector } from '../../../../../redux/wallets/selectors';

let trotleMarketCalcRequest = null;
const translatePath = 'Notifications.MarkretOrder';

function MarketOrder({ balance, mode, assetToTrade, assetBalance }) {
  const dispatch = useDispatch();
  const auth = useSelector(state => !!state.user.token);
  const token = useSelector(tokenSelector);
  const isLogin = token && axios.defaults.headers.common.Authorization;

  const allAssets = useSelector(state => state.assets.assets); // spotWalletSelector
  const [orderMax, setOrderMax] = useState(0);
  const [orderMin, setOrderMin] = useState(0);

  const currentPair = useSelector(currentPairSelector);
  const calculate = useSelector(calcSelector);
  const calData = calculate?.marketOrder[mode.toLowerCase()];

  const initState = {
    pair_code: currentPair,
    quantity: '',
    type: `market_${mode.toLowerCase()}`, // buy or sell
  };
  const [marketOrderState, setMarketOrderState] = useState({ ...initState });
  const [marketOrderStateFull, setMarketOrderStateFull] = useState({
    ...initState,
  });

  const handleChangeInput = e => {
    let { value, name } = e.target;

    // For deleting commas
    value = value.replace(/\,/g, '');
    const valueNoComma = value.replace(/\,/g, '');
    if (value?.includes('.')) {
      value = numberWithCommas(value);
    }

    if (numberValidation(value)) {
      setMarketOrderState({
        ...marketOrderState,
        [name]: value,
      });
      setMarketOrderStateFull({
        ...marketOrderStateFull,
        [name]: valueNoComma,
      });
    }
  };

  const countOrder = e => {
    let { value } = e.target;

    // For deleting commas
    value = value.replace(/\,/g, '');
    const valueNoComma = value.replace(/\,/g, '');
    if (value?.includes('.')) {
      value = numberWithCommas(value);
    }

    if (+valueNoComma >= 0) {
      if (+valueNoComma > orderMax || +valueNoComma < orderMin) {
        setMarketOrderState({
          ...marketOrderState,
          quantity: '',
        });
        setMarketOrderStateFull({
          ...marketOrderStateFull,
          quantity: '',
        });
      } else {
        setMarketOrderState({
          ...marketOrderState,
          quantity: numberWithCommas(cropNumber(valueNoComma)),
        });
        setMarketOrderStateFull({
          ...marketOrderStateFull,
          quantity: valueNoComma,
        });
      }
    }
  };

  const createTrade = () => {
    if (mode === 'Buy') {
      if (+marketOrderStateFull.quantity <= +balance) {
        if (+calData?.total) {
          dispatch({
            type: types.CREATE_ORDER_START,
            payload: {
              ...marketOrderStateFull,
              quantity: +calData?.total,
            },
          });
        }
      } else {
        notification({
          type: 'error',
          title: L.translate(`${translatePath}.title`),
          message: L.translate(`${translatePath}.funds_error`),
        });
      }
    } else {
      dispatch({
        type: types.CREATE_ORDER_START,
        payload: {
          ...marketOrderStateFull,
          quantity: +marketOrderStateFull.quantity,
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
    setMarketOrderStateFull({
      ...initState,
    });
    dispatch({ type: types.CLEAR_SELECTED_TRADE });
  };

  // for % buttons
  const percentButtonCountValue = percent => {
    return cropNumber(+balance * +percent);
  };

  // if pair changes
  useEffect(() => {
    setMarketOrderState({
      ...initState,
      pair_code: currentPair,
    });
    setMarketOrderStateFull({
      ...initState,
      pair_code: currentPair,
    });
  }, [currentPair]);

  // Taking order min and order max
  useEffect(() => {
    if (allAssets) {
      const { order_max, order_min } = allAssets.find(
        item => item.code === assetToTrade.toLowerCase(),
      );
      setOrderMax(order_max);
      setOrderMin(order_min);
    }
  }, [allAssets, assetToTrade]);

  useEffect(() => {
    if (currentPair && +marketOrderStateFull.quantity && mode) {
      if (trotleMarketCalcRequest) {
        clearTimeout(trotleMarketCalcRequest);
      }

      trotleMarketCalcRequest = setTimeout(() => {
        dispatch({
          type: types.POST_CALCULATE_MARKET_ORDER_START,
          isLogin,
          payload: {
            pair: currentPair,
            quantity: marketOrderStateFull.quantity,
            price: 0,
            type: `market_${mode.toLowerCase()}`,
          },
        });
      }, 500);
    }
    return () => {
      dispatch({
        type: types.CALCULATE_MARKET_ORDER_CLEAR,
        payload: mode.toLowerCase(),
      });
    };
  }, [marketOrderStateFull, mode]);

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
          mode={mode}
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
          <AuthSection />
        )}
      </div>
    </>
  );
}

export default MarketOrder;
