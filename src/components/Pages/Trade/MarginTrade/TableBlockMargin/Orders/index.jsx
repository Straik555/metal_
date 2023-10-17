import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import L from 'i18n-react';
import types from '../../../../../../redux/types';
import { cropNumber, transformData } from '../../../../../../services/helpers';
import SocketOpenOrdersMargin from '../../../../../HOC/SocketOpenOrdersMargin';
import CanсelAll from './CanсelAll';
import { ordersMarginSelector } from '../../../../../../redux/trade/margin/selectors';
import { currentPairSelector } from '../../../../../../redux/currentPair/selectors';

const marketType = {
  sell: ['red', L.translate('Trading.tableBlock.sell')],
  market_sell: ['red', L.translate('Trading.tableBlock.sell')],
  buy: ['green', L.translate('Trading.tableBlock.buy')],
  market_buy: ['green', L.translate('Trading.tableBlock.buy')],
};

const getType = type =>
  type?.includes('market')
    ? L.translate('Trading.tableBlock.market')
    : L.translate('Trading.tableBlock.limit');

const Order = () => {
  const dispatch = useDispatch();
  const orders = useSelector(ordersMarginSelector);
  const currentPair = useSelector(currentPairSelector);

  const handleCancelOrder = ({ target }) => {
    dispatch({
      type: types.MARGIN_CANCEL_OPEN_ORDER_START,
      payload: target.value,
    });
  };

  useEffect(() => {
    dispatch({
      type: types.MARGIN_GET_ORDERS_LIST_START,
      payload: {
        params: {
          per_page: 100,
        },
      },
    });
  }, [dispatch, currentPair]);

  return (
    <div className="bottom-part__table">
      <SocketOpenOrdersMargin />
      <div className="market-table market-table--bottom-table">
        <table className="trade-table trade-table--bottom trade-table--open-orders">
          <thead>
            <tr>
              <td>{L.translate('Trading.tableBlock.date')}</td>
              <td>{L.translate('Trading.tableBlock.pair')}</td>
              <td>{L.translate('Trading.tableBlock.type')}</td>
              <td>{L.translate('Trading.tableBlock.side')}</td>
              <td>{L.translate('Trading.tableBlock.price')}</td>
              <td>{L.translate('Trading.tableBlock.amount')}</td>
              <td>{L.translate('Trading.tableBlock.filled')}</td>
              <td>{L.translate('Trading.tableBlock.total')}</td>
              <td>{L.translate('Trading.tableBlock.trigger')}</td>
              <td className="td-center">
                <CanсelAll />
              </td>
            </tr>
          </thead>

          <tbody>
            {!orders?.length ? (
              <tr>
                <td
                  className="text-center"
                  colSpan={10}
                  style={{ textAlign: 'center' }}
                >
                  {L.translate('Global.nothing')}
                </td>
              </tr>
            ) : (
              orders.map(data => (
                <tr key={data?.id} className="table_row change">
                  <td>{transformData(data?.created_at)}</td>
                  <td>{data?.pair?.replace('_', '/')?.toUpperCase()}</td>
                  <td>
                    {data.trigger_conditions
                      ? 'Stop-Limit'
                      : getType(data?.type)}
                  </td>
                  <td
                    className={
                      marketType[data?.type] ? marketType[data?.type][0] : null
                    }
                  >
                    {marketType[data?.type] ? marketType[data?.type][1] : null}
                  </td>
                  <td>{cropNumber(data?.price || data?.average)}</td>
                  <td>{cropNumber(data?.quantity)}</td>
                  <td>{data?.filled}</td>
                  <td>{cropNumber(data?.total)}</td>
                  <td>
                    {data?.trigger_conditions
                      ? cropNumber(data?.trigger_conditions)
                      : null}
                  </td>
                  <td>
                    <button
                      type="button"
                      className="trade_act_btn"
                      value={data?.id}
                      onClick={handleCancelOrder}
                    >
                      {L.translate('Global.cancel')}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Order;
