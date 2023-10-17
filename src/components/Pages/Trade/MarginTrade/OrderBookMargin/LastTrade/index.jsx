import React from 'react';
import { useSelector } from 'react-redux';
import { currentPairSelector } from '../../../../../../redux/currentPair/selectors';
import { assetPairsSelector } from '../../../../../../redux/pairs/selectors';
import { recentTradesSpotSelector } from '../../../../../../redux/trade/spot/selectors';
import { toCrop } from '../../../../../../services/helpers';
import SignalLevel from '../../../../../Base/SignalLevel';

// there is some problem with rendering fontawesome elements
// the solution is to use this elements in separate component like here
const ArrowUp = () => (
  <span className="green">
    <i className="fas fa-long-arrow-alt-up" />
  </span>
);

const ArrowDown = () => (
  <span className="red">
    <i className="fas fa-long-arrow-alt-down" />
  </span>
);

const LastTrade = () => {
  const recentTrades = useSelector(recentTradesSpotSelector);
  const assetPairs = useSelector(assetPairsSelector);
  const pair = useSelector(currentPairSelector);
  const lastPriceUsd = assetPairs?.length
    ? assetPairs.find(({ code }) => code === pair)
    : 0;

  return (
    <div className="middle-str">
      <p>
        {recentTrades[0] && recentTrades[0]?.price < recentTrades[1]?.price ? (
          <>
            <span className="red">
              {toCrop(8)(recentTrades[0] ? recentTrades[0]?.price : 0)}
            </span>
            <ArrowDown />
          </>
        ) : (
          <>
            <span className="green">
              {toCrop(8)(recentTrades[0] ? recentTrades[0]?.price : 0)}
            </span>
            <ArrowUp />
          </>
        )}

        <span>{` $ ${toCrop(8)(
          lastPriceUsd ? lastPriceUsd?.last_price_usd : 0,
        )}`}</span>

        <SignalLevel />
      </p>
    </div>
  );
};

export default LastTrade;
