import React, { useEffect, useState } from 'react';
import L from 'i18n-react';
import { NavLink, Route, Switch, useHistory } from 'react-router-dom';
import TransactionHistoryTable from './TransactionHistoryTable';
import TransferTable from './TransferTable';
import routes from '../../../../routes';

const TransactionHistory = () => {
  const history = useHistory();
  useEffect(() => {
    if (history.location.pathname === routes.Wallets.TransactionHistory.path) {
      history.replace(routes.Wallets.TransactionHistory.DepositWithdrawal.path);
    }
  }, []);
  return (
    <div className="account-block__main">
      <div className="account-header">
        <p className="account-header__title">
          {L.translate('Wallets.transaction_history')}
        </p>
      </div>

      <div className="account-box">
        <div className="account-table">
          <div className="account-table__tab">
            <div className="table-box table-box--no-mt">
              <div className="page-tab">
                <NavLink
                  to={routes.Wallets.TransactionHistory.DepositWithdrawal.path}
                  className="page-tab__item"
                  activeClassName="page-tab__item active"
                >
                  {L.translate('Wallets.deposit_withdraw')}
                </NavLink>
                {/* <NavLink
                  to={routes.Wallets.TransactionHistory.Transfer.path}
                  className="page-tab__item"
                  activeClassName="page-tab__item active"
                >
                  {L.translate('Wallets.transfer')}
                </NavLink> */}
              </div>
            </div>
            <Switch>
              <Route
                path={routes.Wallets.TransactionHistory.DepositWithdrawal.path}
                component={TransactionHistoryTable}
              />
              {/* <Route
                path={routes.Wallets.TransactionHistory.Transfer.path}
                component={TransferTable}
              /> */}
            </Switch>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionHistory;
