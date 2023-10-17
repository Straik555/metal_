/* eslint-disable no-case-declarations */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import L from 'i18n-react';
import { useDispatch, useSelector } from 'react-redux';
import types from '../../../../../../../redux/types';
import { amountValidation } from '../../../../../../../services/helpers';
import { currentAssetFeesSelector } from '../../../../../../../redux/fees/selectors';
import { dropDownArrow } from '../../../../../../../styles/img/icons';
import { payPalSystem, payonerSystem } from './utils';

export const WithdrawFiatForm = ({ spot }) => {
  const translatePath = 'Wallets.Spot.CryptoWithdraw.fiatForm';
  const paymentSystemDefault = L.translate(
    `${translatePath}.payment_system_default`,
  );

  const dispatch = useDispatch();
  const assetComissions = useSelector(currentAssetFeesSelector);

  const [address, setAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [adressError, setAdressError] = useState(false);
  const [amountError, setAmountError] = useState(false);
  const [amountSumError, setAmountSumError] = useState(false);

  const [showSystemsList, setShowSystemsList] = useState(false);
  const [currentSystemError, setCurrentSystemError] = useState(false);
  const [currentSystem, setCurrentSystem] = useState(paymentSystemDefault);

  const minSumToWithdraw = spot?.asset?.withdraw_min;
  const balance = Number(spot?.balance);

  const handleChangeAdress = e => {
    setAddress(e.target.value);
    const checkValue = e.target.value.trim();
    if (checkValue) {
      setAdressError(false);
      return;
    }
    setAdressError(true);
  };

  const handleCurrentSystemChange = systemName => {
    setCurrentSystem(systemName);
    setShowSystemsList(false);

    if (currentSystemError) setCurrentSystemError(false);
  };

  const handleAmountChange = e => {
    const { value } = e.target;
    const currentValue = Number(value);

    if (amountValidation(8, 8)(value)) {
      setAmount(value);
      setAmountError(false);
      setAmountSumError(false);
    }
    if (currentValue === 0) {
      setAmountError(true);
      return;
    }
    if (currentValue > balance || currentValue < minSumToWithdraw) {
      setAmountSumError(true);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();

    const isSystemDefault = currentSystem === paymentSystemDefault;

    if (!address || !amount || isSystemDefault) {
      if (!address) setAdressError(true);
      if (!amount) setAmountError(true);
      if (isSystemDefault) setCurrentSystemError(true);
      return;
    }
    if (adressError || amountError || amountSumError || isSystemDefault) return;

    if (currentSystem === payPalSystem) {
      const body = {
        amount,
        asset_id: spot?.asset?.id,
        to: address,
        withdraw_ps: 'PAYPAL_ID',
      };

      dispatch({
        type: types.SEND_PAY_PAL_FIAT_WITHDRAWAL_REQUEST_START,
        body,
      });
    } else if (currentSystem === payonerSystem) {
      alert('Payoner reuqset.');
    }

    setAddress('');
    setAmount('');
    setCurrentSystem(paymentSystemDefault);
    setAdressError(false);
    setAmountError(false);
    setCurrentSystemError(false);
  };

  useEffect(() => {
    const assetID = spot?.asset?.id;

    if (assetID === undefined) return;
    dispatch({
      type: types.GET_ASSET_FEES_START,
      assetID,
    });
  }, [dispatch, spot]);

  useEffect(() => {
    setCurrentSystem(paymentSystemDefault);
  }, [paymentSystemDefault]);

  return (
    <div className="col-lg-4">
      <div className="operation-form-wrap">
        <form onSubmit={handleSubmit} className="operation-form">
          <div className="field ">
            <span className="form-label">
              {L.translate(`${translatePath}.payment_system_label`)}
            </span>
            <div className="field-wrap">
              <div className="custom-select active country-select-wrap">
                <button
                  type="button"
                  className="custom-select__item"
                  onClick={() => setShowSystemsList(prev => !prev)}
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
                {showSystemsList && (
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
              {L.translate(`${translatePath}.adress_label`)}
            </span>
            <div className={adressError ? 'field-wrap error' : 'field-wrap'}>
              <input
                type="text"
                className="form-item form-item--type3"
                placeholder={L.translate(`${translatePath}.adress_placeholder`)}
                value={address}
                onChange={handleChangeAdress}
              />
              <div className="help-text">
                <p className="help-text__item">
                  {L.translate(`${translatePath}.payment_account_info`)}
                </p>
              </div>
              {adressError && (
                <div className="error-text">
                  <p className="error-text__item">
                    {L.translate(`${translatePath}.adress_error`)}
                  </p>
                </div>
              )}
            </div>
          </div>
          <div className="field">
            <span className="form-label">
              {L.translate(`${translatePath}.amount_label`)}
            </span>
            <div className={amountError ? 'field-wrap error' : 'field-wrap'}>
              <input
                type="text"
                className="form-item form-item--type3"
                placeholder="0"
                value={amount}
                onChange={handleAmountChange}
              />
              <div className="help-text">
                <p>
                  {L.translate(`${translatePath}.comission_info`, {
                    code: assetComissions?.withdraw_fee,
                  })}
                </p>
              </div>
              {amountError && (
                <div className="error-text">
                  <p className="error-text__item">
                    {L.translate(`${translatePath}.amount_error`)}
                  </p>
                </div>
              )}
              {amountSumError && (
                <div className="error-text">
                  <p className="error-text__item">
                    {`${L.translate(
                      `${translatePath}.amount_sum_error`,
                    )} ${minSumToWithdraw}`}
                  </p>
                </div>
              )}
            </div>
          </div>
          <div className="operation-form__submit">
            <button type="submit" className="page-btn">
              {L.translate(`${translatePath}.submit_btn`)}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
