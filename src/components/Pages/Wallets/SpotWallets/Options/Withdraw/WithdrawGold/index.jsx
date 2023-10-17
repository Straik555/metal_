/* eslint-disable react/prop-types */
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import L from 'i18n-react';
import { useDispatch, useSelector } from 'react-redux';
import PhoneInput from 'react-phone-input-2';
import { DeliveryInfo } from './DeliveryInfo';
import types from '../../../../../../../redux/types';
import {
  emailValid,
  checkIsOnlyLetters,
  formatBalance,
} from '../../../../../../../services/helpers';
import { ComissionBlock } from './ComissionBlock';
import { PictureField } from './PictureField';
import {
  chooseCorrectFields,
  calculateAmountCommission,
  getCommissionOfPlace,
  places,
  commentMaxLength,
} from './utils';
import { instanceExchangeRateSelector } from '../../../../../../../redux/bankTransfer/exchange/selectors';
import { Heading } from '../Heading';
import { WithdrawGoldHistory } from './WithdrawGoldHistory';
import { currentAssetFeesSelector } from '../../../../../../../redux/fees/selectors';

const errorsInitialState = {
  quantity: false,
  quantitySumError: false,
  name: false,
  email: false,
  phone: false,
};

export const WithdrawGold = ({ spot, perPage, eurSpot, code }) => {
  const dispatch = useDispatch();
  const rate = useSelector(instanceExchangeRateSelector);
  const assetComissions = useSelector(currentAssetFeesSelector);

  const [quantity, setQuantity] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [srcBase64, setSrcBase64] = useState('');
  const [adress, setAdress] = useState('');
  const [comment, setComment] = useState('');
  const [commentCounter, setCommentCounter] = useState(commentMaxLength);
  const [deliveryPlace, setDeliveryPlace] = useState(places.FINAL_DESTINATION);

  const [photoError, setPhotoError] = useState(false);
  const [errors, setErrors] = useState(errorsInitialState);
  const [adressError, setAdressError] = useState(false);

  const [submitEvent, setSubmitEvent] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  const translatePath = 'Wallets.Spot.CryptoWithdraw.withdraw_gold';
  const formattedBalance = formatBalance(spot?.balance, code);

  const deliveryPrice = useMemo(() => getCommissionOfPlace(deliveryPlace), [
    deliveryPlace,
  ]);
  const comission = useMemo(() => {
    if (assetComissions?.withdraw_fee === undefined) return 0;

    return calculateAmountCommission(
      quantity,
      rate,
      assetComissions?.withdraw_fee,
    );
  }, [quantity, rate, assetComissions]);

  // Handlers
  const handlePlaceChange = useCallback(e => {
    setDeliveryPlace(e.target.value);
    setAdressError(true);
  }, []);

  const emailHandler = useCallback(e => {
    const { value } = e.target;
    setEmail(value);
    if (!emailValid(value)) {
      setErrors(prev => ({ ...prev, email: true }));
      return;
    }
    setErrors(prev => ({ ...prev, email: false }));
  }, []);

  const nameHandler = useCallback(e => {
    const { value } = e.target;
    setName(value);

    if (!checkIsOnlyLetters(value)) {
      setErrors(prev => ({ ...prev, name: true }));
      return;
    }
    setErrors(prev => ({ ...prev, name: false }));
  }, []);

  const handleQuantity = useCallback(
    e => {
      const { value } = e.target;
      const number = Number(value.trim());
      if (Number.isInteger(number)) setQuantity(value);

      if (number === 0 || number % 100 !== 0) {
        setErrors(prev => ({ ...prev, quantity: true }));
        return;
      }

      if (number > Number(spot?.balance)) {
        setErrors(prev => ({ ...prev, quantitySumError: true }));
        return;
      }
      setErrors(prev => ({
        ...prev,
        quantity: false,
        quantitySumError: false,
      }));
    },
    [spot],
  );

  const handleComment = useCallback(e => {
    const { value } = e.target;
    setComment(value);
    setCommentCounter(commentMaxLength - value.length);
  }, []);

  const handleSubmit = () => {
    if (submitError) return;

    const clearForm = () => {
      setQuantity('');
      setName('');
      setEmail('');
      setPhone('');
      setSrcBase64('');
      setAdress('');
      setComment('');
      setPhotoError(false);
      setAdressError(false);
      setErrors(errorsInitialState);
      setCommentCounter(commentMaxLength);
      setSubmitEvent(true);
    };
    const body = {
      asset_id: spot?.asset?.id,
      quantity: Number(quantity),
      delivery_sum: deliveryPrice,
      fee: comission,
      recipient_email: email,
      recipient_phone: phone,
      recipient_name: name,
      delivery_method: deliveryPlace,
      image_file: srcBase64,
      balance_id: spot?.id,
      address: adress,
      comment,
    };

    dispatch({
      type: types.POST_CREATE_WITHDRAWAL_GOLD_REQUEST_START,
      body,
      clearForm,
    });
  };

  useEffect(() => {
    if (spot && eurSpot) {
      dispatch({
        type: types.EXCHANGE_RATE_START,
        payload: {
          from_asset_id: spot?.asset?.id,
          to_asset_id: eurSpot?.asset?.id,
        },
      });
    }
  }, [dispatch, eurSpot, spot]);

  useEffect(() => {
    const isError = [...Object.values(errors), adressError, photoError].some(
      e => e === true,
    );
    const isOneOfRequiredFieldsEmpty = [
      quantity,
      name,
      email,
      phone,
      srcBase64,
      adress,
    ].some(f => f === '');

    if (isError || isOneOfRequiredFieldsEmpty) setSubmitError(true);
    else setSubmitError(false);
  }, [
    errors,
    adressError,
    photoError,
    quantity,
    name,
    email,
    phone,
    srcBase64,
    adress,
  ]);

  useEffect(() => {
    const assetID = spot?.asset?.id;
    if (assetID === undefined) return;

    dispatch({
      type: types.GET_ASSET_FEES_START,
      assetID,
    });
  }, [dispatch, spot]);

  return (
    <div className="container">
      <Heading spotBalance={formattedBalance} currencyCode={code} />
      <div className="row justify-content-center">
        <div className="col-lg-6">
          <p className="section-title section-title--left">
            {L.translate(`${translatePath}.title`)}
          </p>
          <div className="request-form-block">
            <div className="request-form">
              <div className="field">
                <p className="field-label field-label--type2">
                  {L.translate(`${translatePath}.quantity`)}
                  <span className="required_field"> *</span>
                </p>
                <div className="field-wrap">
                  <input
                    type="text"
                    className="form-item"
                    placeholder={L.translate(`${translatePath}.quantity`)}
                    name="quantity"
                    onChange={handleQuantity}
                    value={quantity}
                    maxLength={15}
                  />
                  {errors.quantity && (
                    <div className="error-text">
                      <p className="error-text__item">
                        {L.translate(`${translatePath}.quantity_error`)}
                      </p>
                    </div>
                  )}
                  {errors.quantitySumError && (
                    <div className="error-text">
                      <p className="error-text__item">
                        {L.translate(`${translatePath}.quantity_sum_error`)}
                      </p>
                    </div>
                  )}
                </div>
              </div>
              <div className="field">
                <div className="modal-radio">
                  <input
                    type="radio"
                    name="delivery_place"
                    className="radio"
                    id="final_destination"
                    value={places.FINAL_DESTINATION}
                    onChange={handlePlaceChange}
                    checked={deliveryPlace === places.FINAL_DESTINATION}
                  />
                  <label htmlFor="final_destination">
                    {L.translate(`${translatePath}.final_destination`)}
                  </label>
                </div>
                <div className="modal-radio">
                  <input
                    type="radio"
                    name="delivery_place"
                    className="radio"
                    id="international_airport"
                    value={places.INTERNATIONAL_AIRPORT}
                    onChange={handlePlaceChange}
                  />
                  <label htmlFor="international_airport">
                    {L.translate(`${translatePath}.airport`)}
                  </label>
                </div>
                <div className="modal-radio">
                  <input
                    type="radio"
                    name="delivery_place"
                    className="radio"
                    id="swiss_country"
                    value={places.SWISS_COUNTRY}
                    onChange={handlePlaceChange}
                  />
                  <label htmlFor="swiss_country">
                    {L.translate(`${translatePath}.swiss_country`)}
                  </label>
                </div>
              </div>
              <ComissionBlock
                deliveryPrice={deliveryPrice}
                comission={comission}
                rate={rate}
              />
              {chooseCorrectFields(deliveryPlace, {
                setAdress,
                setAdressError,
                submitEvent,
                setSubmitEvent,
              })}
              <p className="request-form__title">
                {L.translate(`${translatePath}.form_subtitle`)}
              </p>
              <div className="field">
                <p className="field-label field-label--type2 request-form__label">
                  {L.translate(`${translatePath}.name`)}
                  <span className="required_field"> *</span>
                </p>
                <div className="field-wrap">
                  <input
                    type="text"
                    className="form-item"
                    placeholder={L.translate(`${translatePath}.name`)}
                    name="name"
                    value={name}
                    onChange={nameHandler}
                    maxLength={200}
                  />
                  {errors.name && (
                    <div className="error-text">
                      <p className="error-text__item">
                        {L.translate(`${translatePath}.name_error`)}
                      </p>
                    </div>
                  )}
                </div>
              </div>
              <div className="field">
                <p className="field-label field-label--type2 request-form__label">
                  {L.translate(`${translatePath}.email`)}
                  <span className="required_field"> *</span>
                </p>
                <div className="field-wrap">
                  <input
                    type="text"
                    className="form-item"
                    placeholder={L.translate(`${translatePath}.email`)}
                    value={email}
                    onChange={emailHandler}
                    maxLength={200}
                  />
                  {errors.email && (
                    <div className="error-text">
                      <p className="error-text__item">
                        {L.translate(`${translatePath}.email_error`)}
                      </p>
                    </div>
                  )}
                </div>
              </div>
              <div className="field">
                <p className="field-label field-label--type2 request-form__label">
                  {L.translate(`${translatePath}.phone`)}
                  <span className="required_field"> *</span>
                </p>
                <div className="field-wrap">
                  <PhoneInput
                    country="us"
                    value={phone}
                    onChange={value => setPhone(value)}
                  />
                </div>
              </div>
              <div className="field">
                <p className="field-label field-label--type2 request-form__label">
                  {L.translate(`${translatePath}.photo`)}
                  <span className="required_field"> *</span>
                </p>
                <div className="field-wrap">
                  <PictureField
                    srcBase64={srcBase64}
                    setSrcBase64={setSrcBase64}
                    setPhotoError={setPhotoError}
                    photoError={photoError}
                  />
                </div>
              </div>
              <div className="field">
                <p className="field-label field-label--type2 request-form__label">
                  {L.translate(`${translatePath}.comment`)}
                </p>
                <div className="field-wrap area-wrap">
                  <textarea
                    className="form-item form-item--area"
                    placeholder={L.translate(
                      `${translatePath}.comment_placeholder`,
                    )}
                    value={comment}
                    onChange={handleComment}
                    maxLength={commentMaxLength}
                  />
                  <span className="area-letters-counter">{commentCounter}</span>
                </div>
              </div>
              <div className="form-submit form-submit--type2">
                <button
                  type="button"
                  className="page-btn page-btn--full"
                  onClick={handleSubmit}
                  disabled={submitError}
                >
                  {L.translate(`${translatePath}.submit_btn`)}
                </button>
                {submitError && (
                  <div className="error-text">
                    <p className="error-text__item">
                      {L.translate(`${translatePath}.submit_btn_error`)}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <DeliveryInfo />
      </div>
      <WithdrawGoldHistory perPage={perPage} />
    </div>
  );
};
