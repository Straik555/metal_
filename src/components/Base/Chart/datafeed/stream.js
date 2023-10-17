import { toCrop } from '../../../../services/helpers';
import { resolutionChangeBars, resolutionUpdateBars } from '../helpers/candles';
import { intervals } from '../helpers/interval';
import historyProvider from './historyProvider';

const _subs = [];
let oldRounded = false;
let oldResolution = false;

function createChannelString(symbolInfo) {
  if (symbolInfo.name === 'S%26P500') return `0~S&P500`;
  return `0~${symbolInfo.name}`;
}

const updateBar = (data, sub) => {
  const { lastBar, resolution } = sub;
  if (!lastBar) return;
  const coeff = intervals[resolution].minutes * 60 * 1000;
  const time = Math.floor(data.time / coeff) * coeff;

  if (oldResolution !== resolution) {
    oldResolution = resolution;
    oldRounded = time;
  }
  if (!oldRounded) {
    oldRounded = time;
    lastBar.time = +time;
  }
  if (oldRounded && oldRounded < time) {
    oldRounded = time;
    lastBar.open = +lastBar.close;
    lastBar.time = +time;
    lastBar.high = +lastBar.close;
    lastBar.low = +lastBar.close;
    lastBar.close = +data.price;
    lastBar.volume = 0;
    return lastBar;
  }
  oldRounded = time;
  lastBar.volume = +data.volume + Number(lastBar.volume);
  if (data.price < lastBar.low) {
    lastBar.low = +data.price;
  } else if (data.price > lastBar.high) {
    lastBar.high = +data.price;
  }
  lastBar.close = +data.price;
  resolutionUpdateBars.lastBar = lastBar;
  resolutionUpdateBars.oldRounded = oldRounded;
  resolutionUpdateBars.resolution = resolution;
  resolutionChangeBars();
  return lastBar;
};

export const updateBarBySockets = bar => {
  const sub = _subs[_subs.length - 1];
  if (sub) {
    const _lastBar = updateBar(bar, sub);
    sub.listener(_lastBar);
    sub.lastBar = _lastBar;
  }
};

export default {
  subscribeBars(symbolInfo, resolution, updateCb, uid, resetCache) {
    const channelString = createChannelString(symbolInfo);
    const newSub = {
      channelString,
      uid,
      resolution,
      symbolInfo,
      lastBar: historyProvider.history[symbolInfo.name].lastBar,
      listener: updateCb,
    };
    _subs.push(newSub);
  },
  unsubscribeBars(uid) {
    const subIndex = _subs.findIndex(e => e.uid === uid);
    if (subIndex === -1) {
      return;
    }
    _subs.splice(subIndex, 1);
  },
};
