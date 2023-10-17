import React from 'react';
import L from 'i18n-react';
import { NavLink } from 'react-router-dom';
import routes from '../../../../routes';

const NavWallets = () => {
  return (
    <div className="account-block__bar">
      <ul className="account-nav account-nav--type2">
        <li>
          <NavLink
            to={routes.Wallets.SpotWallets.path}
            className="account-nav__link"
            activeClassName="account-nav__link active"
          >
            <span className="account-bav__text">
              {L.translate('Wallets.spot')}
            </span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to={routes.Wallets.TransactionHistory.path}
            className="account-nav__link account-nav__link--type2 "
          >
            <span className="account-bav__text">
              {L.translate('Wallets.transaction_history')}
            </span>
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default NavWallets;
