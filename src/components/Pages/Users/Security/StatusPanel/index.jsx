import React from 'react';
import L from 'i18n-react';
import IconEnable from './IconEnable';
import IconDisable from './IconDisable';

const StatusPanel = props => {
  const { status } = props.userSecurityData;

  const sumSecurity = status;

  return (
    <div className="account-header">
      <div className="acc-security">
        <p className="acc-security__title">
          {L.translate('UsersPage.Security.increase_your_security')} ({' '}
          <span className="acc-security__done">{sumSecurity || 0}</span> / 1 )
        </p>
        <div className="sucurity-options">
          <div className="sucurity-option">
            {status ? <IconEnable /> : <IconDisable />}
            <span className="sucurity-option__name">
              {L.translate('UsersPage.Security.verify')}
            </span>
          </div>
          {/* <div className="sucurity-option">
            {can_withdrawal ? <IconEnable /> : <IconDisable />}
            <span className="sucurity-option__name">
              {L.translate('UsersPage.Security.turn_on_withdraw')}
            </span>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default StatusPanel;
