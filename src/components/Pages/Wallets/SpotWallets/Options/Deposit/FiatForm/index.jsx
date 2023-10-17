import React, { useCallback, useEffect, useState } from 'react';
import L from 'i18n-react';
import { infoIcon } from './icons';
import { expiryDatePatternTest, expiryDateValidator } from './utils';

// This component has been created, but has been not used.
// You can use it if necessarry.
export const FiatForm = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [cardNumberError, setCardNumberError] = useState(false);

  const [name, setName] = useState('');
  const [nameError, setNameError] = useState(false);

  const [expiryDate, setExpiryDate] = useState('');
  const [expiryDateError, setExpiryDateError] = useState(false);

  const [cvv, setCvv] = useState('');
  const [cvvError, setCvvError] = useState(false);

  const [submitError, setSubmitError] = useState(false);
  const [isFormTouched, setIsFormTouched] = useState(false);

  const translatePath = 'Wallets.Spot.FiatDepositForm';

  const cardNumberHandler = useCallback(
    e => {
      if (!isFormTouched) setIsFormTouched(true);
      const { value } = e.target;
      if (value.length > 16) return;

      if (value === '') {
        setCardNumber(value);
        setCardNumberError(true);
        return;
      }
      if (/^[0-9]+$/i.test(value)) {
        setCardNumber(value);
      }
      setCardNumberError(value.length !== 16);
    },
    [isFormTouched],
  );

  const nameHandler = useCallback(
    e => {
      if (!isFormTouched) setIsFormTouched(true);
      const { value } = e.target;
      if (value === '') {
        setName(value);
        setNameError(true);
        return;
      }
      if (/^[a-z\s]+$/i.test(value)) {
        setName(value.toUpperCase());
        setNameError(false);
      }
    },
    [isFormTouched],
  );

  const expiryDateHandler = useCallback(
    e => {
      if (!isFormTouched) setIsFormTouched(true);
      const { value } = e.target;
      if (value === '') {
        setExpiryDate(value);
        setExpiryDateError(true);
        return;
      }
      if (value.length > 5 || !expiryDatePatternTest(value)) return;
      if (value.length === 3 && value[2] !== '/') return;

      const isValid = expiryDateValidator(value);

      setExpiryDate(value);
      setExpiryDateError(!isValid);
    },
    [isFormTouched],
  );

  const cvvHandler = useCallback(
    e => {
      if (!isFormTouched) setIsFormTouched(true);
      const { value } = e.target;
      if (value.length > 3) return;
      if (value === '') {
        setCvv(value);
        setCvvError(true);
        return;
      }
      const number = Number(value);
      if (Number.isInteger(number) && number > 0) {
        setCvv(value);
      }
      const isInvalid = value.length !== 3;
      setCvvError(isInvalid);
    },
    [isFormTouched],
  );

  const sumbitHandler = useCallback(
    e => {
      e.preventDefault();
      if (submitError) return;

      alert('submit');
    },
    [submitError],
  );

  useEffect(() => {
    const isError = cardNumberError || nameError || expiryDateError || cvvError;
    const isOneOfFieldsEmpty = [cardNumber, name, expiryDate, cvv].some(
      f => f === '',
    );

    if (isError || isOneOfFieldsEmpty) {
      setSubmitError(true);
    } else {
      setSubmitError(false);
    }
  }, [
    cardNumberError,
    nameError,
    expiryDateError,
    cvvError,
    cardNumber,
    name,
    expiryDate,
    cvv,
  ]);

  return (
    <div className="row operation-row operation-row--type2">
      <div className="col-lg-6">
        <form className="deposit-form-wrap" onSubmit={sumbitHandler}>
          <h4 className="deposit-form-title">
            {L.translate(`${translatePath}.form_title`)}
          </h4>
          <div className="deposit-form-content-wrap">
            <div className="deposit-note-wrap">
              <span className="deposit-info-icon-wrap">{infoIcon}</span>
              <span className="required_field">* </span>
              <span>{L.translate(`${translatePath}.form_note`)}</span>
            </div>
            <div className="field">
              <p className="field-label field-label--type2">
                {L.translate(`${translatePath}.card_label`)}
                <span className="required_field"> *</span>
              </p>
              <div className="field-wrap">
                <input
                  type="text"
                  className="form-item"
                  placeholder="XXXXXXXXXXXXXXXX"
                  name="quantity"
                  onChange={cardNumberHandler}
                  value={cardNumber}
                />
                {cardNumberError && (
                  <div className="error-text">
                    <p className="error-text__item">
                      {L.translate(`${translatePath}.card_error`)}
                    </p>
                  </div>
                )}
              </div>
            </div>
            <div className="field">
              <p className="field-label field-label--type2">
                {L.translate(`${translatePath}.cardholder_label`)}
                <span className="required_field"> *</span>
              </p>
              <div className="field-wrap">
                <input
                  type="text"
                  className="form-item"
                  placeholder={L.translate(
                    `${translatePath}.cardholder_placeholder`,
                  )}
                  name="quantity"
                  onChange={nameHandler}
                  value={name}
                />
                {nameError && (
                  <div className="error-text">
                    <p className="error-text__item">
                      {L.translate(`${translatePath}.cardholder_error`)}
                    </p>
                  </div>
                )}
              </div>
            </div>
            <div style={{ display: 'flex' }}>
              <div className="col-lg-6" style={{ padding: '0 12px 0 0' }}>
                <div className="field">
                  <p className="field-label field-label--type2">
                    {L.translate(`${translatePath}.expiry_label`)}
                    <span className="required_field"> *</span>
                  </p>
                  <div className="field-wrap">
                    <input
                      type="text"
                      className="form-item"
                      placeholder="mm/yy"
                      name="quantity"
                      onChange={expiryDateHandler}
                      value={expiryDate}
                    />
                    {expiryDateError && (
                      <div className="error-text">
                        <p className="error-text__item">
                          {L.translate(`${translatePath}.expiry_error`)}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="col-lg-6" style={{ padding: '0 0 0 12px' }}>
                <div className="field">
                  <p className="field-label field-label--type2">
                    {L.translate(`${translatePath}.cvv_label`)}
                    <span className="required_field"> *</span>
                  </p>
                  <div className="field-wrap">
                    <input
                      type="password"
                      className="form-item"
                      placeholder={L.translate(
                        `${translatePath}.cvv_placeholder`,
                      )}
                      name="quantity"
                      onChange={cvvHandler}
                      value={cvv}
                    />
                    {cvvError && (
                      <div className="error-text">
                        <p className="error-text__item">
                          {L.translate(`${translatePath}.cvv_error`)}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="deposit-submit-wrap">
              <div className="operation-form__submit">
                <button type="submit" className="page-btn">
                  {L.translate(`${translatePath}.submit_btn`)}
                </button>
                {isFormTouched && submitError && (
                  <div className="error-text">
                    <p className="error-text__item">
                      {L.translate(`${translatePath}.sumbit_error`)}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
