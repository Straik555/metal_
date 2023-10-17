import { store } from '../../../../redux/store';

export const intervals = {
  1: {
    title: { en: '1  minute', ru: '1 минута', zh: '1分鐘', tr: '1 dakika' },
    cutName: { en: '1m', ru: '1м', zh: '1分鐘', tr: '1 dk' },
    request: '1m',
    resolution: 1,
    minutes: 1,
  },
  3: {
    title: { en: '3  minutes', ru: '3 минуты', zh: '3分鐘', tr: '3 dakika' },
    cutName: { en: '3m', ru: '3м', zh: '3分鐘', tr: '3 dk' },
    request: '3m',
    resolution: 3,
    minutes: 3,
  },
  5: {
    title: { en: '5  minutes', ru: '5 минут', zh: '5分鐘', tr: '5 dakika' },
    cutName: { en: '5m', ru: '5м', zh: '5分鐘', tr: '5 dk' },
    request: '5m',
    resolution: 5,
    minutes: 5,
  },
  15: {
    title: { en: '15  minutes', ru: '15 минут', zh: '15分鐘', tr: '15 dakika' },
    cutName: { en: '15m', ru: '15м', zh: '15分鐘', tr: '15 dk' },
    request: '15m',
    resolution: 15,
    minutes: 15,
  },
  30: {
    title: { en: '30  minutes', ru: '30 минут', zh: '30分鐘', tr: '30 dakika' },
    cutName: { en: '30m', ru: '30м', zh: '30分鐘', tr: '30 dk' },
    request: '30m',
    resolution: 30,
    minutes: 30,
  },
  60: {
    title: { en: '1 hour', ru: '1 час', zh: '1小時', tr: '1 saat' },
    cutName: { en: '1H', ru: '1Ч', zh: '1小時', tr: '1 sa.' },
    request: '1H',
    resolution: 60,
    minutes: 60,
  },
  120: {
    title: { en: '2 hours', ru: '2 часа', zh: '2小時', tr: '2 saat' },
    cutName: { en: '2H', ru: '2Ч', zh: '2小時', tr: '2 sa.' },
    request: '2H',
    resolution: 120,
    minutes: 120,
  },
  240: {
    title: { en: '4 hours', ru: '4 часа', zh: '4小時', tr: '4 saat' },
    cutName: { en: '4H', ru: '4Ч', zh: '4小時', tr: '4 sa.' },
    request: '4H',
    resolution: 240,
    minutes: 240,
  },
  360: {
    title: { en: '6 hours', ru: '6 часов', zh: '6小時', tr: '6 saat' },
    cutName: { en: '6H', ru: '6Ч', zh: '6小時', tr: '6 sa.' },
    request: '6H',
    resolution: 360,
    minutes: 360,
  },
  480: {
    title: { en: '8 hours', ru: '8 часов', zh: '8小時', tr: '8 saat' },
    cutName: { en: '8H', ru: '8Ч', zh: '8小時', tr: '8 sa.' },
    request: '8H',
    resolution: 480,
    minutes: 480,
  },
  720: {
    title: { en: '12  hours', ru: '12 часов', zh: '12小時', tr: '12 saat' },
    cutName: { en: '12H', ru: '12Ч', zh: '12小時', tr: '12 sa.' },
    request: '12H',
    resolution: 720,
    minutes: 720,
  },
  '1D': {
    title: { en: '1  day', ru: '1 день', zh: '1天', tr: '1 gün' },
    cutName: { en: '1D', ru: '1Д', zh: '1天', tr: '1 gün' },
    request: '1D',
    resolution: '1D',
    minutes: 1440,
  },
  '1W': {
    title: { en: '1 week', ru: '1 неделя', zh: '1週', tr: '1 hafta' },
    cutName: { en: '1W', ru: '1Н', zh: '1週', tr: '1 h.' },
    request: '1W',
    resolution: '1W',
    minutes: 10080,
  },
  '1M': {
    title: { en: '1  month', ru: '1 месяц', zh: '1個月', tr: '1 ay' },
    cutName: { en: '1M', ru: '1М', zh: '1個月', tr: '1 ay' },
    request: '1M',
    resolution: '1M',
    minutes: 43200,
  },
};

const mobLeft = 10;

const getHeadIntervals = itrs => {
  return Object.keys(itrs).reduce(
    (acc, item) => {
      if (isNaN(+item)) {
        if (!acc[2]) {
          acc.push([]);
        }
        acc[2].push(itrs[item]);
        return acc;
      }
      if (+item < 60) {
        acc[0].push(itrs[item]);
        return acc;
      }
      if (+item >= 60) {
        if (!acc[1]) {
          acc.push([]);
        }
        acc[1].push(itrs[item]);
        return acc;
      }

      return acc;
    },
    [[]],
  );
};
const headIntervals = getHeadIntervals(intervals);

