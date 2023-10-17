import React from 'react';
import L from 'i18n-react';

const SpotWallet = () => (
  <div className="field-wrap">
    <p className="form-item d-flex align-items-center">
      {L.translate('Base.Modals.spot_wallet')}
      <span className="field-icon field-icon--left">
        <i className="fa fa-wallet" />
      </span>
    </p>
  </div>
);

export default SpotWallet;
