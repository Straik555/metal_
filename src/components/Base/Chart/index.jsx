import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
// import { widget, onready } from './charting_library/charting_library.min';
import { widget } from './charting_library/charting_library';

import Datafeed, { setChartDecimal } from './datafeed';
import './index.css';
import { getTimezone } from '../../../services/helpers';
import {
  toggleSelectResolution,
  setSelectResolution,
  newHeadInterval,
  newHeadIntervalPopups,
} from './helpers/interval';
import { period } from './datafeed/historyProvider';
import { currentPairSelector } from '../../../redux/currentPair/selectors';
import { selectedContractSelector } from '../../../redux/temporary/selectors';
import { intervalLsSelector } from '../../../redux/interval/selectors';
import { languageSelector } from '../../../redux/lng/selectors';
import { storeCurentDecimal } from '../../../redux/decimals/selectors';

const Chart = () => {
  const contract = useSelector(selectedContractSelector);
  const pair = useSelector(currentPairSelector);
  const intervalLs = useSelector(intervalLsSelector);
  const { language } = useSelector(languageSelector);

  const pathname = window?.location?.pathname;
  const getSymbol = pathname => {
    switch (true) {
      case pathname.includes('/spot'):
        return pair.replace('_', '/').toUpperCase();
      case pathname.includes('/chart'):
        return pair.replace('_', '/').toUpperCase();
      case pathname.includes('/margin'):
        return pair.replace('_', '/').toUpperCase();
      case pathname.includes('/futures'):
        return contract; // pushToMiddle(contract, '/'); // TEMP, need correct backend
      default:
        return 'BTC/USDT';
    }
  };
  const symbol = getSymbol(pathname);
  const symbolName = 'usd';
  const datafeed = Datafeed;
  const decimal = useSelector(storeCurentDecimal);
  if (decimal) {
    setChartDecimal(decimal);
  }
  const interval = intervalLs || '1'; // 1 minutes
  const container_id = 'Chart_Container';
  const library_path = '/charting_library/';
  const theme = window?.location?.search?.includes('theme=Light')
    ? 'Light'
    : 'Dark';
  const locale =
    language?.toLowerCase() === 'cn' ? 'zh' : language?.toLowerCase() || 'en';
  const charts_storage_api_version = '1.13';
  const client_id = 'nostafaratum';
  // const disabled_features = ['use_localstorage_for_settings'];
  const enabled_features = ['use_localstorage_for_settings'];
  const fullscreen = false;
  const autosize = true;
  const studies_overrides = {};
  const loading_screen = { backgroundColor: '#1c1c1d' };
  const toolbar_bg = '#1c1c1d';
  const timezone = getTimezone();
  const overrides = {
    'mainSeriesProperties.showCountdown': true,
    'paneProperties.background': theme === 'Light' ? '#ffffff' : '#1c1c1d',
    'paneProperties.vertGridProperties.color': '#343a40',
    'paneProperties.horzGridProperties.color': '#343a40',
    'symbolWatermarkProperties.transparency': 90,
    'scalesProperties.textColor': '#AAA',
    'mainSeriesProperties.visible': true,
    'mainSeriesProperties.candleStyle.wickUpColor': '#53B987',
    'mainSeriesProperties.candleStyle.wickDownColor': '#EB4D5C',
    'mainSeriesProperties.candleStyle.upColor': '#53B987',
    'mainSeriesProperties.candleStyle.downColor': '#EB4D5C',
    'mainSeriesProperties.candleStyle.drawWick': true,
    'mainSeriesProperties.candleStyle.borderUpColor': '#53B987',
    'mainSeriesProperties.candleStyle.borderDownColor': '#EB4D5C',
  };

  useEffect(() => {
    localStorage.removeItem('tradingview.chartproperties');
    localStorage.removeItem('tradingview.chartproperties.mainSeriesProperties');

    const widgetOptions = {
      symbol,
      symbolName,
      datafeed,
      interval,
      container_id,
      library_path,
      theme,
      locale,
      // disabled_features,
      enabled_features,
      charts_storage_api_version,
      client_id,
      fullscreen,
      timezone,
      autosize,
      // toolbar_bg,
      // hide_top_toolbar: false,
      // left_toolbar: false,
      // hide_side_toolbar: false,
      // allow_symbol_change: false,
      // hideideas: false,
      // debug: false,
      // preset: 'mobile',
      // studies,
      // studies_overrides,
      overrides,
      loading_screen,
    };
    if (theme === 'Dark') {
      widgetOptions.loading_screen = loading_screen;
      widgetOptions.toolbar_bg = toolbar_bg;
      widgetOptions.overrides = overrides;
    }
    let tvWidget = new widget(widgetOptions);

    tvWidget.onChartReady(() => {
      const doc = tvWidget._innerWindow().document;
      const head = doc.getElementsByClassName('layout__area--top');
      const body = doc.getElementsByTagName('body');
      const headSearch = doc.getElementById('header-toolbar-symbol-search');
      const headInterval = doc.getElementById('header-toolbar-intervals');
      const headCompare = doc.getElementById('header-toolbar-compare');
      const headIndicators = doc.getElementById('header-toolbar-indicators');
      const timingTools = doc.getElementsByClassName(
        'chart-toolbar chart-controls-bar',
      );
      const fullScreen = doc.getElementById('header-toolbar-fullscreen');
      const textAfterResize = doc.getElementsByClassName(
        'js-button-text text-1sK7vbvh',
      );
      textAfterResize[2].style.display = 'none'; // Compare
      textAfterResize[3].style.display = 'none'; // Indicators
      textAfterResize[4].style.display = 'none'; // Compare
      textAfterResize[5].style.display = 'none'; // Indicators

      const headerLabels = document.getElementById('header-toolbar-compare');

      if (window?.location?.href?.includes('chart')) {
        fullScreen.parentNode.style.display = 'none';
      }

      const header = doc.getElementsByClassName('layout__area--top')[0]
        .children[0].children[0].children[0].children[0].children[0].children[0]
        .children[0].children[0];
      const compare = header.children[3].children[0].children[1];
      compare.innerText = '';
      compare.innerHtml = '';
      compare.style.display = 'none';

      const indicators = header.children[4].children[0].children[0].children[1];
      indicators.innerText = '';
      indicators.innerHTML = '';
      indicators.style.display = 'none';

      // disabling timing tools
      timingTools[0].children[0].children[0].style.display = 'none';
      timingTools[0].children[0].children[1].style.display = 'none';

      // THis need for resizing window
      window.addEventListener('resize', () => {
        if (timingTools[0]) {
          timingTools[0].children[0].children[0].style.display = 'none';
          timingTools[0].children[0].children[1].style.display = 'none';
        }
        indicators.innerText = '';
        indicators.innerHTML = '';
        indicators.style.display = 'none';
        compare.innerText = '';
        compare.innerHtml = '';
        compare.style.display = 'none';
        if (textAfterResize) {
          textAfterResize[2].style.display = 'none'; // Compare
          textAfterResize[3].style.display = 'none'; // Indicators
          // textAfterResize[4].style.display = 'none'; // Compare
          // textAfterResize[5].style.display = 'none'; // Indicators
        }
      });

      tvWidget.chart().removeAllStudies();
      tvWidget.chart().createStudy('Volume', false, true);

      const firstSearch = true;

      if (firstSearch) {
        // headSearch.parentNode.innerHTML = `<b>${'Time'}</b>`;
        headSearch.parentNode.outerHTML = ``;
      } else {
        // rerender intervals
        headSearch.children[0].children[0].onblur = e => {
          const newInt = tvWidget
            ._innerWindow()
            .document.getElementsByClassName('wrap-3tiHesTk-');
          if (
            newInt?.length &&
            newInt[0]?.children[1]?.children[0]?.id ===
              'header-toolbar-intervals'
          ) {
            newInt[0].children[1].innerHTML = newHeadInterval(locale);
            newInt[0].children[1].addEventListener(
              'click',
              toggleSelectResolution,
            );
          }
        };
      }

      headInterval.innerHTML = newHeadInterval(locale);
      body[0].insertAdjacentHTML(
        'beforeEnd',
        `<div class="JS_BODY_MODALS">${newHeadIntervalPopups(locale)}</div>`,
      );
      head[0].style.display = 'block';

      headInterval.addEventListener('click', toggleSelectResolution);
      const modals = doc.getElementsByClassName('JS_BODY_MODALS');
      modals[0].addEventListener('click', setSelectResolution);

      headCompare.style.padding = '0 5px';
      headCompare.style.width = '38px';

      headIndicators.style.padding = '0 5px';
      headIndicators.style.width = '38px';

      // Понятия не имею зачем пытались создать кнопку ниже, но заккоментированый код вызывает ошибку attr is not a function,
      // т.к button = tvWidget.createButton() возращает просто <div /> с классом "apply-common-tooltip", соотвественно
      // у DOM элемента нету методов "attr", "addClass", "on"
      // так же непонятно зачем там была строка button[0].innerHTML = 'API'; // Cannot read propety "innerHTML" of undefined. т.к
      // у этого дива нет потомков.
      // Но на всякий случай реализовал подобное обычным способом

      // const button = tvWidget
      //   .createButton()
      //   .attr('title', 'Click to show a notification popup')
      //   .addClass('apply-common-tooltip')
      //   .on('click', () =>
      //     tvWidget.showNoticeDialog({
      //       title: 'Notification',
      //       body: 'Metal Trading Company API works correctly',
      //       callback: () => {},
      //     }),
      //   );

      const button = tvWidget.createButton();
      button.title = 'Click to show a notification popup';
      // eslint-disable-next-line no-unused-expressions
      button?.classList?.add('apply-common-tooltip'); // ?. чисто на всякий случай.
      button.onclick = () =>
        tvWidget.showNoticeDialog({
          title: 'Notification',
          body: 'Metal Trading Company API works correctly',
          callback: () => {},
        });

      // button[0].innerHTML = 'API';
    });

    return () => {
      period.clearChart = false;
      if (tvWidget !== null) {
        if (document.getElementById(container_id).contentWindow) {
          tvWidget.remove();
        }
        tvWidget = null;
      }
    };
  }, [symbol, locale, intervalLs]);

  return <div id={container_id} className="TVChartContainer" />;
};
export default React.memo(Chart);
