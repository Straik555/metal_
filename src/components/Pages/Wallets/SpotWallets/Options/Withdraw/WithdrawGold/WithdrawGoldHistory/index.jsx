/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import L from 'i18n-react';
import { useDispatch, useSelector } from 'react-redux';
import { recentGoldWithdrawHistoryWalletSelector } from '../../../../../../../../redux/wallets/selectors';
import Pagination from '../../../../../../../Base/Pagination';
import types from '../../../../../../../../redux/types';
import { HistoryItemTR } from './HistoryItemTR';

export const WithdrawGoldHistory = ({ perPage }) => {
  const dispatch = useDispatch();
  const withdrawHistory = useSelector(recentGoldWithdrawHistoryWalletSelector);
  const [currentPage, setCurrentPage] = useState(1);

  const translatePath = 'Wallets.Spot.CryptoWithdraw.withdraw_gold.Gold_table';

  const handlePageChange = nextPage => {
    setCurrentPage(nextPage);

    const query = `?current_page=${nextPage}&per_page=${perPage}`;
    dispatch({
      type: types.GET_WITHDRAWAL_GOLD_REQUEST_HISTORY_START,
      query,
    });
  };

  useEffect(() => {
    const query = `?per_page=${perPage}`;
    dispatch({
      type: types.GET_WITHDRAWAL_GOLD_REQUEST_HISTORY_START,
      query,
    });
  }, [dispatch, perPage]);

  return (
    <div className="account-table account-table--mt">
      <p className="section-title">{L.translate(`${translatePath}.heading`)}</p>
      <div className="table-box">
        <table className="page-table page-table--history-table page-table--sm-transform">
          <thead>
            <tr>
              <td>
                <div className="td-title td-title--uppercase">
                  {L.translate(`${translatePath}.th_date_time`)}
                </div>
              </td>
              <td>
                <div className="td-title td-title--uppercase">
                  {L.translate(`${translatePath}.th_status`)}
                </div>
              </td>
              <td>
                <div className="td-title td-title--uppercase">
                  {L.translate(`${translatePath}.th_quantity`)}
                </div>
              </td>
              <td>
                <div className="td-title td-title--uppercase">
                  {L.translate(`${translatePath}.th_total_comission`)}
                </div>
              </td>
              <td>
                <div className="td-title td-title--uppercase">
                  {L.translate(`${translatePath}.th_name`)}
                </div>
              </td>
              <td>
                <div className="td-title td-title--uppercase">
                  {L.translate(`${translatePath}.th_adress`)}
                </div>
              </td>
            </tr>
          </thead>
          <tbody>
            {withdrawHistory?.data?.map((item, index) => (
              <HistoryItemTR key={item.id} item={item} itemNo={index + 1} />
            ))}
          </tbody>
        </table>
        <Pagination
          pageCount={withdrawHistory.last_page}
          forcePage={currentPage - 1}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};
