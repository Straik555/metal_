import React from 'react';
import L from 'i18n-react';
import {
  statusText,
  toCrop,
  transformData,
  numberWithCommas,
} from '../../../../../../../services/helpers';

const CryptoDepositItem = ({ item, params }) => {
  return (
    <tr data-tr={`History: ${item.created_at}`}>
      <td className="" data-label={L.translate('Wallets.date_time')}>
        <p>{transformData(item.created_at)}</p>
      </td>
      <td className="td-center" data-label={L.translate('Wallets.status')}>
        <p>{statusText(item.status)}</p>
      </td>
      <td data-label={L.translate('Wallets.coin')}>
        <div className="table-coin">
          <div className="table-coin__img">
            <img src={item.asset.img_path} alt="" />
          </div>
          <p className="table-coin__name">{item.asset.code.toUpperCase()}</p>
          <a href="#" className="table-coin__link table-coin__link--type2">
            {item.asset.name}
          </a>
        </div>
      </td>
      <td className="td-center" data-label={L.translate('Wallets.amount')}>
        <p>{numberWithCommas(toCrop(8)(item.amount))}</p>
      </td>
      <td className="" data-label={L.translate('Wallets.information')}>
        {
          item.comment && item.comment.length && (
            <p>{item?.comment}</p>
          )
        }
      </td>
      {
        params &&
            <td data-label={L.translate(`Wallets.Spot.CryptoWithdraw.table.item_amount`)}>
              {
                item.hash && <p>{item.hash}</p>
              }
            </td>
      }
    </tr>
  );
};

export default CryptoDepositItem;
