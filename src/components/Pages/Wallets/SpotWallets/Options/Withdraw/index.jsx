import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Redirect, useParams } from 'react-router-dom';
import { spotWalletSelector } from '../../../../../../redux/wallets/selectors';
import { Heading } from './Heading';
import routes from '../../../../../../routes';
import { checkIsSpotExist } from '../OptionsHelpers';
import { WithdrawCoinForm } from './WithdrawCoinForm';
import { WithdrawHistory } from './WithdrawHistory';
import { WithdrawGold } from './WithdrawGold';
import { formatBalance } from '../../../../../../services/helpers';
import { WithdrawFiatForm } from './WithdrawFiatForm';

const CryptoWithdraw = () => {
  // hooks
  const { code } = useParams();
  const allSpots = useSelector(spotWalletSelector);

  // state
  const [redirect, setRedirect] = useState(false);

  // using varriables
  const spot = allSpots[code];
  const perPage = 10;
  const isGold = code === 'gold';

  const formattedBalance = formatBalance(spot?.balance, code);

  const chooseCorrectForm = assetCode => {
    switch (assetCode) {
      case 'usd':
      case 'eur':
        return <WithdrawFiatForm spot={spot} />;

      default:
        return <WithdrawCoinForm spot={spot} perPage={perPage} />;
    }
  };

  useEffect(() => {
    // necessary check because user can enter manually incorrect spot code in browser line
    // useEffect has been used because at the first render allSpots === {}

    if (!checkIsSpotExist(allSpots, code)) setRedirect(true);
  }, [allSpots, code]);

  if (redirect) return <Redirect to={routes.Wallets.SpotWallets.path} />;
  return (
    <div className="account-box">
      {isGold ? (
        <WithdrawGold
          spot={spot}
          eurSpot={allSpots?.eur}
          perPage={perPage}
          code={code}
        />
      ) : (
        <>
          <div className="deposit-wrap">
            <div className="row operation-row ">
              <Heading spotBalance={formattedBalance} currencyCode={code} />
              {chooseCorrectForm(code)}
            </div>
          </div>
          <WithdrawHistory perPage={perPage} />
        </>
      )}
    </div>
  );
};

export default CryptoWithdraw;
