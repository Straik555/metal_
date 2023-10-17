import React from 'react';
import L from 'i18n-react';

const MarginWallet = () => (
  <div className="field-wrap">
    <p className="form-item d-flex align-items-center">
      {L.translate('Base.Modals.margin_wallet')}
      <span className="field-icon field-icon--left">
        <i className="fas fa-level-up-alt" />
      </span>
    </p>
  </div>
);

export default MarginWallet;
