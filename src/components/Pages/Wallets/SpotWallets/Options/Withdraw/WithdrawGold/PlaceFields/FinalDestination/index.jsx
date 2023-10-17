/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import L from 'i18n-react';
import { CommonFields } from '../CommonFields';
import { checkIsOnlyLetters } from '../../../../../../../../../services/helpers';

export const FinalDestination = ({
  setAdress,
  setAdressError,
  submitEvent,
  setSubmitEvent,
}) => {
  const [country, setCountry] = useState('');
  const [countryError, setCountryError] = useState(false);
  const [commonFields, setCommonFields] = useState('');

  const translatePath = 'Wallets.Spot.CryptoWithdraw.withdraw_gold';

  const countryHandler = e => {
    const { value } = e.target;
    setCountry(value);

    if (!checkIsOnlyLetters(value, 3)) {
      setCountryError(true);
      setAdressError(true);
      return;
    }
    setCountryError(false);
    setAdressError(false);
  };

  useEffect(() => {
    // Concatenating fields + Country
    const totalAdress = `Country: ${country}, ${commonFields}`;
    setAdress(totalAdress);

    // In case user have choose other delivery way we nedd to catch up "conponentWillUnmount" stage & clear current adress
    return () => {
      setAdress('');
    };
  }, [commonFields, setAdress, country]);

  useEffect(() => {
    if (submitEvent) {
      setCountry('');
      setCommonFields('');
    }
  }, [submitEvent]);

  return (
    <>
      <div className="field">
        <p className="field-label field-label--type2 request-form__label">
          {L.translate(`${translatePath}.country`)}
          <span className="required_field"> *</span>
        </p>
        <div className="field-wrap">
          <input
            type="text"
            className="form-item"
            placeholder={L.translate(`${translatePath}.country`)}
            value={country}
            onChange={countryHandler}
            maxLength={60}
          />
          {countryError && (
            <div className="error-text">
              <p className="error-text__item">
                {L.translate(`${translatePath}.country_error`)}
              </p>
            </div>
          )}
        </div>
      </div>
      <CommonFields
        setCommonFields={setCommonFields}
        setAdressError={setAdressError}
        submitEvent={submitEvent}
        setSubmitEvent={setSubmitEvent}
      />
    </>
  );
};
