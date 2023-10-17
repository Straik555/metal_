import React from 'react';
import L from 'i18n-react';

const RewardCenter = () => {
  return (
    <div className="account-block__main">
      <div className="account-box">
        <div>{L.translate('UsersPage.RewardCenter.reward_center')}</div>
      </div>
    </div>
  );
};

export default RewardCenter;
