import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import L from 'i18n-react';
import SearchInput from '../../SearchInput';
import types from '../../../../../redux/types';
import notification from '../../../../../services/notification';
import { numberValidation, toCrop } from '../../../../../services/helpers';
import PercentButton from '../../PercentButton';
import {
  marginSingleBorrowWalletSelector,
  marginWalletSelector,
} from '../../../../../redux/wallets/selectors';

const MarginBorrow = ({ assetCode }) => {
  const dispatch = useDispatch();
  const [amount, setAmount] = useState(''); // amount actions
  const [code, setCode] = useState(assetCode || 'btc');
  const coins = useSelector(marginWalletSelector);
  const listCoins = coins && Object.values(coins);
  const wallet = coins[code];
  const singleBorrow = useSelector(marginSingleBorrowWalletSelector);

  const changeAmount = e => {
    if (numberValidation(e.target.value)) {
      setAmount(e.target.value);
    }
  };

  const handlePercent = e => {
    setAmount(toCrop(8)(singleBorrow.max_borrow * e.target.value));
  };

  const handleSelect = e => {
    const code = e?.currentTarget?.dataset?.code;
    if (code) {
      setCode(code);
    }
  };

  const handleSubmit = () => {
    if (+singleBorrow.max_borrow < +amount) {
      notification({
        type: 'error',
        title: L.translate('Base.Modals.ModalMargin.MarginBorrow.error_title'),
        message: L.translate('Base.Modals.amount_is_bigger'),
      });
      return;
    }

    if (!amount) {
      notification({
        type: 'error',
        title: L.translate('Base.Modals.ModalMargin.MarginBorrow.error_title'),
        message: L.translate('Base.Modals.enter_amount'),
      });
      return;
    }

    dispatch({
      type: types.MARGIN_POST_BORROW_START,
      payload: {
        asset_id: wallet?.asset?.id,
        amount,
      },
    });
  };

  useEffect(() => {
    if (wallet?.asset?.id) {
      dispatch({
        type: types.MARGIN_GET_SINGLE_BORROW_START,
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
              {L.translate(
                'Base.Modals.ModalMargin.MarginBorrow.hourly_inrerest_rate',
              )}
              :
              <span className="hint-wrap">
                <i className="fa fa-info-circle" />
                <span className="hint">
                  <span className="hint-block">
                    {L.translate(
                      'Base.Modals.ModalMargin.MarginBorrow.interest_text',
                    )}
                  </span>
                </span>
              </span>
            </p>
            <p className="margin-info__val">
              {toCrop(8)(singleBorrow.interest)} %
            </p>
          </div>
          <div className="d-flex margin-info">
            <p className="margin-info__title">
              {L.translate('Base.Modals.ModalMargin.MarginBorrow.borrowed')}:
            </p>
            <p className="margin-info__val">{`${toCrop(8)(
              singleBorrow.borrowed,
            )} ${code.toUpperCase()}`}</p>
          </div>
          <div className="d-flex margin-info">
            <p className="margin-info__title">
              {L.translate(
                'Base.Modals.ModalMargin.MarginBorrow.maximum_borrow',
              )}
              :
            </p>
            <p className="margin-info__val">{`${toCrop(8)(
              singleBorrow.max_borrow,
            )} ${code.toUpperCase()}`}</p>
          </div>
        </div>

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
              <span>{toCrop(8)(singleBorrow.max_borrow)}</span>
            </span>
          </div>
          <PercentButton handlePercent={handlePercent} />
        </div>
      </div>

      <div className="modal-footer">
        <button
          type="button"
          className="page-btn page-btn--full-width"
          onClick={handleSubmit}
        >
          {L.translate('Base.Modals.ModalMargin.MarginBorrow.confirm_borrow')}
        </button>
      </div>
    </>
  );
};

export default MarginBorrow;
