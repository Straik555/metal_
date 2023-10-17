import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import L from 'i18n-react';
import { toCrop, numberWithCommas } from '../../../../services/helpers';
import SpotWalletsTable from './SpotWalletsTable';
import { walletSelector } from '../../../../redux/wallets/selectors';
import { eyeHide, eyeShow } from './SpotIcons';

const SpotWallets = () => {
  const wallets = useSelector(walletSelector);
  const [showBalance, setShowBalance] = useState(false);

  const spotWallets = wallets?.spot;
  const tableItems = Object.values(spotWallets);

  return (
    <div className="account-block__main">
      <div className="account-header">
        <p className="account-header__title">
          {L.translate('Wallets.spot_wallet')}
        </p>
      </div>
      <div className="account-box">
        <div className="d-flex margin-balance-block__header">
          <p className="account-subtitle">
            {L.translate('Wallets.estimated_availbale_balance')}
          </p>
          <button
            type="button"
            className="balance-btn"
            style={{ borderColor: '#CCDBE8' }}
            onClick={() => setShowBalance(prev => !prev)}
          >
            {showBalance ? eyeHide : eyeShow}
            {showBalance
              ? L.translate('Wallets.hide_balance')
              : L.translate('Wallets.show_balance')}
          </button>
        </div>
        {showBalance ? (
          <div className="wallet-total">
            <p className="wallet-total__main">
              {numberWithCommas(toCrop(8)(wallets?.total_in_btc))}
            </p>
            <p className="wallet-total__extra">
              <span className="wallet-total__cur">
                {L.translate('Wallets.btc')}
              </span>
              ≈ ${numberWithCommas(toCrop(2)(wallets?.total_in_usd))}
            </p>
          </div>
        ) : (
          <div className="wallet-total">
            <p className="wallet-total__main">*********</p>
            <p className="wallet-total__extra" />
          </div>
        )}
      </div>
      <div className="account-box">
        {/* <div className="account-table">
          <p className="account-subtitle">Fiat Balance</p>
          <div className="table-box">
            <SpotWalletsTable data={fiat} />
          </div>
        </div> */}
        {/* account-table--mt */}
        <div className="account-table">
          <p className="account-subtitle">
            {L.translate('Wallets.crypto_fiat_balance')}
          </p>
          <SpotWalletsTable data={tableItems} />
        </div>
      </div>
    </div>
  );
};

export default SpotWallets;
