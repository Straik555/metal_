import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import L from 'i18n-react';
import DatePicker from 'react-datepicker';
// import Pagination from '../../../../../Base/Pagination';
import types from '../../../../../../redux/types';
import * as helpers from '../../../../../../services/helpers';
import SocketClosedOrdersSpot from '../../../../../HOC/SocketClosedOrdersSpot';
import { historySpotSelector } from '../../../../../../redux/trade/spot/selectors';
import { assetPairsSelector } from '../../../../../../redux/pairs/selectors';
import { currentPairSelector } from '../../../../../../redux/currentPair/selectors';
import { storeDecimalPairs } from '../../../../../../redux/decimals/selectors';

const marketType = {
  sell: ['red', L.translate('Trading.tableBlock.sell')],
  market_sell: ['red', L.translate('Trading.tableBlock.sell')],
  buy: ['green', L.translate('Trading.tableBlock.buy')],
  market_buy: ['green', L.translate('Trading.tableBlock.buy')],
};

const PERIOD = [
  `1 ${L.translate('Trading.tableBlock.day')}`,
  `1 ${L.translate('Trading.tableBlock.week')}`,
  `1 ${L.translate('Trading.tableBlock.month')}`,
  `3 ${L.translate('Trading.tableBlock.months')}`,
];

const getStatus = status => {
  switch (status) {
    case 'filled':
      return L.translate('Trading.tableBlock.status_filled');
    case 'cancelled':
      return L.translate('Trading.tableBlock.status_canceled');
    default:
      break;
  }
};

const getType = type =>
  type?.includes('market')
    ? L.translate('Trading.tableBlock.market')
    : L.translate('Trading.tableBlock.limit');

const History = () => {
  const dispatch = useDispatch();
  const assetPairs = useSelector(assetPairsSelector);
  const { data } = useSelector(historySpotSelector);
  const currentPair = useSelector(currentPairSelector);
  const [period, setPeriod] = useState(null);
  const decimalPairs = useSelector(storeDecimalPairs);
  const getDecimals = code => {
    return decimalPairs[code];
  };
  // filters drop
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

  // calendar
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
      type: types.SPOT_GET_ORDERS_HISTORY_START,
      payload: {
        params: {
          per_page: 20,
          start_date: moment(startDate).format('YYYY-MM-DD'),
          end_date: moment(endDate).format('YYYY-MM-DD'),
          pair,
          side,
        },
      },
    });
  };

  useEffect(() => {
    dispatch({
      type: types.SPOT_GET_ORDERS_HISTORY_START,
      payload: {
        params: {
          per_page: 20,
          period: period === null ? null : period + 1,
          pair,
          side,
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
      {!period ? <SocketClosedOrdersSpot /> : ''}
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
            {L.translate('Trading.tableBlock.search')}
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
                          {L.translate('Trading.tableBlock.all')}
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
                          {L.translate('Trading.tableBlock.all')}
                        </button>
                      </li>
                      <li>
                        <button
                          type="button"
                          value="buy"
                          onClick={handleSelectSide}
                        >
                          {L.translate('Trading.tableBlock.buy')}
                        </button>
                      </li>
                      <li>
                        <button
                          type="button"
                          value="sell"
                          onClick={handleSelectSide}
                        >
                          {L.translate('Trading.tableBlock.sell')}
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
            {!data?.length ? (
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
              data.map(item => (
                <tr key={item.id} className="table_row change">
                  <td>{helpers.transformData(item?.created_at)}</td>
                  <td>{item?.pair?.replace('_', '/')?.toUpperCase()}</td>
                  <td>
                    {item?.trigger_conditions
                      ? 'Stop-Limit'
                      : getType(item?.type)}
                  </td>
                  <td
                    className={
                      marketType[item?.type] ? marketType[item?.type][0] : null
                    }
                  >
                    {marketType[item?.type] ? marketType[item?.type][1] : '-'}
                  </td>
                  <td>
                    {helpers.numberWithCommas(
                      helpers.toCrop(getDecimals(item?.pair))(item?.average),
                    )}
                  </td>
                  <td>
                    {helpers.numberWithCommas(
                      helpers.toCrop(getDecimals(item?.pair))(
                        item?.price || item?.average,
                      ),
                    )}
                  </td>
                  <td>
                    {helpers.numberWithCommas(
                      helpers.toCrop(8)(item?.quantity),
                    )}
                  </td>
                  <td>{item?.filling}</td>
                  <td>
                    {helpers.numberWithCommas(helpers.toCrop(8)(item?.total))}
                  </td>
                  <td>{getStatus(item?.status)}</td>
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
