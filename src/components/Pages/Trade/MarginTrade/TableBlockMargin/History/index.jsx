import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import L from 'i18n-react';
import DatePicker from 'react-datepicker';
import types from '../../../../../../redux/types';
import {
  cropUsdt,
  toCrop,
  transformData,
} from '../../../../../../services/helpers';
import SocketClosedOrdersMargin from '../../../../../HOC/SocketClosedOrdersMargin';
import { assetPairsSelector } from '../../../../../../redux/pairs/selectors';
import { historyMarginSelector } from '../../../../../../redux/trade/margin/selectors';
import { currentPairSelector } from '../../../../../../redux/currentPair/selectors';

const marketType = {
  sell: ['red', L.translate('Trading.tableBlock.sell')],
  market_sell: ['red', L.translate('Trading.tableBlock.sell')],
  buy: ['green', L.translate('Trading.tableBlock.buy')],
  market_buy: ['green', L.translate('Trading.tableBlock.buy')],
};

const PERIOD = ['1 Day', '1 Week', '1 Month', '3 Months'];

const getType = type =>
  type?.includes('market')
    ? L.translate('Trading.tableBlock.market')
    : L.translate('Trading.tableBlock.limit');

const History = () => {
  const dispatch = useDispatch();
  const assetPairs = useSelector(assetPairsSelector);
  const history = useSelector(historyMarginSelector);
  const currentPair = useSelector(currentPairSelector);

  const [period, setPeriod] = useState(null);

  const [pairDrop, setPairDrop] = useState(false);
  const [sideDrop, setSideDrop] = useState(false);
  const handlePairClick = () => {
    setPairDrop(!pairDrop);
  };
  const handleSideClick = () => {
    setSideDrop(!sideDrop);
  };

  const [pair, setPair] = useState('all');
  const [side, setSide] = useState('all');
  const handleSelectPair = e => {
    setPair(e.currentTarget.value);
    setPairDrop(!pairDrop);
  };
  const handleSelectSide = e => {
    setSide(e.currentTarget.value);
    setSideDrop(!sideDrop);
  };
  const handleBlurSide = () => {
    setTimeout(() => {
      setSideDrop(false);
    }, 200);
  };
  const handleBlurPair = () => {
    setTimeout(() => {
      setPairDrop(false);
    }, 200);
  };

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const handleChandeStartDate = value => {
    setStartDate(value);
    setPeriod(null);
  };
  const handleChandeEndDate = value => {
    setEndDate(value);
    setPeriod(null);
  };

  const handleSearch = () => {
    dispatch({
      type: types.MARGIN_GET_ORDERS_HISTORY_START,
      payload: {
        params: {
          per_page: 20,
          start_date: moment(startDate).format('YYYY-MM-DD'),
          end_date: moment(endDate).format('YYYY-MM-DD'),
          pair: pair === 'all' ? null : pair,
          side: side === 'all' ? null : side,
        },
      },
    });
  };

  useEffect(() => {
    dispatch({
      type: types.MARGIN_GET_ORDERS_HISTORY_START,
      payload: {
        params: {
          per_page: 20,
          period: period === null ? null : period + 1,
          pair: pair === 'all' ? null : pair,
          side: side === 'all' ? null : side,
        },
      },
    });
  }, [dispatch, currentPair, period, pair, side]);

  const CalendarInput = ({ value, onClick }) => (
    <input
      value={value}
      onClick={onClick}
      type="text"
      className="form-item"
      placeholder="YYYY-MM-DD"
      readOnly
    />
  );

  return (
    <div className="bottom-part__table">
      <SocketClosedOrdersMargin />
      <div className="date-filter">
        <div className="date-tab">
          {PERIOD.map((element, index) => (
            <button
              key={element}
              onClick={() => {
                setPeriod(index);
              }}
              className={
                period === index ? 'date-tab__item active' : 'date-tab__item'
              }
              type="button"
            >
              {element}
            </button>
          ))}
        </div>
        <div className="date-form date-filter__form">
          <div className="date-form__field">
            <DatePicker
              selected={startDate}
              onChange={handleChandeStartDate}
              maxDate={new Date()}
              dateFormat="yyyy-MM-dd"
              customInput={<CalendarInput />}
            />
          </div>
          <div className="date-form__field">
            <DatePicker
              selected={endDate}
              onChange={handleChandeEndDate}
              maxDate={new Date()}
              dateFormat="yyyy-MM-dd"
              customInput={<CalendarInput />}
            />
          </div>
          <button
            className="date-form__btn"
            type="button"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
      </div>

      <div className="market-table market-table--bottom-table market-table--below-date">
        <table className="trade-table trade-table--bottom">
          <thead>
            <tr>
              <td>{L.translate('Trading.tableBlock.date_time')}</td>
              <td>
                <div className="td-drop active">
                  <button
                    className="td-drop-btn"
                    type="button"
                    onClick={handlePairClick}
                    onBlur={handleBlurPair}
                  >
                    {L.translate('Trading.tableBlock.pair')}
                    <span className="td-drop-btn__icon">
                      <svg
                        width={6}
                        height={3}
                        viewBox="0 0 6 3"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1 0.375L3 2.375L5 0.375"
                          stroke="#838383"
                          strokeWidth="0.666667"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </button>

                  {pairDrop && (
                    <ul className="td-drop__list">
                      <li>
                        <button
                          type="button"
                          value="all"
                          onClick={handleSelectPair}
                        >
                          All
                        </button>
                      </li>

                      {!!assetPairs?.length &&
                        assetPairs.map(({ code }) => (
                          <li key={code}>
                            <button
                              type="button"
                              value={code}
                              onClick={handleSelectPair}
                            >
                              {code.replace('_', '/').toUpperCase()}
                            </button>
                          </li>
                        ))}
                    </ul>
                  )}
                </div>
              </td>
              <td>{L.translate('Trading.tableBlock.type')}</td>
              <td>
                <div className="td-drop active">
                  <button
                    className="td-drop-btn"
                    type="button"
                    onClick={handleSideClick}
                    onBlur={handleBlurSide}
                  >
                    {L.translate('Trading.tableBlock.side')}
                    <span className="td-drop-btn__icon">
                      <svg
                        width={6}
                        height={3}
                        viewBox="0 0 6 3"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1 0.375L3 2.375L5 0.375"
                          stroke="#838383"
                          strokeWidth="0.666667"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </button>

                  {sideDrop && (
                    <ul className="td-drop__list">
                      <li>
                        <button
                          type="button"
                          value="all"
                          onClick={handleSelectSide}
                        >
                          All
                        </button>
                      </li>
                      <li>
                        <button
                          type="button"
                          value="buy"
                          onClick={handleSelectSide}
                        >
                          Buy
                        </button>
                      </li>
                      <li>
                        <button
                          type="button"
                          value="sell"
                          onClick={handleSelectSide}
                        >
                          Sell
                        </button>
                      </li>
                    </ul>
                  )}
                </div>
              </td>
              <td>{L.translate('Trading.tableBlock.average')}</td>
              <td>{L.translate('Trading.tableBlock.price')}</td>
              <td>{L.translate('Trading.tableBlock.amount')}</td>
              <td>{L.translate('Trading.tableBlock.filled')}</td>
              <td>{L.translate('Trading.tableBlock.total')}</td>
              <td>{L.translate('Trading.tableBlock.status')}</td>
            </tr>
          </thead>

          <tbody>
            {!history?.length ? (
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
              history.map(data => (
                <tr key={data?.id} className="table_row change">
                  <td>{transformData(data?.created_at)}</td>
                  <td>{data?.pair?.replace('_', '/')?.toUpperCase()}</td>
                  <td>
                    {data?.trigger_conditions
                      ? 'Stop-Limit'
                      : getType(data?.type)}
                  </td>
                  <td
                    className={
                      marketType[data?.type] ? marketType[data?.type][0] : null
                    }
                  >
                    {marketType[data?.type] ? marketType[data?.type][1] : '-'}
                  </td>
                  <td>{toCrop(8)(data?.average)}</td>
                  <td>{cropUsdt(currentPair, data?.price || data?.average)}</td>
                  <td>{toCrop(8)(data?.quantity)}</td>
                  <td>{data?.filled}</td>
                  <td>{toCrop(8)(data?.total)}</td>
                  <td>{data?.status}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default History;
