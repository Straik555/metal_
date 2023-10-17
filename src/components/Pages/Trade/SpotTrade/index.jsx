import React from 'react';
import TableBlock from './TableBlockSpot';
import RecentTrades from './RecentTradesSpot';
import OrderBook from './OrderBookSpot';
import InfoOfPairs from './InfoOfPairsSpot';
import SidePanel from './SidePanelSpot';
import Chart from '../../../Base/Chart';

const SpotTrade = () => {
  return (
    <div className="trades-wrap">
      <div className="trades-content">
        <div className="main-panel">
          <div className="top-part">
            <div className="row top-part__row">
              <div className="col-xl-7">
                <InfoOfPairs />
                <div className="graph">
                  <Chart />
                </div>
                <TableBlock />
              </div>

              <div className="col-xl-5">
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

// export default SpotTrade;
export default React.memo(SpotTrade);
