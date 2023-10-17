import api from '../../../../services/api';
import { intervals } from '../helpers/interval';

const history = {};
const current = {};
export const period = {};

export default {
  history,
  current,
  getBars(symbolInfo, resolution, from, to, first, limit) {
    const pair = symbolInfo.name.replace('/', '_').toLowerCase();
    if (
      !period?.to ||
      period.resolution !== resolution ||
      period.pair !== pair ||
      period.clearChart !== true
    ) {
      period.resolution = resolution;
      period.pair = pair;
      period.clearChart = true;
      period.to = new Date().getTime();
      period.from =
        period.to - intervals[resolution]?.minutes * 500 * 60 * 1000;
    } else {
      period.resolution = resolution;
      period.pair = pair;
      period.clearChart = true;
      period.to = period.from;
      period.from -= intervals[resolution]?.minutes * 500 * 60 * 1000;
    }
    const cutTime = time => String(time).slice(0, String(time).length - 3);
    const query = window.location.href.includes('/trade/futures')
      ? `?contract=${pair}&resolution=${
          intervals[resolution]?.request || '1m'
        }&from=${from}&to=${to}`
      : `?pair=${pair}&resolution=${
          intervals[resolution]?.request || '1m'
        }&from=${cutTime(period.from)}&to=${cutTime(period.to)}`;

    const pathname = window?.location?.pathname;

    const changeApi = pathname => {
      switch (true) {
        case pathname.includes('/spot'):
          return api.chart.getHistoryChart;
        case pathname.includes('/chart'):
          return api.chart.getHistoryChart;
        case pathname.includes('/margin'):
          return api.chart.getHistoryChart;
        case pathname.includes('/futures'):
          return api.chart.getFuturesHistoryChart;
        default:
          break;
      }
    };

    const result = changeApi(pathname)(query)
      .then(({ data, status }) => {
        if (status < 200 || status >= 300) throw new Error('Error');
        if (data?.Data?.length) {
          const bars = data.Data.map(el => {
            return {
              time: el.time * 1000, // TradingView requires bar time in ms
              low: +el.low,
              high: +el.high,
              open: +el.open,
              close: +el.close,
              volume: +el.value,
            };
          });
          const currentBar = {
            time: +data?.Current?.time * 1000, // TradingView requires bar time in ms
            low: +data?.Current?.low,
            high: +data?.Current?.high,
            open: +data?.Current?.open,
            close: +data?.Current?.close,
            volume: +data?.Current?.value,
          };
          if (data.Current && !period.current) {
            bars.push(currentBar);
            period.current = true;
          }

          if (first) {
            history[symbolInfo.name] = {
              lastBar: currentBar,
              current: data.Current,
            };
            current.price = +data?.Current?.close;
            current.time = +data?.Current?.time * 1000;
            current.volume = +data?.Current?.value;
          }

          return bars;
        }
        return [];
      })
      .catch(error => {});

    return result;
  },
};
