/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import L from 'i18n-react';
import { useDispatch, useSelector } from 'react-redux';
import { amountValidation } from '../../../../../../../services/helpers';
import { dropDownArrow } from '../../../../../../../styles/img/icons';
import types from '../../../../../../../redux/types';
import { paymentWindowUrlSelector } from '../../../../../../../redux/wallets/selectors';
import { payPalSystem, payonerSystem } from './utils';

export const PaymentSystemForm = ({ spot }) => {
  const translatePath = 'Wallets.Spot.CryptoDeposit.Form';
  const systemDefaultValue = L.translate(
    `${translatePath}.payment_system_default`,
  );

  const dispatch = useDispatch();
  const paymentWindowUrl = useSelector(paymentWindowUrlSelector);

  const [showPaymentList, setShowPaymentList] = useState(false);

  const [currentSystem, setCurrentSystem] = useState(systemDefaultValue);
  const [currentSystemError, setCurrentSystemError] = useState(false);

  const [amount, setAmount] = useState('');
  const [amountError, setAmountError] = useState(false);

  const handleCurrentSystemChange = systemName => {
    setCurrentSystem(systemName);
    setShowPaymentList(false);

    if (currentSystemError) setCurrentSystemError(false);
  };

  const handleAmountChange = e => {
    const { value } = e.target;

    if (amountValidation(8, 8)(value)) {
      setAmount(value);
      setAmountError(false);
    }
    if (Number(value) === 0 || value === '') {
      setAmountError(true);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();

    const isSystemDefault = currentSystem === systemDefaultValue;

    if (!amount || isSystemDefault) {
      if (isSystemDefault) setCurrentSystemError(true);
      if (!amount) setAmountError(true);
      return;
    }
    if (amountError || currentSystemError) return;

    if (currentSystem === payPalSystem) {
      const body = {
        amount,
        asset_id: spot?.asset?.id,
        transfer_asset_id: null, // This key need when we are depositing gold. In other cases this key in unnecessary.
      };
      dispatch({ type: types.SEND_PAY_PAL_DEPOSIT_REQUEST_START, body });
    } else if (currentSystem === payonerSystem) {
      alert('Payoner request.');
    }
  };

  useEffect(() => {
    setCurrentSystem(systemDefaultValue);
  }, [systemDefaultValue]);

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
              <div className="custom-select active country-select-wrap">
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
