import { updateBarBySockets } from '../datafeed/stream';
import { intervals } from './interval';

export const resolutionUpdateBars = {
  lastBar: {},
  oldRounded: false,
  resolution: false,
};
let intervalChangeBars;
export const resolutionChangeBars = () => {
  if (intervalChangeBars) {
    clearInterval(intervalChangeBars);
  }
  intervalChangeBars = setInterval(() => {
    const coeff =
      intervals[resolutionUpdateBars.resolution].minutes * 60 * 1000;
    const time = Math.floor(new Date().getTime() / coeff) * coeff;
    if (time > resolutionUpdateBars.oldRounded) {
      const data = {
        price: +resolutionUpdateBars.lastBar.close,
        time: +time,
        volume: 0,
      };
      updateBarBySockets(data);
    }
  }, 1000);
};
