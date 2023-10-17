import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import L from 'i18n-react';
import { FixedSizeList as List } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';

import types from '../../../../../redux/types';
import {
  cropUsdt,
  toCrop,
  transformData,
  numberWithCommas,
} from '../../../../../services/helpers';
import SocketTrades from '../../../../HOC/SocketTrades';
import { recentTradesSpotSelector } from '../../../../../redux/trade/spot/selectors';
import { currentPairSelector } from '../../../../../redux/currentPair/selectors';
import { storeCurentDecimal } from '../../../../../redux/decimals/selectors';
import { languageSelector } from '../../../../../redux/lng/selectors';

const RecentTrades = () => {
  const dispatch = useDispatch();
  const recentTrades = useSelector(recentTradesSpotSelector);
  const decimal = useSelector(storeCurentDecimal);
  const currentPair = useSelector(currentPairSelector);
  const rowRef = useRef();
  const tableRef = useRef();
  const language = useSelector(languageSelector); // need to update language

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

  const Row = ({ index }) => (
    <tr
      ref={rowRef}
      key={`recent_trades-${recentTrades[index]?.id}`}
      className="table_row"
      onClick={() => {
        handleClick({
          id: recentTrades[index]?.taker_order_id,
          price: recentTrades[index]?.price,
          quantity: recentTrades[index]?.quantity,
        });
      }}
    >
      <td className={recentTrades[index]?.type === 'sell' ? 'red' : 'green'}>
        {/* <span>{cropUsdt(currentPair, price)}</span> */}
        <span>{toCrop(decimal)(recentTrades[index]?.price)}</span>
      </td>
      <td className={recentTrades[index]?.type === 'sell' ? 'red' : 'green'}>
        <span>{toCrop(8)(recentTrades[index]?.quantity)}</span>
      </td>
      <td className="text-right">
        <span>{transformData(recentTrades[index]?.created_at)}</span>
      </td>
    </tr>
  );
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
                <td>{`${L.translate(
                  'Trading.recentTrade.price',
                )} (${currentPair.split('_')[1].toUpperCase()})`}</td>
                <td>{`${L.translate(
                  'Trading.orderBook.amount',
                )} (${currentPair.split('_')[0].toUpperCase()})`}</td>
                <td>{L.translate('Trading.recentTrade.date_time')}</td>
              </tr>
            </thead>
          </table>
          <div className="trade-table_wrap">
            <div className="market-table market-table--for-main">
              {/* <AutoSizer>
                {({ height, width }) => ( */}
              <table ref={tableRef} className="trade-table">
                <tbody>
                  {/* <List
                        height={tableRef?.current?.clientHeight || 329}
                        itemCount={recentTrades.length}
                        itemSize={rowRef?.current?.clientHeight || 19}
                        width={width}
                      > */}
                  {recentTrades.length ? (
                    recentTrades.map(item => (
                      <tr
                        key={`recent_trades-${item?.id}`}
                        className="table_row"
                        onClick={() => {
                          handleClick({
                            id: item.taker_order_id,
                            price: item.price,
                            quantity: item.quantity,
                          });
                        }}
                      >
                        <td className={item.type === 'sell' ? 'red' : 'green'}>
                          <span>
                            {numberWithCommas(toCrop(decimal)(item.price))}
                          </span>
                        </td>
                        <td className={item.type === 'sell' ? 'red' : 'green'}>
                          <span>
                            {numberWithCommas(toCrop(8)(item.quantity))}
                          </span>
                        </td>
                        <td className="text-right">
                          <span>{transformData(item.created_at)}</span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr className="table_title" data-label-tr="Trade 1">
                      <td className="text-center" colSpan={3}>
                        {L.translate('Global.nothing')}
                      </td>
                    </tr>
                  )}
                  {/* {Row}
                      </List> */}
                </tbody>
              </table>
              {/* </AutoSizer> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default React.memo(RecentTrades);
