import React from 'react';
import { Link } from 'react-router-dom';
import L from 'i18n-react';
import SelectWrap from '../base/SelectWrap';
import routes from '../../../../routes';

const SelectTrade = ({ isLogin }) => {
  return (
    <SelectWrap
      title={L.translate('Header.SelectTrade.trade')}
      listenerID="Trade"
    >
      <ul className="drop-list__item">
        {isLogin && (
          <li>
            <Link to={routes.Pairs.path} className="drop-btn">
              {L.translate('Header.SelectTrade.list_of_pairs')}
            </Link>
          </li>
        )}
        <li>
          <Link to={routes.Trade.SpotTrade.path} className="drop-btn">
            {L.translate('Header.SelectTrade.spot')}
          </Link>
        </li>
      </ul>
    </SelectWrap>
  );
};

export default SelectTrade;
