import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import L from 'i18n-react';
import types from '../../../../../redux/types';
import {
  statusText,
  checkType,
  transformData,
  numberWithCommasNotDot,
  numberWithCommas,
  toCrop,
} from '../../../../../services/helpers';
import { downloadInvoice } from '../../../../Base/Invoice';

const TransactionHistoryItem = ({ item, query }) => {
  const dispatch = useDispatch();
  const [onMessage, setOnMessage] = useState(false);
  const [onDownloadInwoice, setOnDownloadInvoice] = useState(false);
  const [onClosed, setOnClosed] = useState(false);

  const download = () => {
    if (item) {
      downloadInvoice({ data: item, userData: item.user_data });
    }
  };

  const handleClosed = () => {
    dispatch({
      type: types.DELETE_WITHDRAWAL_DEPOSIT_START,
      body: {
        params: {
          asset_type: item.asset.type === 'fiat' ? 'fiat' : 'crypto',
          request_id: item.id,
        },
      },
      query,
    });
  };

  const logicRenderAndClosed = ({ type, status, assetType }) => {
    switch (true) {
      case assetType === 'fiat':
        switch (type) {
          case 'input':
            switch (status) {
              case 'completed':
                setOnClosed(false);
                setOnDownloadInvoice(true);
                setOnMessage(false);
                return true;
              case 'waiting':
                setOnClosed(true);
                setOnDownloadInvoice(true);
                setOnMessage(false);
                return true;
              case 'canceled':
                setOnClosed(false);
                setOnDownloadInvoice(false);
                setOnMessage(true);
                return true;
              default:
                setOnClosed(false);
                setOnDownloadInvoice(false);
                setOnMessage(false);
                return false;
            }
          case 'output':
            switch (status) {
              case 'completed':
                setOnClosed(false);
                setOnDownloadInvoice(false);
                setOnMessage(false);
                return true;
              case 'waiting':
                setOnClosed(true);
                setOnDownloadInvoice(false);
                setOnMessage(false);
                return true;
              case 'canceled':
                setOnClosed(false);
                setOnDownloadInvoice(false);
                setOnMessage(true);
                return true;
              default:
                setOnClosed(false);
                setOnDownloadInvoice(false);
                setOnMessage(false);
                return false;
            }
          default:
            return false;
        }
      case assetType === 'crypto' || assetType === 'token':
        switch (type) {
          case 'input':
            switch (status) {
              case 'confirmed':
                setOnClosed(false);
                setOnDownloadInvoice(false);
                setOnMessage(false);
                return true;
              case 'unconfirmed':
                setOnClosed(false);
                setOnDownloadInvoice(false);
                setOnMessage(false);
                return true;
              default:
                setOnDownloadInvoice(false);
                setOnMessage(false);
                return false;
            }
          case 'output':
            switch (status) {
              case 'pending':
                setOnClosed(true);
                setOnDownloadInvoice(false);
                setOnMessage(false);
                return true;
              case 'processed':
                setOnClosed(false);
                setOnDownloadInvoice(false);
                setOnMessage(false);
                return true;
              case 'canceled':
                setOnClosed(false);
                setOnDownloadInvoice(false);
                setOnMessage(false);
                return true;
              case 'rejected':
                setOnClosed(false);
                setOnDownloadInvoice(false);
                setOnMessage(false);
                return true;
              case 'in_progress':
                setOnClosed(false);
                setOnDownloadInvoice(false);
                setOnMessage(false);
                return true;
              case 'in progress':
                setOnClosed(false);
                setOnDownloadInvoice(false);
                setOnMessage(false);
                return true;
              default:
                setOnClosed(false);
                setOnDownloadInvoice(false);
                setOnMessage(false);
                return false;
            }
          default:
            setOnClosed(false);
            setOnDownloadInvoice(false);
            setOnMessage(false);
            return false;
        }

      default:
        setOnClosed(false);
        setOnDownloadInvoice(false);
        setOnMessage(false);
        return false;
    }
  };

  useEffect(() => {
    logicRenderAndClosed({
      type: item.transaction_type,
      status: item.status,
      assetType: item.asset.type,
    });
  }, []);

  return (
    <tr data-tr="Transaction 1">
      <td data-label={L.translate('Wallets.date_time')}>
        <p>{transformData(item.created_at)}</p>
      </td>
      <td className="td-center" data-label={L.translate('Wallets.type')}>
        <p>{checkType(item.transaction_type)}</p>
      </td>
      <td className="td-center" data-label={L.translate('Wallets.currency')}>
        <p>{item.asset.code.toUpperCase()}</p>
      </td>
      <td className="td-center" data-label={L.translate('Wallets.qty')}>
        <p>{numberWithCommas(item.amount)}</p>
      </td>
      <td className="td-center" data-label={L.translate('Wallets.fee')}>
        <p>{item.fee}</p>
      </td>
      <td className="td-center" data-label={L.translate('Wallets.status')}>
        <div className="table-status-block">
          <p>{statusText(item.status)}</p>
          {/* {onDownloadInwoice && (
            <button type="button" className="table-link" onClick={download}>
              download invoice
            </button>
          )} */}
        </div>
      </td>
      <td className="td-center" data-label={L.translate('Wallets.action')}>
        <div className="table-action ">
          {onDownloadInwoice && (
            <button
              type="button"
              className="table-action__circle-btn"
              onClick={download}
            >
              <svg
                width="10"
                height="12"
                viewBox="0 0 10 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.04982 1.41687H2.1166C1.85582 1.41687 1.60571 1.52047 1.4213 1.70487C1.2369 1.88928 1.1333 2.13939 1.1333 2.40017V10.2666C1.1333 10.5274 1.2369 10.7775 1.4213 10.9619C1.60571 11.1463 1.85582 11.2499 2.1166 11.2499H8.01643C8.27722 11.2499 8.52732 11.1463 8.71173 10.9619C8.89613 10.7775 8.99973 10.5274 8.99973 10.2666V4.36678L6.04982 1.41687Z"
                  stroke="#05D395"
                  strokeWidth="0.983304"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M6.05005 1.41687V4.36678H8.99996"
                  stroke="#05D395"
                  strokeWidth="0.983304"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M7.03331 6.82507H3.1001"
                  stroke="#05D395"
                  strokeWidth="0.983304"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M7.03331 8.79163H3.1001"
                  stroke="#05D395"
                  strokeWidth="0.983304"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M4.0834 4.8584H3.59175H3.1001"
                  stroke="#05D395"
                  strokeWidth="0.983304"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          )}
          {onClosed && (
            <button
              type="button"
              className="table-action__circle-btn"
              onClick={handleClosed}
            >
              <svg
                width="8"
                height="8"
                viewBox="0 0 8 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.919633 7.84993C0.81881 7.94731 0.683773 8.0012 0.543608 7.99998C0.403443 7.99876 0.269363 7.94254 0.170248 7.84341C0.0711321 7.74429 0.0149107 7.6102 0.0136927 7.47003C0.0124747 7.32985 0.0663574 7.19481 0.163736 7.09398L3.25094 4.00657L0.163201 0.91916C0.112143 0.869843 0.0714175 0.810851 0.0434007 0.745625C0.0153838 0.6804 0.000636992 0.610247 2.01842e-05 0.539261C-0.000596624 0.468275 0.0129291 0.397878 0.0398083 0.332176C0.0666874 0.266473 0.106382 0.206782 0.156575 0.156585C0.206768 0.106389 0.266455 0.0666924 0.332153 0.0398111C0.397851 0.0129304 0.468244 -0.000597 0.539226 1.95503e-05C0.610207 0.000636578 0.680355 0.0153852 0.745576 0.0434036C0.810797 0.0714226 0.869785 0.112151 0.919098 0.163212L4.00684 3.25062L7.09404 0.163212C7.19486 0.0658278 7.3299 0.0119414 7.47006 0.0131593C7.61023 0.0143776 7.74431 0.0706019 7.84343 0.169724C7.94254 0.268847 7.99876 0.402935 7.99998 0.54311C8.0012 0.683284 7.94731 0.81833 7.84994 0.91916L4.76273 4.00657L7.84994 7.09398C7.94731 7.19481 8.0012 7.32985 7.99998 7.47003C7.99876 7.6102 7.94254 7.74429 7.84343 7.84341C7.74431 7.94254 7.61023 7.99876 7.47006 7.99998C7.3299 8.0012 7.19486 7.94731 7.09404 7.84993L4.00684 4.76252L0.919633 7.85046V7.84993Z"
                  fill="#05D395"
                />
              </svg>
            </button>
          )}
        </div>
      </td>
    </tr>
  );
};

export default TransactionHistoryItem;
