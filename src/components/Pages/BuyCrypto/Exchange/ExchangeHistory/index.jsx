import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import L from 'i18n-react';
import LoaderTable from '../../../../Base/Loader/LoaderTable';
import types from '../../../../../redux/types';
import Pagination from '../../../../Base/Pagination';
import NothingToShow from '../../../../Base/NothingToShow';
import {
  exchangeHistorySelector,
  exchangeIsLoadingSelector,
} from '../../../../../redux/bankTransfer/exchange/selectors';
import {
  numberWithCommas,
  transformData,
} from '../../../../../services/helpers';

const ExchangeHistory = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const exchangesData = useSelector(exchangeHistorySelector);
  const loading = useSelector(exchangeIsLoadingSelector);

  const handlePage = nextPage => {
    setCurrentPage(nextPage);

    const query = `?current_page=${nextPage}`;
    dispatch({ type: types.GET_EXCHANGE_HISTORY_START, query });
  };

  useEffect(() => {
    dispatch({ type: types.GET_EXCHANGE_HISTORY_START });
  }, [dispatch]);
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-11">
          <p className="section-title">
            {L.translate('BuyCrypto.exchange_history')}
          </p>
          <div className="page-content">
            <div className="table-box">
              <table className="page-table page-table--sm-transform">
                <thead>
                  <tr>
                    <td>
                      <span className="td-title td-title--uppercase">
                        {L.translate('BuyCrypto.date_time')}
                      </span>
                    </td>
                    <td>
                      <span className="td-title td-title--uppercase">
                        {L.translate('BuyCrypto.pair')}
                      </span>
                    </td>
                    <td>
                      <span className="td-title td-title--uppercase">
                        {L.translate('BuyCrypto.rate')}
                      </span>
                    </td>
                    <td>
                      <span className="td-title td-title--uppercase">
                        {L.translate('BuyCrypto.amount')}
                      </span>
                    </td>
                    <td>
                      <span className="td-title td-title--uppercase">
                        {L.translate('BuyCrypto.fee')}
                      </span>
                    </td>
                    <td className="td-right">
                      <span className="td-title td-title--uppercase">
                        {L.translate('BuyCrypto.total')}
                      </span>
                    </td>
                  </tr>
                </thead>
                {(loading && <LoaderTable colSpan={6} />) || (
                  <tbody>
                    {exchangesData && exchangesData?.exchanges?.length ? (
                      exchangesData?.exchanges?.map((exchange, index) => (
                        <tr
                          data-tr={`History ${index + 1}`}
                          key={exchange.created_at}
                        >
                          <td data-label="Date & Time">
                            <span>{transformData(exchange?.created_at)}</span>
                          </td>
                          <td data-label="Pair">
                            <span>{`${exchange?.from_asset_code?.toUpperCase()}/${exchange?.to_asset_code?.toUpperCase()}`}</span>
                          </td>
                          <td data-label="Rate">
                            <span>{numberWithCommas(exchange?.rate)}</span>
                          </td>
                          <td data-label="Amount">
                            <span>{exchange?.quantity}</span>
                          </td>
                          <td data-label="Feee">
                            <span>{exchange?.fee}</span>
                          </td>
                          <td className="td-right" data-label="Total">
                            <span>{numberWithCommas(exchange?.amount)}</span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <NothingToShow colSpan={6} />
                    )}
                  </tbody>
                )}
              </table>
              {exchangesData?.exchanges?.length && (
                <Pagination
                  pageCount={exchangesData.last_page}
                  forcePage={currentPage - 1}
                  onPageChange={handlePage}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExchangeHistory;
