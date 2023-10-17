/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import L from 'i18n-react';
import { useDispatch, useSelector } from 'react-redux';
import types from '../../../../../../../redux/types';
import { amountValidation } from '../../../../../../../services/helpers';
import { currentAssetFeesSelector } from '../../../../../../../redux/fees/selectors';

export const WithdrawCoinForm = ({ spot, perPage }) => {
  const dispatch = useDispatch();
  const assetComissions = useSelector(currentAssetFeesSelector);

  const [address, setAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [adressError, setAdressError] = useState(false);
  const [amountError, setAmountError] = useState(false);
  const [amountSumError, setAmountSumError] = useState(false);

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

    if (!address || !amount) {
      if (!address) setAdressError(true);
      if (!amount) setAmountError(true);
      return;
    }
    if (adressError || amountError || amountSumError) return;

    const body = {
      wallet_id: spot.id,
      address,
      amount,
    };

    // teamplate for btc testing
    // const body = {
    //   wallet_id: spot?.id,
    //   amount,
    //   address: 'n1aYsc9sRw7f1ejwr2PLEngMcqkDvEVjDa',
    // };

    dispatch({
      type: types.POST_CREATE_WITHDRAWAL_REQUEST_START,
      body,
      query: `?per_page=${perPage}`,
    });

    setAddress('');
    setAmount('');
    setAdressError(false);
    setAmountError(false);
  };

  const translatePath = 'Wallets.Spot.CryptoWithdraw.form';

  useEffect(() => {
    const assetID = spot?.asset?.id;

    if (assetID === undefined) return;
    dispatch({
      type: types.GET_ASSET_FEES_START,
      assetID,
    });
  }, [dispatch, spot]);

  return (
    <div className="col-lg-4">
      <div className="operation-form-wrap">
        <form onSubmit={handleSubmit} className="operation-form">
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
