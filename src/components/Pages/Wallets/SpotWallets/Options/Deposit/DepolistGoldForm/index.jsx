/* eslint-disable react/prop-types */
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import L from 'i18n-react';
import { useDispatch, useSelector } from 'react-redux';
import {
  amountValidation,
  comissionCalculator,
} from '../../../../../../../services/helpers';
import { dropDownArrow } from '../../../../../../../styles/img/icons';
import {
  assetsWalletSelector,
  paymentWindowUrlSelector,
} from '../../../../../../../redux/wallets/selectors';
import types from '../../../../../../../redux/types';
import { instanceExchangeRateSelector } from '../../../../../../../redux/bankTransfer/exchange/selectors';
import { currentAssetFeesSelector } from '../../../../../../../redux/fees/selectors';
import { payPalSystem, payonerSystem, amountToBeCreditedCalc } from './utils';

export const DepositGoldForm = ({ crypt, spot }) => {
  const translatePath = 'Wallets.Spot.CryptoDeposit.GoldDepositForm';
  const systemDefaultValue = L.translate(
    `${translatePath}.payment_system_default`,
  );
  const currencyDefaultValue = L.translate(
    `${translatePath}.payment_currency_default`,
  );

  // Hooks
  const dispatch = useDispatch();
  const allAssets = useSelector(assetsWalletSelector);
  const rate = useSelector(instanceExchangeRateSelector);
  const goldFees = useSelector(currentAssetFeesSelector);
  const paymentWindowUrl = useSelector(paymentWindowUrlSelector);

  // State
  const [showPaymentList, setShowPaymentList] = useState(false);
  const [showCurrenciesList, setShowCurrenciesList] = useState(false);

  const [currentSystem, setCurrentSystem] = useState(systemDefaultValue);
  const [currency, setCurrency] = useState(currencyDefaultValue);
  const [amount, setAmount] = useState('');

  const [currentSystemError, setCurrentSystemError] = useState(false);
  const [currencyError, setCurrencyError] = useState(false);
  const [amountError, setAmountError] = useState(false);

  // Varriables
  const showComissions = currency !== currencyDefaultValue;
  const goldDepositFee = Number(goldFees.deposit_fee);
  // const depositUSDMin = Number(rate) /
  const amountNum = Number(amount);
  const amountToBeCredited = amountToBeCreditedCalc(goldDepositFee, amountNum);

  const euqvialent = amountNum * Number(rate);
  const formatEquvialent = `${euqvialent.toFixed(2)} ${currency}`;
  // Memoized values
  const goldAsset = useMemo(() => allAssets?.find(a => a.code === crypt), [
    allAssets,
  ]);

  const curencyMin = allAssets.find(a => a?.code === currency.toLowerCase())
    ?.deposit_min;

  const amountMin = Math.ceil(curencyMin / Number(rate)) || '';

  // Handlers
  const handleCurrentSystemChange = useCallback(
    systemName => {
      setCurrentSystem(systemName);
      setShowPaymentList(false);

      if (currentSystemError) setCurrentSystemError(false);
    },
    [currentSystemError],
  );

  const handleAmountChange = useCallback(e => {
    const { value } = e.target;

    if (amountValidation(8, 8)(value)) {
      setAmount(value);
      setAmountError(false);
    }
    if (Number(value) === 0 || value === '') {
      setAmountError(true);
    }
  }, []);

  const handleCurrencyChange = useCallback(
    currencyName => {
      setCurrency(currencyName);
      setShowCurrenciesList(false);

      if (currencyError) setCurrencyError(false);
    },
    [currencyError],
  );

  const handleSubmit = e => {
    e.preventDefault();

    const isSystemError = currentSystem === systemDefaultValue;
    const isCurrencyError = currency === currencyDefaultValue;

    if (!amount || isSystemError || isCurrencyError) {
      if (isSystemError) setCurrentSystemError(true);
      if (!amount) setAmountError(true);
      if (isCurrencyError) setCurrencyError(true);
      return;
    }
    if (amountError || currentSystemError || currencyError) return;

    if (currentSystem === payPalSystem) {
      // This body is difference than normal fiat deposit request, because we cant deposit GOLD to the platform,
      // but we can deposit EUR or USD, and then, change it to gold. At server side it works like that. For user
      // it looks like he are depositing gold to platform.

      const body = {
        amount: euqvialent,
        asset_id: allAssets.find(a => a?.code === currency.toLowerCase())?.id, // EUR or USD asset
        transfer_asset_id: spot?.asset?.id, // Gold asset
      };
      dispatch({ type: types.SEND_PAY_PAL_DEPOSIT_REQUEST_START, body });
    } else if (currentSystem === payonerSystem) {
      alert('Payoner request');
    }
  };

  useEffect(() => {
    setCurrentSystem(systemDefaultValue);
    setCurrency(currencyDefaultValue);
  }, [systemDefaultValue, currencyDefaultValue]);

  useEffect(() => {
    if (currency === currencyDefaultValue || !Array.isArray(allAssets)) return;

    const targetID = allAssets.find(a => a.code === currency.toLowerCase())?.id;

    dispatch({
      type: types.EXCHANGE_RATE_START,
      payload: {
        from_asset_id: goldAsset?.id,
        to_asset_id: targetID,
      },
    });
  }, [currency, dispatch, allAssets, goldAsset, currencyDefaultValue]);

  useEffect(() => {
    const assetID = goldAsset?.id;

    dispatch({
      type: types.GET_ASSET_FEES_START,
      assetID,
    });
  }, [dispatch, goldAsset]);

  useEffect(() => () => dispatch({ type: types.CLEAR_DEPOSIT_WINDOW_URL }), [
    dispatch,
  ]);

  return (
    <div className="col-lg-4">
      <div className="operation-form-wrap">
        <form onSubmit={handleSubmit} className="operation-form">
          <div className="field ">
            <span className="form-label">
              {L.translate(`${translatePath}.payment_system_label`)}
            </span>
            <div className="field-wrap">
              <div
                className="custom-select active country-select-wrap"
                style={{ zIndex: 7 }}
              >
                <button
                  type="button"
                  className="custom-select__item"
                  onClick={() => setShowPaymentList(prev => !prev)}
                >
                  <span>{currentSystem}</span>
                  <span className="custom-select__arrow">{dropDownArrow}</span>
                </button>
                {currentSystemError && (
                  <div className="error-text">
                    <p className="error-text__item">
                      {L.translate(`${translatePath}.payment_system_error`)}
                    </p>
                  </div>
                )}
                {showPaymentList && (
                  <div className="drop-list drop-list-translate">
                    <ul className="drop-list__item">
                      <li>
                        <button
                          type="button"
                          className="drop-btn"
                          onClick={() =>
                            handleCurrentSystemChange(payPalSystem)
                          }
                        >
                          {payPalSystem}
                        </button>
                      </li>
                      {/* <li>
                        <button
                          type="button"
                          className="drop-btn"
                          onClick={() =>
                            handleCurrentSystemChange(payonerSystem)
                          }
                        >
                          {payonerSystem}
                        </button>
                      </li> */}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="field ">
            <span className="form-label">
              {L.translate(`${translatePath}.payment_currency_label`)}
            </span>
            <div className="field-wrap">
              <div className="custom-select active country-select-wrap">
                <button
                  type="button"
                  className="custom-select__item"
                  onClick={() => setShowCurrenciesList(prev => !prev)}
                >
                  <span>{currency}</span>
                  <span className="custom-select__arrow">{dropDownArrow}</span>
                </button>
                {currencyError && (
                  <div className="error-text">
                    <p className="error-text__item">
                      {L.translate(`${translatePath}.payment_currency_error`)}
                    </p>
                  </div>
                )}
                {showCurrenciesList && (
                  <div className="drop-list drop-list-translate">
                    <ul className="drop-list__item">
                      <li>
                        <button
                          type="button"
                          className="drop-btn"
                          onClick={() => handleCurrencyChange('USD')}
                        >
                          USD
                        </button>
                      </li>
                      <li>
                        <button
                          type="button"
                          className="drop-btn"
                          onClick={() => handleCurrencyChange('EUR')}
                        >
                          EUR
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="field">
            <span className="form-label">
              {L.translate(`${translatePath}.amount`)}
            </span>
            <div className={amountError ? 'field-wrap error' : 'field-wrap'}>
              <input
                type="text"
                className="form-item form-item--type3"
                placeholder="0"
                value={amount}
                onChange={handleAmountChange}
              />
              {amountError && (
                <div className="error-text">
                  <p className="error-text__item">
                    {L.translate(`${translatePath}.amount_error`)}
                  </p>
                </div>
              )}

              {Number.isFinite(goldDepositFee) && (
                <>
                  {crypt === 'mtcg' && (
                    <div className="help-text">
                      <p className="help-text__item">
                        {L.translate(`Wallets.Spot.CryptoDeposit.amount_min`)} :{' '}
                        {amountMin !== Infinity && amountMin}
                      </p>
                    </div>
                  )}
                  <div className="help-text">
                    <p className="help-text__item">
                      {L.translate(`${translatePath}.deposit_comission`, {
                        fee: goldDepositFee,
                        crypt: crypt.toUpperCase(),
                      })}
                    </p>
                  </div>
                  <div className="help-text">
                    <p className="help-text__item">
                      {L.translate(
                        `${translatePath}.${
                          crypt === 'gold'
                            ? 'amount_to_be_credited'
                            : 'amount_to_be_credited_mtcg'
                        }`,
                        {
                          amount: amountToBeCredited,
                          crypt: crypt === 'gold' ? null : crypt.toUpperCase(),
                        },
                      )}
                    </p>
                  </div>
                </>
              )}

              {showComissions && (
                <>
                  <div className="help-text">
                    <p className="help-text__item">
                      {L.translate(
                        `${translatePath}.${
                          crypt === 'gold'
                            ? 'current_rate'
                            : 'current_rate_mtcg'
                        }`,
                        {
                          rate: Number(rate),
                          currency,
                        },
                      )}
                    </p>
                  </div>
                  <div className="help-text">
                    <p className="help-text__item">
                      {L.translate(`${translatePath}.currency_equivalent`, {
                        equivalent: formatEquvialent,
                      })}
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="operation-form__submit">
            <button type="submit" className="page-btn">
              {L.translate(`${translatePath}.submit_btn`)}
            </button>
          </div>
          {paymentWindowUrl.length > 0 && (
            <div className="operation-form__submit">
              {L.translate(`${translatePath}.payment_window_note`, {
                link: (
                  <a href={paymentWindowUrl} target="blank">
                    {L.translate(`${translatePath}.payment_window_link`)}
                  </a>
                ),
              })}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};
