import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import routes from '../../../../../routes';
import NavOptions from './NavOptions';

const Options = () => (
  <div className="account-block__main">
    <NavOptions />
    <Switch>
      <Route
        path={`${routes.Wallets.SpotWallets.Options.Deposit.path}/:code`}
        component={routes.Wallets.SpotWallets.Options.Deposit.component}
      />
      <Route
        path={`${routes.Wallets.SpotWallets.Options.Withdraw.path}/:code`}
        component={routes.Wallets.SpotWallets.Options.Withdraw.component}
      />
      <Redirect to={routes.Wallets.SpotWallets.path} />
    </Switch>
  </div>
);
export default Options;
