import React from 'react';
import { NavLink } from 'react-router-dom';
import L from 'i18n-react';
import routes from '../../../../routes';
import SelectWrap from '../base/SelectWrap';

const SelectWallets = () => {
  return (
    <SelectWrap
      title={L.translate('Header.SelectWallets.wallets')}
      listenerID="Wallets"
    >
      <ul className="drop-list__item">
        <li>
          <NavLink
            to={routes.Wallets.SpotWallets.path}
            className="drop-btn"
            activeClassName="drop-btn active"
          >
            {L.translate('Header.SelectWallets.spot')}
          </NavLink>
        </li>
        <li>
          <NavLink
            to={routes.Wallets.TransactionHistory.path}
            className="drop-btn"
            activeClassName="drop-btn active"
          >
            {L.translate('Header.SelectWallets.transaction_history')}
          </NavLink>
        </li>
      </ul>
    </SelectWrap>
  );
};

export default SelectWallets;
