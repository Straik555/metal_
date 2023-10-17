import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import L from 'i18n-react';
import LastTrade from './LastTrade';
import types from '../../../../../redux/types';
import { toCrop, cropUsdt } from '../../../../../services/helpers';
import SocketOrderBook from '../../../../HOC/SocketOrderBook';
import { orderBookSpotSelector } from '../../../../../redux/trade/spot/selectors';
import { currentPairSelector } from '../../../../../redux/currentPair/selectors';

const OrderBook = () => {
  const dispatch = useDispatch();
  const tableRef = useRef({});
  const orderBook = useSelector(orderBookSpotSelector);
  const pair = useSelector(currentPairSelector);

  useEffect(() => {
    setTimeout(() => {
      if (!tableRef.current) return;
      tableRef.current.scrollTop = tableRef.current.scrollHeight;
    }, 1000);
  }, [pair]);

  useEffect(() => {
    dispatch({
      type: types.SPOT_GET_ORDER_BOOK_START,
      payload: {
        activePair: pair,
        limit: 100,
      },
    });
  }, [dispatch, pair]);

  const handleClick = payload => {
    dispatch({
      type: types.TEMPORARY_SELECTED_TRADE,
      payload,
    });
  };

  return (
    <>
      <SocketOrderBook />
      <div className="col-md-6  table-col">
        <div className="trade-table_wrap right">
          <table className="signle-table">
            <thead>
              <tr>
                <td>{L.translate('Trading.orderBook.price')}</td>
                <td>{L.translate('Trading.orderBook.amount')}</td>
                <td>{L.translate('Trading.orderBook.total')}</td>
              </tr>
            </thead>
          </table>
          <div
            ref={tableRef}
            className="market-table market-table--short-table"
          >
            <div className="table-srolll-box">
              <table className="trade-table trade-table--sell">
                <tbody>
                  {orderBook.ask ? (
                    orderBook.ask.map(({ id, price, quantity_left, total }) => (
                      <tr
                        key={id + total}
                        className="table_row change sell active"
                        onClick={() => {
                          handleClick({
                            id,
                            price,
                            total,
                            quantity: quantity_left,
                          });
                        }}
                      >
                        <td className="red">
                          <span>{cropUsdt(pair, price)}</span>
                        </td>
                        <td>
                          <span>{toCrop(8)(quantity_left)}</span>
                        </td>
                        <td className="text-right">
                          <span>{total}</span>
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
                </tbody>
              </table>
            </div>
          </div>

          {orderBook.ask ? (
            <LastTrade />
          ) : (
            <div className="middle-str">
              <p>{L.translate('Global.nothing')}</p>
            </div>
          )}

          <div className="market-table market-table--short-table">
            <table className="trade-table trade-table--buy">
              <tbody>
                {orderBook.bid ? (
                  orderBook.bid.map(({ id, price, quantity_left, total }) => (
                    <tr
                      key={id + total}
                      className="table_row change sell active"
                      onClick={() => {
                        handleClick({
                          id,
                          price,
                          total,
                          quantity: quantity_left,
                        });
                      }}
                    >
                      <td className="green">
                        <span>{cropUsdt(pair, price)}</span>
                      </td>
                      <td>
                        <span>{toCrop(8)(quantity_left)}</span>
                      </td>
                      <td className="text-right">
                        <span>{total}</span>
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
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderBook;
