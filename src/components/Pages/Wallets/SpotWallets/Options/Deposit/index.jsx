import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useParams } from 'react-router-dom';
import L from 'i18n-react';
import Loader from '../../../../../Base/Loader';
import {
  loadingWalletSelector,
  spotWalletSelector,
} from '../../../../../../redux/wallets/selectors';
import { formatBalance } from '../../../../../../services/helpers';
import CryptoDepositTable from './CryptoDepositTable';
import { checkIsSpotExist } from '../OptionsHelpers';
import routes from '../../../../../../routes';
import { CryptoForm } from './CryptoForm';
import { PaymentSystemForm } from './PaymentSystemForm';
import { currentAssetFeesSelector } from '../../../../../../redux/fees/selectors';
import types from '../../../../../../redux/types';
import { DepositGoldForm } from './DepolistGoldForm';

const CryptoDeposite = () => {
  const { code } = useParams();
  const isLoading = useSelector(loadingWalletSelector);
  const allSpots = useSelector(spotWalletSelector);
  const assetComissions = useSelector(currentAssetFeesSelector);
  const [redirect, setRedirect] = useState(false);
  const [buyMtcg, setBuyMtcg] = useState(false)
  const dispatch = useDispatch();

  const spot = allSpots[code];
  const walletName = spot?.asset?.code?.toUpperCase();
  const formattedBalance = formatBalance(spot?.balance, spot?.asset?.code);
  const translatePath = 'Wallets.Spot.CryptoDeposit';
  const showCommissionsInfo = spot?.asset?.code !== 'gold';

  const chooseCorrectForm = assetCode => {
    switch (assetCode) {
      case 'usd':
      case 'eur':
        return <PaymentSystemForm spot={spot} />;
      case 'gold':
        return <DepositGoldForm crypt={'gold'} spot={spot} />;
      case 'mtcg':
        return buyMtcg ? <DepositGoldForm crypt={'mtcg'} spot={spot} /> : <CryptoForm spot={spot} />
      default:
        return <CryptoForm spot={spot} />;
    }
  };

  useEffect(() => {
    // necessary check because user can enter manually incorrect spot code in browser line
    // useEffect has been used because at the first render allSpots === {}

    if (!checkIsSpotExist(allSpots, code)) setRedirect(true);
  }, [allSpots, code]);

  useEffect(() => {
    const assetID = spot?.asset?.id;

    if (assetID === undefined) return;
    dispatch({
      type: types.GET_ASSET_FEES_START,
      assetID,
    });
  }, [dispatch, spot]);

  if (isLoading) return <Loader />;
  if (redirect) return <Redirect to={routes.Wallets.SpotWallets.path} />;

  return (
    <div className="account-box">
      <div className="deposit-wrap">
        {
          code === 'mtcg' && (
            <div className={'f-nav'}>
              <button className="page-btn" style={buyMtcg ? {background: 'silver', marginRight: '20px'}: {marginRight: '20px'}} onClick={() =>  setBuyMtcg(false)}>Crypto Wallet</button>
              <button className="page-btn" style={!buyMtcg ? {background: 'silver'}: null} onClick={() => setBuyMtcg(true)}>Payment System</button>
            </div>
          )
        }
        <div className="operation-main-info">
          <div className="operation-balance__list operation-balance__list--type2">
            <div className="wallet-balance">
              <p className="wallet-balance__title">
                {L.translate(`${translatePath}.total_balance`)}
              </p>
              {formattedBalance !== undefined && (
                <span className="wallet-balance__val">
                  {formattedBalance} <span>{walletName}</span>
                </span>
              )}
            </div>
            {showCommissionsInfo && (
              <div className="help-text">
                <p>
                  {L.translate(`${translatePath}.commission_note`, {
                    code: assetComissions?.deposit_fee,
                  })}
                </p>
              </div>
            )}
          </div>
        </div>
        {chooseCorrectForm(code)}
      </div>
      <CryptoDepositTable />
    </div>
  );
};

export default CryptoDeposite;
