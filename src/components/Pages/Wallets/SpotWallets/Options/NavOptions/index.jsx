import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import L from 'i18n-react';
import routes from '../../../../../../routes';
import { getLastParam } from './helpers';

const NavOptions = () => {
  const location = useLocation();
  const lastParam = getLastParam(location.pathname);
  return (
    <div className="account-header">
      <div className="page-tab page-tab--full">
        <NavLink
          to={`${routes.Wallets.SpotWallets.Options.Deposit.path}/${lastParam}`}
          className="page-tab__item"
        >
          {L.translate('Wallets.Spot.Options.deposit')}
        </NavLink>
        <NavLink
          to={`${routes.Wallets.SpotWallets.Options.Withdraw.path}/${lastParam}`}
          className="page-tab__item"
        >
          {L.translate('Wallets.Spot.Options.withdraw')}
        </NavLink>
      </div>
    </div>
  );
};
export default NavOptions;
