import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import L from 'i18n-react';
import SearchInput from '../../SearchInput';
import types from '../../../../../redux/types';
import notification from '../../../../../services/notification';
import { numberValidation, toCrop } from '../../../../../services/helpers';
import PercentButton from '../../PercentButton';
import { marginWalletSelector } from '../../../../../redux/wallets/selectors';
import { singleRepaySelector } from '../../../../../redux/trade/margin/selectors';

export const translatePath = 'Notifications.MarginRepay';

const MarginRepay = ({ assetCode }) => {
  const dispatch = useDispatch();
  const [amount, setAmount] = useState(''); // amount actions
  const [code, setCode] = useState(assetCode || 'btc');
  const coins = useSelector(marginWalletSelector);
  const listCoins = coins && Object.values(coins);
  const wallet = coins && coins[code];
  const singleRepay = useSelector(singleRepaySelector);
  const changeAmount = e => {
    if (numberValidation(e.target.value)) {
      setAmount(e.target.value);
    }
  };
  const handlePercent = e => {
    setAmount(toCrop(8)(+singleRepay.total_debt * e.target.value));
  };
  const handleSelect = e => {
    const code = e?.currentTarget?.dataset?.code;
    if (code) {
      setCode(code);
    }
  };
  const handleSubmit = () => {
    if (+singleRepay.total_debt < +amount) {
      notification({
        type: 'error',
        message: L.translate(`${translatePath}.amount_balance_error`),
      });
      return;
    }
    if (!amount) {
      notification({
        type: 'error',
        message: L.translate(`${translatePath}.amount_value_error`),
      });
      return;
    }

    dispatch({
      type: types.MARGIN_POST_REPAY_START,
      payload: {
        asset_id: wallet?.asset?.id,
        amount,
      },
    });
  };
  useEffect(() => {
    if (wallet?.asset?.id) {
      dispatch({
        type: types.MARGIN_GET_SINGLE_REPAY_START,
        payload: { asset_id: wallet.asset.id },
      });
    }
  }, [code]);

  return (
    <>
      <div className="modal-body">
        <SearchInput
          listCoins={listCoins}
          onSelect={handleSelect}
          coin={coins[code]}
        />
        <div className="margin-detail">
          <div className="d-flex margin-info">
            <p className="margin-info__title">
              {L.translate('Wallets.available_balance')}:
            </p>
            <p className="margin-info__val">
              {`${toCrop(8)(
                wallet.available_balance,
              )} ${wallet.asset.code.toUpperCase()}`}
            </p>
          </div>

          <div className="d-flex margin-info">
            <p className="margin-info__title">
              {L.translate('Base.Modals.ModalMargin.Repay.interest_a')}
              <span className="hint-wrap">
                <span className="hint">
                  <span className="hint-block">
                    {L.translate('Base.Modals.ModalMargin.Repay.interest_text')}
                  </span>
                </span>

                <i className="fa fa-info-circle" />
              </span>
            </p>
            <p className="margin-info__val">{`${toCrop(8)(
              singleRepay.interest,
            )} ${wallet.asset.code.toUpperCase()}`}</p>
          </div>
          <div className="d-flex margin-info">
            <p className="margin-info__title">
              {L.translate('Base.Modals.ModalMargin.Repay.borrowed_b')}
            </p>
            <p className="margin-info__val">{`${toCrop(8)(
              singleRepay.borrowed,
            )} ${wallet.asset.code.toUpperCase()}`}</p>
          </div>

          <div className="d-flex margin-info">
            <p className="margin-info__title">
              {L.translate('Base.Modals.ModalMargin.Repay.total_debt')}
            </p>
            <p className="margin-info__val">{`${toCrop(8)(
              singleRepay.total_debt,
            )} ${wallet.asset.code.toUpperCase()}`}</p>
          </div>
        </div>

        {+singleRepay.borrowed ? (
          <div className="modal-field">
            <span className="field-label field-label--type2">
              {L.translate('Wallets.amount')}
            </span>
            <div className="field-wrap">
              <input
                type="text"
                className="form-item form-item--available"
                value={amount}
                onChange={changeAmount}
                placeholder={0}
              />
              <span className="available-label">
                {L.translate('Wallets.available')}:{' '}
                <span>{toCrop(8)(singleRepay.total_debt)}</span>
              </span>
            </div>
            <PercentButton handlePercent={handlePercent} />
          </div>
        ) : (
          <div className="info-hint">
            <span className="info-hint__icon">
              <i className="fa fa-info-circle" />
            </span>
            {wallet.asset.code ? (
              <p className="info-hint__text">
                {L.translate('Base.Modals.ModalMargin.Repay.you_borrowed', {
                  code: wallet.asset.code.toUpperCase(),
                })}
              </p>
            ) : (
              <p className="info-hint__text">
                {L.translate('Base.Modals.ModalMargin.Repay.select_asset')}
              </p>
            )}
          </div>
        )}
      </div>
      <div className="modal-footer">
        <button
          type="button"
          className="page-btn page-btn--full-width"
          onClick={handleSubmit}
        >
          {L.translate('Base.Modals.ModalMargin.Repay.confirm_repayment')}
        </button>
      </div>
    </>
  );
};

export default MarginRepay;
