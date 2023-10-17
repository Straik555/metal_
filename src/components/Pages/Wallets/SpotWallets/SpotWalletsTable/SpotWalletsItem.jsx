/* eslint-disable react/prop-types */
import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import L from 'i18n-react';
import routes from '../../../../../routes';
import types from '../../../../../redux/types';
import { formatBalance } from '../../../../../services/helpers';
import { formatTradingPair } from './utils/utils';

const SpotWalletsItem = ({ wallet }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const {
    balance,
    total,
    frozen_balance: frozenBalance,
    asset: { code, type, name },
  } = wallet;

  const isTraidingWallet = type !== 'fiat';

  const formattedTotal = formatBalance(total, code);
  const formattedBalance = formatBalance(balance, code);
  const formattedFrozen = formatBalance(frozenBalance, code);

  const handleDeposit = () => {
    history.push(
      `${routes.Wallets.SpotWallets.Options.Deposit.path}/${wallet.asset.code}`,
    );
  };

  const handleWithdrawal = () => {
    history.push(
      `${routes.Wallets.SpotWallets.Options.Withdraw.path}/${wallet.asset.code}`,
    );
  };

  const handleTrade = e => {
    const { name: spotName } = e.target;
    if (spotName) {
      const traidingPair = formatTradingPair(spotName);

      dispatch({
        type: types.SET_CURRENT_PAIR_START,
        payload: traidingPair,
      });
    }
    history.push(routes.Trade.SpotTrade.path);
  };

  return (
    <tr data-tr={code?.toUpperCase()}>
      <td data-label={type?.toUpperCase()}>
        <div className="table-coin">
          <div className="table-coin__img">
            <img src={wallet.asset.img_path} alt="Coin img" />
          </div>
          <p className="table-coin__name">{code?.toUpperCase()}</p>
          <a href="#" className="table-coin__link">
            {name}
          </a>
        </div>
      </td>
      <td data-label={L.translate('Wallets.total')}>
        <p>{formattedTotal}</p>
      </td>
      <td data-label={L.translate('Wallets.available')}>
        <p>{formattedBalance}</p>
      </td>
      <td data-label={L.translate('Wallets.locked')}>
        <p>{formattedFrozen}</p>
      </td>
      <td data-label={L.translate('Wallets.action')}>
        <div className="table-action table-action--start">
          <button
            type="button"
            className="table-action__btn"
            onClick={handleDeposit}
          >
            {L.translate('Wallets.deposit')}
          </button>
          <button
            type="button"
            className="table-action__btn"
            onClick={handleWithdrawal}
          >
            {L.translate('Wallets.withdrawal')}
          </button>
          {isTraidingWallet && (
            <button
              type="button"
              className="table-action__btn"
              name={code}
              onClick={handleTrade}
            >
              {L.translate('Wallets.trade')}
            </button>
          )}
        </div>
      </td>
    </tr>
  );
};

export default SpotWalletsItem;
