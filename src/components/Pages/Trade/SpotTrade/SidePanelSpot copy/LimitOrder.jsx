import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import L from 'i18n-react';
import types from '../../../../../redux/types';
import {
  numberValidation,
  cropNumber,
  toCrop,
  numberWithCommas,
} from '../../../../../services/helpers';
import routes from '../../../../../routes';

import PercentButtons from './PercentButtons';
import CoinSection from '../../../Statics/HomePage/CoinsSection';
import { currentPairSelector } from '../../../../../redux/currentPair/selectors';
import { spotWalletSelector } from '../../../../../redux/wallets/selectors';
import { selectedTradePriceSelector } from '../../../../../redux/temporary/selectors';
import AuthSection from './AuthSection';
import { calcSelector } from '../../../../../redux/trade/calculate/selectors';

const LimitOrder = ({ balance, assetToTrade, assetBalance, mode }) => {
  const dispatch = useDispatch();
  const auth = useSelector(state => !!state.user.token);
  const currentPair = useSelector(currentPairSelector);
  const priceFromOrderBook = useSelector(selectedTradePriceSelector);
  const calculate = useSelector(calcSelector);

  const allAssets = useSelector(spotWalletSelector);
  const [orderMax, setOrderMax] = useState(0);
  const [orderMin, setOrderMin] = useState(0);

  useEffect(() => {
    if (allAssets) {
      setOrderMax(allAssets[assetToTrade]?.asset?.order_max);
      setOrderMin(allAssets[assetToTrade]?.asset?.order_min);
    }
  }, [allAssets, assetToTrade]);

  const initState = {
    pair_code: currentPair,
    quantity: '', // amount
    price: '',
    type: mode.toLowerCase(), // buy or sell
  };
  const [limitOrderState, setLimitOrderState] = useState({ ...initState });

  const [limitOrderStateFull, setLimitOrderStateFull] = useState({
    ...initState,
  });

  const calData = calculate?.limitOrder[mode.toLowerCase()];
  const [total, setTotal] = useState('');

  const handleChangeTotal = e => {
    const { value } = e.target;
    if (numberValidation(value) && limitOrderState.price) {
      setTotal(value);

      if (
        value / limitOrderState.price > orderMax ||
        value / limitOrderState.price < orderMin
      ) {
        setLimitOrderState({
          ...limitOrderState,
          quantity: '',
        });
        setLimitOrderStateFull({
          ...limitOrderState,
          quantity: '',
        });
      } else {
        setLimitOrderState({
          ...limitOrderState,
          quantity: cropNumber(value / limitOrderStateFull.price),
        });
        setLimitOrderStateFull({
          ...limitOrderState,
          quantity: value / limitOrderStateFull.price,
        });
      }
    }
  };

  const countOrder = e => {
    const { value } = e.target;
    if (limitOrderState.price) {
      if (value >= 0) {
        if (value > orderMax || value < orderMin) {
          setLimitOrderState({
            ...limitOrderState,
            quantity: '',
          });
          setLimitOrderStateFull({
            ...limitOrderState,
            quantity: '',
          });
        } else {
          setLimitOrderState({
            ...limitOrderState,
            quantity: cropNumber(value),
          });
          setLimitOrderStateFull({
            ...limitOrderStateFull,
            quantity: value,
          });
        }
        // setTotal(cropNumber(calData?.total));
        setTotal(toCrop(8)(limitOrderStateFull.price * value));
      }
    }
  };

  const handleChangeInput = e => {
    const { value, name } = e.target;
    if (numberValidation(value)) {
      setLimitOrderState({
        ...limitOrderState,
        [name]: value,
      });
      setLimitOrderStateFull({
        ...limitOrderState,
        [name]: value,
      });
      // setTotal(cropNumber(calData?.total));  // HERE NOT USED DATA FROM API BECAUSE OF INCORRECT COUNTING
      if (name === 'price') {
        if (limitOrderState.quantity) {
          setTotal(toCrop(8)(limitOrderStateFull.quantity * value));
          // setTotal(limitOrderState.quantity * e.target.value);
        }
      }
      if (name === 'quantity') {
        if (limitOrderState.price) {
          if (value > orderMax || value < orderMin) {
            setTotal('');
          } else {
            setTotal(cropNumber(value * limitOrderStateFull.price));
          }
        }
      }
    }
  };

  const createTrade = () => {
    dispatch({
      type: types.CREATE_ORDER_START,
      payload: {
        // ...limitOrderState,
        // quantity: +limitOrderState.quantity,
        // price: +limitOrderState.price,
        ...limitOrderStateFull,
        quantity: +cropNumber(limitOrderStateFull.quantity, 8),
        price: +cropNumber(limitOrderStateFull.price, 8),
      },
    });
  };

  const handleTrade = e => {
    e.preventDefault();
    if (limitOrderState.quantity && limitOrderState.price) {
      createTrade();
    }
    setLimitOrderState({
      ...initState,
    });
    setLimitOrderStateFull({
      ...initState,
    });
    setTotal('');
  };

  useEffect(() => {
    if (
      currentPair &&
      +limitOrderStateFull.quantity &&
      +limitOrderStateFull.price &&
      mode
    ) {
      dispatch({
        type: types.POST_CALCULATE_LIMIT_ORDER_START,
        isLogin: auth,
        payload: {
          pair: currentPair,
          quantity: +limitOrderStateFull.quantity,
          price: +limitOrderStateFull.price,
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
    // if (+limitOrderState.price > 0 && +balance > 0) {
    if (!balance || !percent || !limitOrderStateFull?.price) {
      return '';
    }

    if (mode === 'Buy') {
      // return cropNumber((+balance / +limitOrderState.price) * +percent);
      return (+balance / +limitOrderStateFull.price) * +percent;
    }
    return +balance * +percent;
    // }
    // return 0;
  };

  useEffect(() => {
    if (priceFromOrderBook) {
      setLimitOrderState({
        ...limitOrderState,
        price: cropNumber(priceFromOrderBook),
      });
      setLimitOrderStateFull({
        ...limitOrderStateFull,
        price: priceFromOrderBook,
      });
      // setTotal(limitOrderState.quantity * priceFromOrderBook);
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
        <span>~ {numberWithCommas(cropNumber(calData?.commission) || 0)}</span>{' '}
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
          <AuthSection />
        )}
      </div>
    </>
  );
};

export default LimitOrder;
