import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
import { currentPairSelector } from '../../../../../redux/currentPair/selectors';
import { spotWalletSelector } from '../../../../../redux/wallets/selectors';
import { selectedTradePriceSelector } from '../../../../../redux/temporary/selectors';
import AuthSection from './AuthSection';

function StopLimit(props) {
  const { balance, mode, assetToTrade, assetBalance } = props;

  const dispatch = useDispatch();
  const auth = useSelector(state => !!state.user.token);
  const currentPair = useSelector(currentPairSelector);
  const priceFromOrderBook = useSelector(selectedTradePriceSelector);

  const allAssets = useSelector(state => state?.assets?.assets); // spotWalletSelector
  const [orderMax, setOrderMax] = useState(0);
  const [orderMin, setOrderMin] = useState(0);

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

  const handleChangeInput = e => {
    let { value, name } = e.target;

    // For deleting commas
    value = value.replace(/\,/g, '');
    const valueNoComma = value.replace(/\,/g, '');

    if (value?.includes('.')) {
      value = numberWithCommas(value);
    }

    if (numberValidation(value)) {
      setStopLimitOrderState({
        ...stopLimitOrderState,
        [name]: value,
      });
      setStopLimitOrderStateFull({
        ...stopLimitOrderStateFull,
        [name]: valueNoComma,
      });
      if (
        // stopLimitOrderState.stop &&
        stopLimitOrderState.limit &&
        name === 'quantity'
      ) {
        if (+valueNoComma > orderMax || +valueNoComma < orderMin) {
          setTotal('');
        } else {
          setTotal(
            numberWithCommas(
              toCrop(8)(valueNoComma * stopLimitOrderStateFull.limit),
            ),
          );
        }
      }
      if (
        // stopLimitOrderState.stop &&
        stopLimitOrderState.quantity &&
        name === 'limit'
      ) {
        setTotal(
          numberWithCommas(
            toCrop(8)(valueNoComma * stopLimitOrderStateFull.quantity),
          ),
        );
      }
    }
  };

  const handleChangeTotal = e => {
    let { value } = e.target;

    // For deleting commas
    value = value.replace(/\,/g, '');
    const valueNoComma = value.replace(/\,/g, '');
    if (value?.includes('.')) {
      value = numberWithCommas(value);
    }

    if (stopLimitOrderState.limit) {
      if (numberValidation(valueNoComma)) {
        setTotal(value);
        if (
          +valueNoComma / stopLimitOrderState.limit < orderMin ||
          +valueNoComma / stopLimitOrderState.limit > orderMax
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
            quantity: numberWithCommas(
              cropNumber(valueNoComma / stopLimitOrderStateFull.limit),
            ),
          });
          setStopLimitOrderStateFull({
            ...stopLimitOrderStateFull,
            quantity: numberWithCommas(
              valueNoComma / stopLimitOrderStateFull.limit,
            ),
          });
        }
      }
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
    if (stopLimitOrderState.limit) {
      if (+valueNoComma > +orderMax || +valueNoComma < +orderMin) {
        setStopLimitOrderState({
          ...stopLimitOrderState,
          quantity: '',
        });
        setStopLimitOrderStateFull({
          ...stopLimitOrderStateFull,
          quantity: '',
        });
        setTotal('');
      } else {
        setStopLimitOrderState({
          ...stopLimitOrderState,
          quantity: numberWithCommas(cropNumber(valueNoComma)),
        });
        setStopLimitOrderStateFull({
          ...stopLimitOrderStateFull,
          quantity: valueNoComma,
        });
        setTotal(
          numberWithCommas(
            toCrop(8)(valueNoComma * stopLimitOrderStateFull.limit),
          ),
        );
      }
    }
  };

  const percentButtonCountValue = perсent => {
    if (+stopLimitOrderStateFull.limit && +stopLimitOrderStateFull.stop) {
      if (mode === 'Buy') {
        return (+balance / +stopLimitOrderStateFull.limit) * +perсent;
      }
      return +balance * +perсent;
    }
    return 0;
  };

  const setAllStateToInit = () => {
    setStopLimitOrderState({
      ...initState,
    });
    setStopLimitOrderStateFull({
      ...initState,
    });
    setTotal('');
  };

  const createTrade = () => {
    const stop = cropNumber(stopLimitOrderStateFull.stop, 8);
    const limit = cropNumber(stopLimitOrderStateFull.limit, 8);
    const quantity = cropNumber(stopLimitOrderStateFull.quantity, 8);
    dispatch({
      type: types.CREATE_STOP_LIMIT_ORDER_START,
      payload: {
        ...stopLimitOrderStateFull,
        stop,
        limit,
        quantity,
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
    }
    setAllStateToInit();
    dispatch({ type: types.CLEAR_SELECTED_TRADE });
  };

  // if Max or Min order value changes
  useEffect(() => {
    if (allAssets) {
      const { order_max, order_min } =
        allAssets?.find(item => item.code === assetToTrade.toLowerCase()) || 0;
      setOrderMax(order_max);
      setOrderMin(order_min);
    }
  }, [allAssets, assetToTrade]);

  useEffect(() => {
    if (priceFromOrderBook) {
      setStopLimitOrderState({
        ...stopLimitOrderState,
        limit: numberWithCommas(cropNumber(priceFromOrderBook)),
      });
      setStopLimitOrderStateFull({
        ...stopLimitOrderStateFull,
        limit: priceFromOrderBook,
      });
      setTotal(
        numberWithCommas(
          toCrop(8)(stopLimitOrderStateFull.quantity * priceFromOrderBook),
        ),
      );
    }
  }, [priceFromOrderBook]);

  useEffect(() => {
    setAllStateToInit();

    setStopLimitOrderState({
      ...initState,
      pair_code: currentPair,
    });
    setStopLimitOrderStateFull({
      ...initState,
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
          mode={mode}
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
          <AuthSection />
        )}
      </div>
    </>
  );
}

export default StopLimit;
