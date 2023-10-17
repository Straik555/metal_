import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import routes from '../../../routes';
import Loader from '../../Base/Loader';
import NavWallets from './NavWallets';
import SocketBalances from '../../HOC/SocketBalances';

const Wallets = () => {
  return (
    <section className="account-section">
      <div className="account-block">
        <SocketBalances />
        <NavWallets />
        <Suspense fallback={<Loader />}>
          <Switch>
            <Route
              exact
              path={routes.Wallets.SpotWallets.path}
              component={routes.Wallets.SpotWallets.component}
            />
            <Route
              path={routes.Wallets.TransactionHistory.path}
              component={routes.Wallets.TransactionHistory.component}
            />
            <Route
              path={routes.Wallets.SpotWallets.Options.path}
              component={routes.Wallets.SpotWallets.Options.component}
            />
          </Switch>
        </Suspense>
      </div>
    </section>
  );
};

export default Wallets;
