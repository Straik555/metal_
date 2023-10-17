import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import L from 'i18n-react';
import axios from 'axios';
import Order from './Orders';
import History from './History';
import TradeHistory from './TradeHistory';
import Funds from './Funds';
import routes from '../../../../../routes';
import { tokenSelector } from '../../../../../redux/auth/selectors';
import { languageSelector } from '../../../../../redux/lng/selectors';

const TableBlock = () => {
  const token = useSelector(tokenSelector);
  const isLogin = token && axios.defaults.headers.common.Authorization;
  const [tab, setTab] = useState('order');
  const language = useSelector(languageSelector); // need to update language

  const tabs = {
    order: <Order />,
    history: <History />,
    tradeHistory: <TradeHistory />,
    funds: <Funds />,
  };

  const handleTabChange = ({ target }) => {
    setTab(target.name);
  };

  return (
    <div className="bottom-part" key="TableBlock">
      <div className="market-panel market-panel--type2">
        <div className="panel-tab">
          <button
            name="order"
            type="button"
            className={tab === 'order' ? 'btn active' : 'btn'}
            onClick={handleTabChange}
          >
            {L.translate('Trading.tableBlock.open_orders')}
          </button>
          <button
            name="history"
            type="button"
            className={tab === 'history' ? 'btn active' : 'btn'}
            onClick={handleTabChange}
          >
            {L.translate('Trading.tableBlock.order_history')}
          </button>
          <button
            name="tradeHistory"
            type="button"
            className={tab === 'tradeHistory' ? 'btn active' : 'btn'}
            onClick={handleTabChange}
          >
            {L.translate('Trading.tableBlock.trade_history')}
          </button>
          <button
            name="funds"
            type="button"
            className={tab === 'funds' ? 'btn active' : 'btn'}
            onClick={handleTabChange}
          >
            {L.translate('Trading.tableBlock.funds')}
          </button>
        </div>
      </div>

      {isLogin ? (
        tabs[tab]
      ) : (
        <div className="bottom-part__table">
          <div className="trade-login">
            <Link to={routes.Auth.Login.path}>
              {L.translate('Global.do_login')}
            </Link>{' '}
            {L.translate('Global.or')}{' '}
            <Link to={routes.Auth.Signup.path}>
              {' '}
              {L.translate('Global.do_sign_up')}
            </Link>{' '}
          </div>
        </div>
      )}
    </div>
  );
};

export default React.memo(TableBlock);
