import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import L from 'i18n-react';
import { hideEmail, transformData } from '../../../../services/helpers';
import Spot from './Spot';
import { userSelector } from '../../../../redux/auth/selectors';
import { checkUserStatus } from './utils';

const Dashboard = () => {
  const user = useSelector(userSelector);
  const [tab, setTab] = useState('spot');

  const handleTabClick = ({ target }) => {
    setTab(target.name);
  };

  const tabs = {
    spot: <Spot />,
  };
  return (
    <div className="account-block__main">
      <div className="account-header">
        <div className="account-user">
          <div className="account-user__name">
            <p>
              {user?.email
                ? user.user_data.email.slice(0, 2).toUpperCase()
                : '**'}
            </p>
          </div>
          <div className="account-user__info">
            <div className="acc-details">
              <p className="acc-details__email">{hideEmail(user?.email)}</p>
              <div className="acc-id">
                <span>{L.translate('UsersPage.Dashboard.user_id')}</span>
                <p className="acc-id__value">{user?.id}</p>
              </div>

              {checkUserStatus(user?.status?.name)}
            </div>
            <div className="acc-extra">
              <p>
                {L.translate('UsersPage.Dashboard.last_login', {
                  value: transformData(user?.last_login),
                })}
              </p>
              <p>IP:{user?.current_ip}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="account-box">
        <p className="account-box__title">
          {L.translate('UsersPage.Dashboard.balance_details')}
        </p>
        <div className="page-panel">
          <div className="page-tab">
            <button
              className={
                tab === 'spot' ? 'page-tab__item active' : 'page-tab__item'
              }
              type="button"
              name="spot"
              onClick={handleTabClick}
            >
              {L.translate('UsersPage.Dashboard.spot')}
            </button>
          </div>
        </div>
        <div className="balance-wrap">{tabs[tab]}</div>
      </div>
    </div>
  );
};

export default Dashboard;
