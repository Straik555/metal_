import React from 'react';
import TableBlock from './TableBlockMargin';
import RecentTrades from './RecentTradesMargin';
import OrderBook from './OrderBookMargin';
import InfoOfPairs from './InfoOfPairsMargin';
import SidePanel from './SidePanelMargin';
import Chart from '../../../Base/Chart';

const MarginTrade = () => {
  return (
    <div className="trades-wrap">
      <div className="trades-content">
        <div className="main-panel">
          <div className="top-part">
            <div className="row top-part__row">
              <div className="col-xl-7">
                <div className="info-panel">
                  <InfoOfPairs />
                </div>
                <div className="graph">
                  <Chart />
                </div>
                <TableBlock />
              </div>
              <div className=" col-xl-5">
                <div className="row table-row">
                  <OrderBook />
                  <RecentTrades />
                </div>

                <SidePanel />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarginTrade;
