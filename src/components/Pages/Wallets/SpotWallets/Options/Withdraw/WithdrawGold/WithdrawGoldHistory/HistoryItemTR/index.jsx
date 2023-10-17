/* eslint-disable react/prop-types */
import React from 'react';
import L from 'i18n-react';
import { transformData } from '../../../../../../../../../services/helpers';

export const HistoryItemTR = ({ item, itemNo }) => {
  const translatePath = 'Wallets.Spot.CryptoWithdraw.withdraw_gold.Gold_table';
  const {
    created_at: createdAt,
    status,
    quantity,
    delivery_sum: deliveryPrice,
    recipient_name: recipientName,
    fee: comission,
    address,
  } = item;
  const nomalizedComission = Number(deliveryPrice + comission).toFixed(2);
  return (
    <tr data-tr={itemNo}>
      <td data-label={L.translate(`${translatePath}.item_date_time`)}>
        <p>{transformData(createdAt)}</p>
      </td>
      <td data-label={L.translate(`${translatePath}.item_status`)}>
        <p>{status}</p>
      </td>
      <td data-label={L.translate(`${translatePath}.item_quantity`)}>
        <p>{quantity} grams</p>
      </td>
      <td data-label={L.translate(`${translatePath}.item_total_comission`)}>
        <p>{nomalizedComission} EUR</p>
      </td>
      <td data-label={L.translate(`${translatePath}.item_name`)}>
        <p>{recipientName}</p>
      </td>
      <td data-label={L.translate(`${translatePath}.item_adress`)}>
        <p>{address}</p>
      </td>
    </tr>
  );
};
