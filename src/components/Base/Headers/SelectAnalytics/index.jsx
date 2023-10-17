import React from 'react';
import { Link } from 'react-router-dom';
import L from 'i18n-react';
import SelectWrap from '../base/SelectWrap';
import routes from '../../../../routes';

const SelectAnalytics = () => {
  return (
    <SelectWrap
      title={L.translate('Header.SelectAnalytics.analytics')}
      listenerID="Analytics"
    >
      <ul className="drop-list__item">
        <li>
          <Link to={routes.Analytics.ValueAnalytics.path} className="drop-btn">
            {L.translate('Header.SelectAnalytics.value_analytics')}
          </Link>
        </li>
        <li>
          <Link to={routes.Analytics.CopyTrading.path} className="drop-btn">
            {L.translate('Header.SelectAnalytics.copy_trading')}
          </Link>
        </li>
      </ul>
    </SelectWrap>
  );
};

export default SelectAnalytics;
