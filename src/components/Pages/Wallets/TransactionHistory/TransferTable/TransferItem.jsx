import React, { useEffect, useState } from 'react';

import L from 'i18n-react';
import {
  transformData,
  toCrop,
  numberWithCommas,
} from '../../../../../services/helpers';

const setStatus = status => {
  switch (status) {
    case 'dividend':
      return L.translate('Wallets.Airdrop.airdrop');
    case 'spot':
      return L.translate('Wallets.spot');
    default:
      return '-';
  }
};
const TransferItem = ({ item }) => {
  return (
    <tr data-tr="Transaction 1">
      <td data-label={L.translate('Wallets.date_time')}>
        <p>{transformData(item.created_at)}</p>
      </td>

      <td className="td-center" data-label={L.translate('Wallets.currency')}>
        <p>{item.asset_code.toUpperCase()}</p>
      </td>
      <td className="td-center" data-label={L.translate('Wallets.qty')}>
        <p>{numberWithCommas(toCrop(8)(item.amount))}</p>
      </td>
      <td className="td-center" data-label="From">
        <p>{setStatus(item.from)}</p>
      </td>
      <td className="td-center" data-label="To">
        <p>{setStatus(item.to)}</p>
      </td>
    </tr>
  );
};

export default TransferItem;
