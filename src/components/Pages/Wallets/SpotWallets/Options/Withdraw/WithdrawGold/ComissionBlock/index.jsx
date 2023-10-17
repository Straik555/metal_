/* eslint-disable react/prop-types */
import React from 'react';
import L from 'i18n-react';

export const ComissionBlock = ({ deliveryPrice, comission, rate }) => {
  const translatePath = 'Wallets.Spot.CryptoWithdraw.withdraw_gold';
  const formattedTotal = Number(deliveryPrice + comission).toFixed(2);

  return (
    <div className="form-total-block">
      <div className="form-total">
        <p className="form-total__name">
          {L.translate(`${translatePath}.delivery_price`)}
        </p>
        <p className="form-total__value">{deliveryPrice} EUR</p>
      </div>
      <div className="form-total">
        <p className="form-total__name">
          {L.translate(`${translatePath}.comission`)}
        </p>
        <p className="form-total__value">{comission} EUR</p>
      </div>
      <div className="form-total">
        <p className="form-total__name">
          {L.translate(`${translatePath}.total`)}
        </p>
        <p className="form-total__value">{formattedTotal} EUR</p>
      </div>
      <div className="form-total">
        <p className="form-total__name">
          {L.translate(`${translatePath}.gold_rate`)}
        </p>
        <p className="form-total__value">1 gold = {rate} EUR </p>
      </div>
    </div>
  );
};
