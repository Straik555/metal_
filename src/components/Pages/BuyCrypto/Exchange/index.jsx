import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import L from 'i18n-react';
import types from '../../../../redux/types';
import CoinSection from './CoinSection';
import TransferBlock from './TransferBlock';
import ExchangeHistory from './ExchangeHistory';
import { tokenSelector } from '../../../../redux/auth/selectors';
import { assetPairsSelector } from '../../../../redux/pairs/selectors';
import { assetsWalletSelector } from '../../../../redux/wallets/selectors';

const Exchange = () => {
  const assetsPairs = useSelector(assetPairsSelector);
  const assets = useSelector(assetsWalletSelector);
  const token = useSelector(tokenSelector);
  const isLogin = token && axios.defaults.headers.common.Authorization;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: types.GET_ASSET_PAIRS_START });
  }, [dispatch]);

  return (
    <section className="page-section">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-11">
            <p className="section-title">
              {L.translate('BuyCrypto.instant_exchange')}
            </p>
          </div>
        </div>
      </div>

      <TransferBlock
        assetsPairs={assetsPairs}
        assets={assets}
        isLogin={isLogin}
      />
      {/* commented beacuse it's emty & crashing ExchangeHistory block */}
      {/* <CoinSection /> */}

      {isLogin && <ExchangeHistory />}
    </section>
  );
};

export default Exchange;
