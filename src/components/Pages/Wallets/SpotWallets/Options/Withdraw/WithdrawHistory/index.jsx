/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import L from 'i18n-react';
import { useDispatch, useSelector } from 'react-redux';
import { walletSelector } from '../../../../../../../redux/wallets/selectors';
import Pagination from '../../../../../../Base/Pagination';
import types from '../../../../../../../redux/types';
import { HistoryItemTR } from './HistoryItemTR';
import { useParams } from 'react-router-dom';
import NothingToShow from '../../../../../../Base/NothingToShow';

export const WithdrawHistory = ({ perPage }) => {
  const dispatch = useDispatch();
  const params = useParams();
  const wallets = useSelector(walletSelector);
  const recentWithdrawHistory = wallets?.recentWithdrawHistory;
  const [currentPage, setCurrentPage] = useState(1);
  const id = wallets.spot[params.code]?.id;

  const paramsCrypt = params.code !== 'gold' && params.code !== 'usd' && params.code !== 'eur'
  const translatePath = 'Wallets.Spot.CryptoWithdraw.table';

  const handlePageChange = nextPage => {
    setCurrentPage(nextPage);
    const query = `${id}?current_page=${nextPage}&per_page=${perPage}`;
    dispatch({
      type: types.GET_WALLETS_WITHDRAWALS_START,
      query,
    });
  };

  useEffect(() => {
    if(id !== undefined){
      const query = `${id}?per_page=${perPage}`;
      dispatch({
        type: types.GET_WALLETS_WITHDRAWALS_START,
        query,
      });
    }
  }, [dispatch, perPage, id]);

  return (
    <div className="account-table account-table--mt">
      <p className="section-title">{L.translate(`${translatePath}.heading`)}</p>
      <div className="table-box scroll_table">
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
                  {L.translate(`${translatePath}.th_coin`)}
                </div>
              </td>
              <td>
                <div className="td-title td-title--uppercase">
                  {L.translate(`${translatePath}.th_amount`)}
                </div>
              </td>
              {paramsCrypt ?
                 (
                   <>
                     <td>
                       <div className="td-title td-title--uppercase">
                         {L.translate(`${translatePath}.th_address`)}
                       </div>
                     </td>
                     <td>
                       <div className="td-title td-title--uppercase">
                         {L.translate(`${translatePath}.th_hash`)}
                       </div>
                     </td>
                   </>
                ) : null
              }
              {/* commented because there are no information to show. */}
              {/* <td>
                  <span className="td-title td-title--uppercase">
                    {L.translate(`${translatePath}.th_information`)}
                  </span>
                </td> */}
            </tr>
          </thead>
          <tbody>
          {recentWithdrawHistory.data && recentWithdrawHistory.data.length ? recentWithdrawHistory.data.map((item, index) => (
            <HistoryItemTR
              key={item.id}
              item={item}
              itemNo={index + 1}
              params={paramsCrypt ? true : false}
            />
          )) : (
            <NothingToShow colSpan={paramsCrypt ? 7 : 5} />
          )}
          </tbody>
        </table>
        {
          recentWithdrawHistory.data &&
        +recentWithdrawHistory.last_page > 1 &&
        currentPage ? (
          <Pagination
            pageCount={recentWithdrawHistory.last_page}
            forcePage={currentPage - 1}
            onPageChange={handlePageChange}
          />
        ) : (
          ''
        )}
      </div>
    </div>
  );
};
