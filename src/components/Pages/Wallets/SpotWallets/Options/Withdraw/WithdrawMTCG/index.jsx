import React from 'react';
import { useHistory } from 'react-router';
import L from 'i18n-react';
import routes from '../../../../../../../routes';

// MTCG currency can be withdrawn, so this component has been not used.

export const WithdraWMTCG = () => {
  const history = useHistory();
  const translatePath = 'Wallets.Spot.CryptoWithdraw';

  return (
    <div className="col-lg-12" style={{ marginTop: '20px' }}>
      <p style={{ marginBottom: '10px' }}>
        {L.translate(`${translatePath}.mtcg_withdraw_note`)}
      </p>
      <button
        type="button"
        className="page-btn"
        onClick={() => history.push(routes.BuyCrypto.Exchange.path)}
      >
        {L.translate(`${translatePath}.exchange_link_btn`)}
      </button>
    </div>
  );
};
