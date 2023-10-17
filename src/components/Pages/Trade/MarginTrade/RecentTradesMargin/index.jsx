import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import L from 'i18n-react';
import LowRiskIndicator from './LowRiskIndicator';
import types from '../../../../../redux/types';
import {
  cropUsdt,
  toCrop,
  transformData,
} from '../../../../../services/helpers';
import SocketTrades from '../../../../HOC/SocketTrades';
import { currentPairSelector } from '../../../../../redux/currentPair/selectors';
import { recentTradesSpotSelector } from '../../../../../redux/trade/spot/selectors';

const RecentTrades = () => {
  const dispatch = useDispatch();
  const recentTrades = useSelector(recentTradesSpotSelector);
  const currentPair = useSelector(currentPairSelector);

  useEffect(() => {
    dispatch({
      type: types.SPOT_GET_RECENT_TRADES_START,
      payload: {
        activePair: currentPair,
        params: {
          limit: 100,
        },
      },
    });
  }, [dispatch, currentPair]);

  const handleClick = payload => {
    dispatch({
      type: types.TEMPORARY_SELECTED_TRADE,
      payload,
    });
  };

  return (
    <>
      <SocketTrades />
      <div className="col-md-6 table-col table-col--right right-table">
        <div className="market-panel">
          <p className="market-text">
            {L.translate('Trading.recentTrade.recent_trades', {
              pair: currentPair.replace('_', '/').toUpperCase(),
            })}
          </p>
        </div>

        <div className="trade-table_wrap trade-table_wrap--margin">
          <table className="signle-table signle-table--main">
            <thead>
              <tr>
                <td>{L.translate('Trading.recentTrade.price')}</td>
                <td>{L.translate('Trading.orderBook.amount')}</td>
                <td>{L.translate('Trading.recentTrade.date_time')}</td>
              </tr>
            </thead>
          </table>
          <div className="trade-table_wrap">
            <div className="market-table market-table--for-main market-table--for-main--margin">
              <table className="trade-table">
                <tbody>
                  {recentTrades.length ? (
                    recentTrades.map(
                      ({ id, type, price, quantity, created_at }) => (
                        <tr
                          key={id}
                          className="table_row"
                          onClick={() => {
                            handleClick({ id, price, quantity });
                          }}
                        >
                          <td className={type === 'sell' ? 'red' : 'green'}>
                            <span>{cropUsdt(currentPair, price)}</span>
                          </td>
                          <td className={type === 'sell' ? 'red' : 'green'}>
                            <span>{toCrop(8)(quantity)}</span>
                          </td>
                          <td className="text-right">
                            <span>{transformData(created_at)}</span>
                          </td>
                        </tr>
                      ),
                    )
                  ) : (
                    <tr className="table_title" data-label-tr="Trade 1">
                      <td className="text-center" colSpan={3}>
                        {L.translate('Global.nothing')}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <LowRiskIndicator />
          </div>
        </div>
      </div>
    </>
  );
};

export default RecentTrades;
