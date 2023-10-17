import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import L from 'i18n-react';
import LoaderTable from '../../../../Base/Loader/LoaderTable';
import Pagination from '../../../../Base/Pagination';
import NothingToShow from '../../../../Base/NothingToShow';
import TransferItem from './TransferItem';
import types from '../../../../../redux/types';
import {
  loadingWalletSelector,
  transferHistoryWalletSelector,
} from '../../../../../redux/wallets/selectors';

const TransferTable = () => {
  const dispatch = useDispatch();
  const loading = useSelector(loadingWalletSelector);
  const transferHistory = useSelector(transferHistoryWalletSelector);
  const [current_page, setCurrentPage] = useState(1);
  const [per_page, setPerPage] = useState(10);

  const handlePage = v => {
    setCurrentPage(v);
  };
  useEffect(() => {
    dispatch({
      type: types.GET_WALLETS_TRANSFER_START,
      body: {
        params: {
          current_page,
          per_page,
        },
      },
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
                {L.translate('Wallets.from')}
              </span>
            </td>
            <td className="td-center">
              <span className="td-title td-title--uppercase">
                {L.translate('Wallets.to')}
              </span>
            </td>
          </tr>
        </thead>
        {(loading && <LoaderTable colSpan={5} />) || (
          <tbody>
            {transferHistory?.data.length ? (
              transferHistory?.data.map(item => (
                <TransferItem key={`${item.id}-${item.asset_id}`} item={item} />
              ))
            ) : (
              <NothingToShow colSpan={5} />
            )}
          </tbody>
        )}
      </table>
      {+transferHistory?.last_page > 1 ? (
        <Pagination
          pageCount={transferHistory?.last_page}
          forcePage={current_page - 1}
          onPageChange={handlePage}
        />
      ) : (
        ''
      )}
    </>
  );
};

export default TransferTable;
