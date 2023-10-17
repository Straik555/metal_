/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import L from 'i18n-react';
import {
  checkIsOnlyLetters,
  postalCodeValidatior,
} from '../../../../../../../../../services/helpers';

const fieldsErrosInit = {
  city: false,
  street: false,
};
const roomAndHouseRegexp = /^([0-9]{1,6}[a-z]{0,3}[/-]{0,1})+$/i;

export const CommonFields = ({
  setCommonFields,
  setAdressError,
  submitEvent,
  setSubmitEvent,
}) => {
  const [letterFields, setLetterFields] = useState({ city: '', street: '' });
  const [letterFieldsErrors, setLetterFieldsErrors] = useState(fieldsErrosInit);

  const [house, setHouse] = useState('');
  const [houseError, setHouseError] = useState(false);

  const [code, setCode] = useState('');
  const [codeError, setCodeError] = useState(false);

  const [room, setRoom] = useState('');
  const [roomError, setRoomError] = useState(false);

  const translatePath = 'Wallets.Spot.CryptoWithdraw.withdraw_gold';

  const roomHandler = e => {
    const { value } = e.target;
    if (value === '') {
      setRoom('');
      setRoomError(false);
      return;
    }

    setRoom(value);
    if (!roomAndHouseRegexp.test(value)) {
      setRoomError(true);
      return;
    }
    setRoomError(false);
  };

  const codeHandler = e => {
    const { value } = e.target;
    setCode(value);

    if (!postalCodeValidatior(value)) {
      setCodeError(true);
      return;
    }
    setCodeError(false);
  };

  const houseHandler = e => {
    const { value } = e.target;

    setHouse(value);

    if (!roomAndHouseRegexp.test(value)) {
      setHouseError(true);
      return;
    }
    setHouseError(false);
  };

  const letterFieldsHandler = e => {
    const { name, value } = e.target;
    setLetterFields(prev => ({ ...prev, [name]: value }));

    if (!checkIsOnlyLetters(value, 3)) {
      setLetterFieldsErrors(prev => ({ ...prev, [name]: true }));
      return;
    }
    setLetterFieldsErrors(prev => ({ ...prev, [name]: false }));
  };

  useEffect(() => {
    // Concatenating fields
    const { city, street } = letterFields;
    const str = ` City: ${city}, Street: ${street}, House: ${house}, Postal code: ${code}, Room: ${
      room || 'Not added'
    }`;
    setCommonFields(str);

    // No need to catch "componentWillUnmount" stage, because "setCommonFields" is first parent func, and parent has own "componentWillUnmountStage"
  }, [letterFields, house, code, room, setCommonFields]);

  useEffect(() => {
    const { city, street } = letterFieldsErrors;
    const isError = [city, street, houseError, codeError, roomError].some(
      e => e === true,
    );
    const isOneOfRequiredFieldsEmpty = [
      ...Object.values(letterFields),
      house,
      code,
    ].some(f => f === '');

    if (isError || isOneOfRequiredFieldsEmpty) setAdressError(true);
    else setAdressError(false);
  }, [
    code,
    house,
    letterFields,
    letterFieldsErrors,
    houseError,
    codeError,
    roomError,
    setAdressError,
  ]);

  useEffect(() => {
    if (submitEvent) {
      setLetterFields({ city: '', street: '' });
      setHouse('');
      setCode('');
      setRoom('');
      setSubmitEvent(false);
    }
  }, [submitEvent, setSubmitEvent]);

  return (
    <>
      <div className="field">
        <p className="field-label field-label--type2 request-form__label">
          {L.translate(`${translatePath}.city`)}
          <span className="required_field"> *</span>
        </p>
        <div className="field-wrap">
          <input
            name="city"
            type="text"
            className="form-item"
            placeholder={L.translate(`${translatePath}.city`)}
            value={letterFields.city}
            onChange={letterFieldsHandler}
            maxLength={170}
          />
          {letterFieldsErrors.city && (
            <div className="error-text">
              <p className="error-text__item">
                {L.translate(`${translatePath}.city_error`)}
              </p>
            </div>
          )}
        </div>
      </div>
      <div className="field">
        <p className="field-label field-label--type2 request-form__label">
          {L.translate(`${translatePath}.street`)}
          <span className="required_field"> *</span>
        </p>
        <div className="field-wrap">
          <input
            name="street"
            type="text"
            className="form-item"
            placeholder={L.translate(`${translatePath}.street`)}
            value={letterFields.street}
            onChange={letterFieldsHandler}
            maxLength={125}
          />
          {letterFieldsErrors.street && (
            <div className="error-text">
              <p className="error-text__item">
                {L.translate(`${translatePath}.street_error`)}
              </p>
            </div>
          )}
        </div>
      </div>
      <div className="field">
        <p className="field-label field-label--type2 request-form__label">
          {L.translate(`${translatePath}.house`)}
          <span className="required_field"> *</span>
        </p>
        <div className="field-wrap">
          <input
            type="text"
            className="form-item"
            placeholder={L.translate(`${translatePath}.house`)}
            value={house}
            onChange={houseHandler}
            maxLength={20}
          />
          {houseError && (
            <div className="error-text">
              <p className="error-text__item">
                {L.translate(`${translatePath}.house_error`)}
              </p>
            </div>
          )}
        </div>
      </div>
      <div className="field">
        <p className="field-label field-label--type2 request-form__label">
          {L.translate(`${translatePath}.postal_code`)}
          <span className="required_field"> *</span>
        </p>
        <div className="field-wrap">
          <input
            type="text"
            className="form-item"
            placeholder={L.translate(`${translatePath}.postal_code`)}
            value={code}
            onChange={codeHandler}
            maxLength={20}
          />
          {codeError && (
            <div className="error-text">
              <p className="error-text__item">
                {L.translate(`${translatePath}.postal_code_error`)}
              </p>
            </div>
          )}
        </div>
      </div>
      <div className="field">
        <p className="field-label field-label--type2 request-form__label">
          {L.translate(`${translatePath}.room`)}
        </p>
        <div className="field-wrap">
          <input
            type="text"
            className="form-item"
            placeholder={L.translate(`${translatePath}.room`)}
            value={room}
            onChange={roomHandler}
            maxLength={20}
          />
          {roomError && (
            <div className="error-text">
              <p className="error-text__item">
                {L.translate(`${translatePath}.room_error`)}
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
