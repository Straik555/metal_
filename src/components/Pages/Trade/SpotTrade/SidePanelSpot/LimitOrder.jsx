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
import PercentButtons from './PercentButtons';
import { currentPairSelector } from '../../../../../redux/currentPair/selectors';
import { spotWalletSelector } from '../../../../../redux/wallets/selectors';
import { selectedTradePriceSelector } from '../../../../../redux/temporary/selectors';
import AuthSection from './AuthSection';
import { calcSelector } from '../../../../../redux/trade/calculate/selectors';
import { openModal } from '../../../../Base/Modal';
import ModalConfirmTrade from '../../../../Base/Modals/ModalConfirmTrade';
import { lastPriceSelector } from '../../../../../redux/trade/spot/selectors';

let trotleLimitCalcRequest = null;

const LimitOrder = ({ balance, assetToTrade, assetBalance, mode }) => {
  const dispatch = useDispatch();
  const auth = useSelector(state => !!state.user.token);
  const currentPair = useSelector(currentPairSelector);
  const priceFromOrderBook = useSelector(selectedTradePriceSelector);

  const calculate = useSelector(calcSelector);
  const calData = calculate?.limitOrder[mode.toLowerCase()];

  const allAssets = useSelector(state => state?.assets?.assets); // spotWalletSelector
  const [orderMax, setOrderMax] = useState(0);
  const [orderMin, setOrderMin] = useState(0);

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
  const [total, setTotal] = useState('');
  const [totalFull, setTotalFull] = useState('');

  const handleChangeInput = e => {
    let { value, name } = e.target;
    // For deleting commas
    value = value.replace(/\,/g, '');
    const valueNoComma = value;

    if (value?.includes('.')) {
      value = numberWithCommas(value);
    }
    // && !value[value.length - 1]?.includes(',') // Need do disable sending request to backend if comma was typed
    if (numberValidation(value)) {
      setLimitOrderState({
        ...limitOrderState,
        [name]: value,
      });
      setLimitOrderStateFull({
        ...limitOrderStateFull,
        [name]: valueNoComma,
      });

      if (name === 'price') {
        if (limitOrderState.quantity) {
          setTotal(
            numberWithCommas(
              toCrop(8)(limitOrderStateFull.quantity * valueNoComma),
            ),
          );
          setTotalFull(toCrop(8)(limitOrderStateFull.quantity * valueNoComma));

          // setTotal(limitOrderState.quantity * e.target.value);
        }
      }

      if (name === 'quantity') {
        if (limitOrderState.price) {
          if (valueNoComma > orderMax || +valueNoComma < orderMin) {
            setTotal('');
            setTotalFull('');
          } else {
            setTotal(
              numberWithCommas(
                cropNumber(valueNoComma * limitOrderStateFull.price),
              ),
            );
            setTotalFull(cropNumber(valueNoComma * limitOrderStateFull.price));
          }
        }
      }
    }
  };

  const handleChangeTotal = e => {
    let { value } = e.target;

    // For deleting commas
    value = value.replace(/\,/g, '');
    const valueNoComma = value;
    if (value?.includes('.')) {
      value = numberWithCommas(value);
    }

    if (numberValidation(value) && limitOrderState.price) {
      setTotal(value);
      setTotalFull(valueNoComma);

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
          quantity: numberWithCommas(
            cropNumber(valueNoComma / limitOrderStateFull.price),
          ),
        });
        setLimitOrderStateFull({
          ...limitOrderStateFull,
          quantity: valueNoComma / limitOrderStateFull.price,
        });
      }
    }
  };

  // This is for % buttons
  const countOrder = e => {
    let { value } = e.target;
    // For deleting commas
    value = value.replace(/\,/g, '');
    let valueNoComma = value;
    if (value?.includes('.')) {
      value = numberWithCommas(value);
    }
    if (limitOrderState.price) {
      if (+valueNoComma >= 0) {
        if (+valueNoComma > orderMax || +valueNoComma < orderMin) {
          setLimitOrderState({
            ...limitOrderState,
            quantity: '',
          });
          setLimitOrderStateFull({
            ...limitOrderState,
            quantity: '',
          });
          setTotal('');
        } else {
          setLimitOrderState({
            ...limitOrderState,
            quantity: numberWithCommas(cropNumber(valueNoComma)),
          });
          setLimitOrderStateFull({
            ...limitOrderStateFull,
            quantity: valueNoComma,
          });
          setTotal(
            numberWithCommas(
              toCrop(8)(limitOrderStateFull.price * valueNoComma),
            ),
          );
          setTotalFull(toCrop(8)(limitOrderStateFull.price * valueNoComma));
        }
      }
    }
  };

  // This is for % buttons
  const percentButtonCountValue = percent => {
    if (!balance || !percent || !limitOrderStateFull?.price) {
      return '';
    }
    if (mode === 'Buy') {
      return (+balance / +limitOrderStateFull.price) * +percent;
    }
    return +balance * +percent;
  };

  const createTrade = () => {
    const quantity = +cropNumber(limitOrderStateFull.quantity, 8);
    const price = +cropNumber(limitOrderStateFull.price, 8);
    dispatch({
      type: types.CREATE_ORDER_START,
      payload: {
        ...limitOrderStateFull,
        quantity,
        price,
      },
    });
  };

  const setAllStateToInit = () => {
    setLimitOrderState({
      ...initState,
    });
    setLimitOrderStateFull({
      ...initState,
    });
    setTotal('');
  };

  const lastPrice = useSelector(lastPriceSelector);
  const handleTrade = e => {
    e.preventDefault();
    const { price, quantity } = limitOrderState;
    if (quantity && price) {
      if (mode === 'Buy') {
        if (price >= lastPrice * 1.05) {
          openModal(() => (
            <ModalConfirmTrade
              createTrade={createTrade}
              setAllStateToInit={setAllStateToInit}
              mode={mode}
            />
          ));
          return;
        }
      } else if (price * 1.05 <= lastPrice) {
        openModal(() => (
          <ModalConfirmTrade
            createTrade={createTrade}
            setAllStateToInit={setAllStateToInit}
            mode={mode}
          />
        ));
        return;
      }
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

  // calculations for total and fee
  useEffect(() => {
    if (
      currentPair &&
      +limitOrderStateFull.quantity &&
      +limitOrderStateFull.price &&
      mode
    ) {
      if (trotleLimitCalcRequest) {
        clearTimeout(trotleLimitCalcRequest);
      }
      trotleLimitCalcRequest = setTimeout(() => {
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
      }, 500);
    }
    return () => {
      dispatch({
        type: types.CALCULATE_LIMIT_ORDER_CLEAR,
        payload: mode.toLowerCase(),
      });
    };
  }, [limitOrderState, mode]);

  // for changing price picked from order book
  useEffect(() => {
    if (priceFromOrderBook) {
      setLimitOrderState({
        ...limitOrderState,
        price: numberWithCommas(cropNumber(priceFromOrderBook)),
      });
      setLimitOrderStateFull({
        ...limitOrderStateFull,
        price: priceFromOrderBook,
      });
      // setTotal(limitOrderState.quantity * priceFromOrderBook);
      setTotal(
        numberWithCommas(limitOrderStateFull.quantity * +priceFromOrderBook),
      );
    }
  }, [priceFromOrderBook]);

  // change pair_code if currentPair changes
  useEffect(() => {
    setAllStateToInit();
    setLimitOrderState({
      ...initState,
      pair_code: currentPair,
    });
    setLimitOrderStateFull({
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
            placeholder={`${L.translate('Trading.orderCreation.amount')}`}
            value={limitOrderState.quantity}
            name="quantity"
            onChange={handleChangeInput}
            required
          />
          <p className="input-info">
            <span>{assetToTrade?.toUpperCase()}</span>
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
            <span>{assetBalance?.toUpperCase()}</span>
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
            <span>{assetBalance?.toUpperCase()}</span>
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
            {assetToTrade?.toUpperCase()}
          </button>
        ) : (
          <AuthSection />
        )}
      </div>
    </>
  );
};

export default LimitOrder;
