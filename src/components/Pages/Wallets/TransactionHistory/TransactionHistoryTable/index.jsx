import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import L from 'i18n-react';
import LoaderTable from '../../../../Base/Loader/LoaderTable';
import Pagination from '../../../../Base/Pagination';
import NothingToShow from '../../../../Base/NothingToShow';
import TransactionHistoryItem from './TransactionHistoryItem';
import types from '../../../../../redux/types';
import {
  loadingWalletSelector,
  walletSelector,
} from '../../../../../redux/wallets/selectors';

const TransactionHistoryTable = () => {
  const dispatch = useDispatch();
  const wallets = useSelector(walletSelector);
  const loading = useSelector(loadingWalletSelector);
  const transactionHistory = wallets?.transactionHistory;
  const [current_page, setCurrentPage] = useState(1);
  const [per_page, setPerPage] = useState(10);
  console.log('trans', transactionHistory)
  const handlePage = v => {
    setCurrentPage(v);
  };
  const query = `?current_page=${current_page}&per_page=${per_page}`;
  useEffect(() => {
    dispatch({
      type: types.GET_WALLETS_TRANSACTIONS_START,
      query,
    });
  }, [current_page, per_page]);
  return (
    <>
      <table className="page-table page-table--sm-transform">
        <thead>
          <tr>
            <td>
              <span className="td-title td-title--uppercase">
                {L.translate('Wallets.date_time')}
              </span>
            </td>
            <td className="td-center">
              <span className="td-title td-title--uppercase">
                {L.translate('Wallets.type')}
              </span>
            </td>
            <td className="td-center">
              <span className="td-title td-title--uppercase">
                {L.translate('Wallets.currency')}
              </span>
            </td>
            <td className="td-center">
              <span className="td-title td-title--uppercase">
                {L.translate('Wallets.amount')}
              </span>
            </td>
            <td className="td-center">
              <span className="td-title td-title--uppercase">
                {L.translate('Wallets.fee')}
              </span>
            </td>
            <td className="td-center">
              <span className="td-title td-title--uppercase">
                {L.translate('Wallets.status')}
              </span>
            </td>
            <td className="td-center">
              <span className="td-title td-title--uppercase">
                {L.translate('Wallets.action')}
              </span>
            </td>
          </tr>
        </thead>
        {(loading && <LoaderTable colSpan={7} />) || (
          <tbody>
            {transactionHistory?.data.length ? (
              transactionHistory?.data.map(item => (
                <TransactionHistoryItem
                  key={`${item.id}-${item.asset.id}`}
                  item={item}
                  query={query}
                />
              ))
            ) : (
              <NothingToShow colSpan={7} />
            )}
          </tbody>
        )}
      </table>
      {+transactionHistory?.last_page > 1 ? (
        <Pagination
          pageCount={transactionHistory?.last_page}
          forcePage={current_page - 1}
          onPageChange={handlePage}
        />
      ) : (
        ''
      )}
    </>
  );
};

export default TransactionHistoryTable;