export function closeSelectResolution(e) {
  if (e?.currentTarget?.dataset?.id !== e?.relatedTarget?.dataset?.id) {
    e.currentTarget.style.display = 'none';
  }
}
export function closeSelectResolutionHead(e) {
  if (e?.currentTarget?.dataset?.id !== e?.relatedTarget?.dataset?.id) {
    const index = e.target?.dataset?.resolution;
    const elm = e.currentTarget.ownerDocument.getElementsByClassName(
      'JS_BODY_MODALS',
    )[0].children[index];
    elm.style.display = 'none';
  }
}
export const toggleSelectResolution = e => {
  if (e?.target?.dataset?.interval) {
    store.dispatch({
      type: 'SET_INTERVAL_START',
      payload: e.target.dataset.interval,
    });
  }
  if (e.target?.dataset?.resolution) {
    const index = e.target?.dataset?.resolution;
    e.currentTarget.dataset.id = `JS_YESH_MODAL_${index}`;
    const elm = e.currentTarget.ownerDocument.getElementsByClassName(
      'JS_BODY_MODALS',
    )[0].children[index];

    headIntervals.forEach((el, i) => {
      if (i !== index) {
        const elmOld = e.currentTarget.ownerDocument.getElementsByClassName(
          'JS_BODY_MODALS',
        )[0].children[i];
        elmOld.style.display = 'none';
      }
    });

    const menuLeft = e.currentTarget.ownerDocument.getElementsByClassName(
      'layout__area--left',
    )[0];
    const left =
      menuLeft.clientWidth < 40
        ? mobLeft + 40 * index
        : mobLeft + 50 + 40 * index;
    e.target.onmouseout = closeSelectResolutionHead;

    if (elm.style.display === 'none') {
      elm.style.left = `${left}px`;

      elm.style.display = 'block';
      elm.onmouseout = closeSelectResolution;
    } else {
      elm.style.display = 'none';
    }
  }
};
export const setSelectResolution = e => {
  if (e?.target?.dataset?.interval) {
    store.dispatch({
      type: 'SET_INTERVAL_START',
      payload: e.target.dataset.interval,
    });
  }
};

const addSelect = (data, index, lng) => {
  const interval = store?.getState()?.interval?.interval;
  // const element = data.find(
  //   item => String(item?.resolution) === String(interval),
  // )?.name[lng];
  return `
    <div
    onmouseout=${closeSelectResolution}
      class="menuWrap-23ejLU7n- "
      data-id="JS_YESH_MODAL_${index}"
      style="display: none; 
      min-width: 100px;
      position: fixed; 
      top: 38px; 
      left: ${160 + 40 * index}px;
      color: #ffffff; 
      z-index:999999999"
    >
              ${data
                .map(
                  item => `
                  <div>
                    <div
                    class="item-2xPVYue0 withIcon-1xBjf-oB ${
                      String(item?.resolution) === String(interval)
                        ? 'isActive-2j-GhQs_'
                        : ''
                    }" 
                    data-interval=${`${item.resolution}`} 
                    styles="
                      padding: 2px 10px 2px 8px
                    "
                    data-id="JS_YESH_MODAL_${index}"  
                    data-id=${index}>
                      ${item.title[lng]} 
                    </div>
                  </div>
                  `,
                )
                .join('')}
    </div>
  `;
};

const addButton = (data, index, lng) => {
  const interval = store?.getState()?.interval?.interval;
  const element = data.find(
    item => String(item?.resolution) === String(interval),
  )?.cutName[lng];
  return `
    <div class="wrap-18oKCBRc- JS_YESH_RESOLUTION" style="width:38px; position: relative; z-index: 1" data-resolution=${`${index}`} data-id="JS_YESH_MODAL_${index}">
        <div 
          
          class="menu-1fA401bY- button-13wlLwhJ- apply-common-tooltip "
          style="pointer-events: none;"
          title=${data[0].title[lng]}
          data-id="JS_YESH_MODAL_${index}"
        >
          <div class="menuContent-1vyIDg3J- wrap-18oKCBRc-" data-id="JS_YESH_MODAL_${index}">
            <div class="value-DWZXOdoK- IvanCenter ${
              element ? 'yesh_active' : ''
            }" data-id="JS_YESH_MODAL">
             ${element || data[0].cutName[lng].slice(1)}
            </div>
          </div>
        </div>
        
    </div>

    `;
};
export const newHeadInterval = lng => {
  return headIntervals
    .map((item, index) => addButton(item, index, lng))
    .join('');
};
export const newHeadIntervalPopups = lng => {
  return headIntervals
    .map((item, index) => addSelect(item, index, lng))
    .join('');
};
