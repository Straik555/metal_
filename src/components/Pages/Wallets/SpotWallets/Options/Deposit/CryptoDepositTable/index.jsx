import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import L from 'i18n-react';
import types from '../../../../../../../redux/types';
import NothingToShow from '../../../../../../Base/NothingToShow';
import Pagination from '../../../../../../Base/Pagination';
import CryptoDepositItem from './CryptoDepositItem';
import { walletSelector } from '../../../../../../../redux/wallets/selectors';

const CryptoDepositTable = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const wallets = useSelector(walletSelector);
  const recentDepositHistory = wallets?.recentDepositHistory;
  const id = wallets.spot[params.code]?.id;
  const [current_page, setCurrentPage] = useState(1);
  const [per_page, setPerPage] = useState(10);

  const paramsCrypt = params.code !== 'gold' && params.code !== 'usd' && params.code !== 'eur'

  const handlePage = v => {
    setCurrentPage(v);
  };

  useEffect(() => {
    dispatch({
      type: types.GET_WALLETS_DEPOSITS_START,
      query: `${id}?current_page=${current_page}&per_page=${per_page}`,
    });
  }, [id, current_page, per_page]);
  return (
    <div className="account-table account-table--mt">
      <p className="section-title">
        {L.translate('Wallets.Spot.CryptoDeposit.recent_deposit_history')}
      </p>
      <div className="table-box scroll_table">
        {recentDepositHistory ? (
          <>
            <table className="page-table page-table--history-table page-table--sm-transform">
              <thead>
                <tr>
                  <td>
                    <div className="td-title td-title--uppercase">
                      {L.translate('Wallets.date_time')}
                    </div>
                  </td>
                  <td className="td-center">
                    <div className="td-title td-title--uppercase">
                      {L.translate('Wallets.status')}
                    </div>
                  </td>
                  <td className="">
                    <div className="td-title td-title--uppercase">
                      {L.translate('Wallets.coin')}
                    </div>
                  </td>
                  <td className="td-center">
                    <div className="td-title td-title--uppercase">
                      {L.translate('Wallets.amount')}
                    </div>
                  </td>
                  <td className="">
                    <span className="td-title td-title--uppercase">
                      {L.translate('Wallets.information')}
                    </span>
                  </td>
                  { paramsCrypt &&
                      <td>
                        <div className="td-title td-title--uppercase">
                          {L.translate(`Wallets.Spot.CryptoWithdraw.table.th_hash`)}
                        </div>
                      </td>
                  }
                </tr>
              </thead>
              <tbody>
                {recentDepositHistory.data.length ? (
                  recentDepositHistory.data.map((item, id) => (
                    <CryptoDepositItem key={id} item={item} params={paramsCrypt ? true : false}/>
                  ))
                ) : (
                  <NothingToShow colSpan={paramsCrypt ? 6 : 5} />
                )}
              </tbody>
            </table>
            {recentDepositHistory.data.length &&
            +recentDepositHistory.last_page > 1 &&
            current_page ? (
              <Pagination
                pageCount={recentDepositHistory.last_page}
                forcePage={current_page - 1}
                onPageChange={handlePage}
              />
            ) : (
              ''
            )}
          </>
        ) : (
          ''
        )}
      </div>
    </div>
  );
};

export default CryptoDepositTable;
