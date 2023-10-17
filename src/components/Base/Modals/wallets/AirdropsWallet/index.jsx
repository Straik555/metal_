import React from 'react';
import L from 'i18n-react';

const AirdropsWallet = () => (
  <div className="field-wrap">
    <p className="form-item d-flex align-items-center">
      {L.translate('Wallets.Airdrop.airdrop_wallet')}
      <span className="field-icon field-icon--left">
        <i className="fas fa-level-up-alt" />
      </span>
    </p>
  </div>
);

export default AirdropsWallet;
