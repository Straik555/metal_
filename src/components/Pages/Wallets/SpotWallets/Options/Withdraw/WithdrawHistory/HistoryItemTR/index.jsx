/* eslint-disable react/prop-types */
import React from 'react';
import L from 'i18n-react';
import { transformData } from '../../../../../../../../services/helpers';

export const HistoryItemTR = ({ item, itemNo, params}) => {
  const translatePath = 'Wallets.Spot.CryptoWithdraw.table';
  return (
    <tr data-tr={`${L.translate(`${translatePath}.item_heading`)} ${itemNo}`}>
      <td data-label={L.translate(`${translatePath}.item_date_time`)}>
        <p>{transformData(item.created_at)}</p>
      </td>
      <td data-label={L.translate(`${translatePath}.item_status`)}>
        <p>{item.status}</p>
      </td>
      <td data-label={L.translate(`${translatePath}.item_coin`)}>
        <div className="table-coin">
          <div className="table-coin__img">
            <img src={item.asset.img_path} alt="some icon" />
          </div>
          <p className="table-coin__name">{item.asset.code.toUpperCase()}</p>
          <a href="#" className="table-coin__link table-coin__link--type2">
            {item.asset.name}
          </a>
        </div>
      </td>
      <td data-label={L.translate(`${translatePath}.item_amount`)}>
        <p>{item.amount}</p>
      </td>
      {
        params &&(
          <>
            <td>
              <p>{item.address}</p>
            </td>
            <td data-label={L.translate(`${translatePath}.item_amount`)}>
              {
                item.tx_hash && <p>{item.tx_hash}</p>
              }
            </td>
          </>
        )
      }

      {/* <td data-label={L.translate(`${translatePath}.item_information`)}>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </td> */}
    </tr>
  );
};
