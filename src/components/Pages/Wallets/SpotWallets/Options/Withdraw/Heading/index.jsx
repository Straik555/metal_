/* eslint-disable react/prop-types */
import React from 'react';
import L from 'i18n-react';

export const Heading = ({ spotBalance, currencyCode }) => {
  const code = currencyCode?.toUpperCase();
  const isGold = code === 'GOLD';
  return (
    <div
      className="col-lg-12"
      style={isGold ? { marginBottom: '30px', padding: 0 } : {}}
    >
      <div className="operation-balance">
        <div className="operation-balance__list operation-balance__list--type2">
          <div className="wallet-balance">
            <p className="wallet-balance__title">
              {L.translate('Wallets.Spot.CryptoWithdraw.heading')}
            </p>
            {spotBalance !== undefined && (
              <span className="wallet-balance__val">
                {spotBalance} <span>{code}</span>
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
