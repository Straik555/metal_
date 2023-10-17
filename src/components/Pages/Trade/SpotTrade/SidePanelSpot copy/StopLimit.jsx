import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import L from 'i18n-react';

import types from '../../../../../redux/types';
import {
  numberValidation,
  cropNumber,
  toCrop,
  // numberWithCommas,
} from '../../../../../services/helpers';
import routes from '../../../../../routes';

import PercentButtons from './PercentButtons';
import { currentPairSelector } from '../../../../../redux/currentPair/selectors';
import { spotWalletSelector } from '../../../../../redux/wallets/selectors';
import {
  selectedTradePriceSelector,
  selectedTradeSelector,
} from '../../../../../redux/temporary/selectors';
import { calcSelector } from '../../../../../redux/trade/calculate/selectors';

function StopLimit(props) {
  const { balance, mode, assetToTrade, assetBalance } = props;

  const dispatch = useDispatch();
  const auth = useSelector(state => !!state.user.token);
  const currentPair = useSelector(currentPairSelector);

  const allAssets = useSelector(spotWalletSelector);
  const [orderMax, setOrderMax] = useState(0);
  const [orderMin, setOrderMin] = useState(0);

  useEffect(() => {
    if (allAssets) {
      setOrderMax(allAssets[assetToTrade].asset.order_max);
      setOrderMin(allAssets[assetToTrade].asset.order_min);
    }
  }, [allAssets, assetToTrade]);

  // const assetPairs = useSelector(state => state.assetPairs.assetPairs);
  const initState = {
    stop: '',
    limit: '',
    quantity: '',
    pair_code: currentPair,
    is_margin: 0,
    type: mode.toLowerCase(), // buy or sell
  };
  const [stopLimitOrderState, setStopLimitOrderState] = useState({
    ...initState,
  });
  const [stopLimitOrderStateFull, setStopLimitOrderStateFull] = useState({
    ...initState,
  });
  const [total, setTotal] = useState('');

  const countOrder = e => {
    const { value } = e.target;
    if (stopLimitOrderState.limit) {
      if (value > orderMax || value < orderMin) {
        setStopLimitOrderState({
          ...stopLimitOrderState,
          quantity: '',
        });
        setStopLimitOrderStateFull({
          ...stopLimitOrderStateFull,
          quantity: '',
        });
      } else {
        setStopLimitOrderState({
          ...stopLimitOrderState,
          quantity: cropNumber(e.target.value),
        });
        setStopLimitOrderStateFull({
          ...stopLimitOrderStateFull,
          quantity: e.target.value,
        });
      }

      setTotal(toCrop(8)(e.target.value * stopLimitOrderStateFull.limit));
    }
  };

  const handleChangeInput = e => {
    const { value, name } = e.target;
    if (numberValidation(value)) {
      setStopLimitOrderState({
        ...stopLimitOrderState,
        [name]: value,
      });
      setStopLimitOrderStateFull({
        ...stopLimitOrderStateFull,
        [name]: value,
      });
      if (
        // stopLimitOrderState.stop &&
        stopLimitOrderState.limit &&
        e.target.name === 'quantity'
      ) {
        if (value > orderMax || value < orderMin) {
          setTotal('');
        } else {
          setTotal(toCrop(8)(value * stopLimitOrderStateFull.limit));
        }
      }
      if (
        // stopLimitOrderState.stop &&
        stopLimitOrderState.quantity &&
        e.target.name === 'limit'
      ) {
        setTotal(toCrop(8)(value * stopLimitOrderStateFull.quantity));
      }
      // if (
      //   stopLimitOrderState.limit &&
      //   stopLimitOrderState.quantity &&
      //   e.target.name === 'stop'
      // ) {
      //   setTotal(cropNumber(e.target.value * stopLimitOrderState.limit));
      // }
    }
  };

  const handleChangeTotal = e => {
    const { value } = e.target;
    if (stopLimitOrderState.limit) {
      if (numberValidation(value)) {
        setTotal(value);
        if (
          value / stopLimitOrderState.limit < orderMin ||
          value / stopLimitOrderState.limit > orderMax
        ) {
          setStopLimitOrderState({
            ...stopLimitOrderState,
            quantity: '',
          });
          setStopLimitOrderStateFull({
            ...stopLimitOrderState,
            quantity: '',
          });
        } else {
          setStopLimitOrderState({
            ...stopLimitOrderState,
            quantity: cropNumber(value / stopLimitOrderStateFull.limit),
          });
          setStopLimitOrderStateFull({
            ...stopLimitOrderStateFull,
            quantity: value / stopLimitOrderStateFull.limit,
          });
        }
      }
    }
  };

  const createTrade = () => {
    dispatch({
      type: types.CREATE_STOP_LIMIT_ORDER_START,
      payload: {
        ...stopLimitOrderStateFull,
        stop: +cropNumber(stopLimitOrderStateFull.stop, 8),
        limit: +cropNumber(stopLimitOrderStateFull.limit, 8),
        quantity: +cropNumber(stopLimitOrderStateFull.quantity, 8),
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
      // if (mode === 'Buy') {
      //   if (total <= balance) {
      //     createTrade();
      //   } else {
      //     // alert('Error! Total is more then balance!'); // TEMP!
      //     return;
      //   }
      // } else if (stopLimitOrderState.quantity <= balance) {
      //   createTrade();
      // } else {
      //   // alert('Error! Amount is more then balance!'); // TEMP!
      //   return;
      // }
      createTrade();
    }
    setStopLimitOrderState({
      ...initState,
    });
    setStopLimitOrderStateFull({
      ...initState,
    });
    setTotal('');
  };

  const percentButtonCountValue = perсent => {
    if (+stopLimitOrderState.limit && +stopLimitOrderState.stop) {
      if (mode === 'Buy') {
        return (+balance / +stopLimitOrderStateFull.limit) * +perсent;
      }
      return +balance * +perсent;
    }
    return 0;
  };

  const priceFromOrderBook = useSelector(selectedTradePriceSelector);

  useEffect(() => {
    if (priceFromOrderBook) {
      setStopLimitOrderState({
        ...stopLimitOrderState,
        limit: cropNumber(priceFromOrderBook),
      });
      setStopLimitOrderStateFull({
        ...stopLimitOrderStateFull,
        limit: priceFromOrderBook,
      });
      setTotal(
        toCrop(8)(stopLimitOrderStateFull.quantity * priceFromOrderBook),
      );
    }
  }, [priceFromOrderBook]);

  useEffect(() => {
    setStopLimitOrderState({
      ...stopLimitOrderState,
      pair_code: currentPair,
    });
    setStopLimitOrderStateFull({
      ...stopLimitOrderStateFull,
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
            placeholder={`${L.translate('Trading.orderCreation.limit_order')}`}
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
