/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import L from 'i18n-react';
import { CommonFields } from '../CommonFields';

export const SwissCountry = ({
  setAdress,
  setAdressError,
  submitEvent,
  setSubmitEvent,
}) => {
  const [commonFields, setCommonFields] = useState('');

  const translatePath = 'Wallets.Spot.CryptoWithdraw.withdraw_gold';

  useEffect(() => {
    // Concatenating fields + Country
    const totalAdress = `Country: Switzerland, ${commonFields}`;
    setAdress(totalAdress);

    // In case user have choose other delivery way we nedd to catch up "conponentWillUnmount" stage & clear current adress
    return () => setAdress('');
  }, [commonFields, setAdress]);

  useEffect(() => {
    if (submitEvent) {
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
            value="Switzerland"
            className="form-item"
            readOnly
          />
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
