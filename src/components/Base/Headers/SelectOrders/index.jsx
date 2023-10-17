import React from 'react';
import { Link } from 'react-router-dom';
import L from 'i18n-react';
import SelectWrap from '../base/SelectWrap';

const SelectOrders = () => {
  return (
    <SelectWrap
      title={L.translate('Header.SelectOrders.orders')}
      listenerID="Orders"
    >
      <ul className="drop-list__item">
        <li>
          <Link to="/#" className="drop-btn">
            {L.translate('Header.SelectOrders.spot_order')}
          </Link>
        </li>
        <li>
          <Link to="/#" className="drop-btn">
            {L.translate('Header.SelectOrders.margin_order')}
          </Link>
        </li>
        <li>
          <Link to="/#" className="drop-btn">
            {L.translate('Header.SelectOrders.futures_order')}
          </Link>
        </li>
        <li>
          <Link to="/#" className="drop-btn">
            {L.translate('Header.SelectOrders.derivative_order')}
            {/* Forex rename Derivatives */}
          </Link>
        </li>
        <li>
          <Link to="/#" className="drop-btn">
            {L.translate('Header.SelectOrders.P2P_orde')}
          </Link>
        </li>
      </ul>
    </SelectWrap>
  );
};

export default SelectOrders;
