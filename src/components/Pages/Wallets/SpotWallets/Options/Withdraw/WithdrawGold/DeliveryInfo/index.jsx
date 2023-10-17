/* eslint-disable react/jsx-no-comment-textnodes */
import React from 'react';
import L from 'i18n-react';

export const DeliveryInfo = () => {
  const translatePath =
    'Wallets.Spot.CryptoWithdraw.withdraw_gold.DeliveryInfo';
  return (
    <div className="col-lg-6">
      <div className="request-info">
        <p className="request-info__title">
          {L.translate(`${translatePath}.limit_title`)}
        </p>
        <div className="request-info__text request-info__text--bold">
          {L.translate(`${translatePath}.limit_info`)}
        </div>
        <p className="request-info__subtitle">
          {L.translate(`${translatePath}.delivery_price_note`)}
        </p>
        <div className="request-info__text">
          <p>
            <span className="request-info__text-line">//// </span>
            {L.translate(`${translatePath}.airport_delivery`)}
          </p>
          {L.translate(`${translatePath}.airport_info`)}
        </div>
        <div className="request-info__text">
          <p>
            <span className="request-info__text-line">//// </span>{' '}
            {L.translate(`${translatePath}.own_adress`)}
          </p>
          <p>{L.translate(`${translatePath}.own_adress_note_1`)}</p>
          <p>{L.translate(`${translatePath}.own_adress_note_2`)}</p>
          <p>{L.translate(`${translatePath}.own_adress_note_3`)}</p>
        </div>
        <div className="request-info__text">
          <p>
            <span className="request-info__text-line">//// </span>
            {L.translate(`${translatePath}.swiss_delivery_info`)}
          </p>
        </div>
      </div>
    </div>
  );
};
