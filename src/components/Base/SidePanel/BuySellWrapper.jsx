import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import StopLimit from './StopLimit';
import LimitOrder from './LimitOrder';
import MarketOrder from './MarketOrder';
import routes from '../../../routes';
import { userAuthBool } from '../../../redux/auth/selectors';

function BuySellWrapper(props) {
  const { mode, orderType } = props;
  const auth = useSelector(userAuthBool);

  const balance = 50;

  const handleSwitchOrderType = type => {
    switch (type) {
      case 'limit_order':
        return <LimitOrder balance={balance} auth={auth} />;
      case 'market_order':
        return <MarketOrder balance={balance} auth={auth} />;
      case 'stop_limit':
        return <StopLimit balance={balance} auth={auth} />;
      default:
        return <LimitOrder balance={balance} auth={auth} />;
    }
  };

  const handleBuy = () => {};

  const handleSell = () => {};

  return (
    <div className="side-panel__col">
      <p className="block-title">
        {mode}, ETH
        <span>Balance BTC: {balance}</span>
      </p>
      {handleSwitchOrderType(orderType)}
      <div className="trade-order">
        {auth ? (
          <button
            className={
              mode === 'Buy' ? 'order-btn' : 'order-btn order-btn--sell'
            }
            onClick={mode === 'Buy' ? handleBuy : handleSell}
          >
            {mode} ETH
          </button>
        ) : (
          <div className="trade-login">
            <Link to={routes.Auth.Login.path}>Login</Link> or{' '}
            <Link to={routes.Auth.Signup.path}>Sign up</Link> to trade
          </div>
        )}
      </div>
    </div>
  );
}

export default BuySellWrapper;

/* <div className="trade-slide">
    <div className="trade-slide__line">
      <div className="slide-val"></div>
    </div>

    <button className="trade-slide__btn"></button>
  </div>
*/
