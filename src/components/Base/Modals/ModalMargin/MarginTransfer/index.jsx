import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import L from 'i18n-react';
import SearchInput from '../../SearchInput';
import MarginWallet from '../../wallets/MarginWallet';
import SpotWallet from '../../wallets/SpotWallet';
import notification from '../../../../../services/notification';
import types from '../../../../../redux/types';
import PercentButton from '../../PercentButton';
import { numberValidation, toCrop } from '../../../../../services/helpers';
import {
  marginWalletSelector,
  spotWalletSelector,
} from '../../../../../redux/wallets/selectors';

const MarginTransfer = ({ assetCode }) => {
  const dispatch = useDispatch();
  const spot = useSelector(spotWalletSelector);
  const margin = useSelector(marginWalletSelector);
  const [code, setCode] = useState(assetCode || 'btc');
  const [direction, setDirection] = useState(true);
  const coins = direction ? spot : margin;
  const [amount, setAmount] = useState('');
  const listCoins = coins && Object.values(coins);
  const balance = coins ? coins[code]?.equity || coins[code]?.balance : 0;
  const handleDirection = () => {
    setDirection(prevState => !prevState);
  };

  const changeAmount = e => {
    if (numberValidation(e.target.value)) {
      setAmount(e.target.value);
    }
  };
  const handlePercent = e => {
    setAmount(toCrop(8)(balance * e.target.value));
  };

  const handleSelect = e => {
    const code = e?.currentTarget?.dataset?.code;
    if (code) {
      setCode(code);
    }
  };
  const handleSubmit = () => {
    if (+balance < +amount) {
      notification({
        type: 'error',
        title: L.translate(
          'Base.Modals.ModalMargin.MarginTransfer.margin_transfers',
        ),
        message: L.translate('Base.Modals.amount_is_bigger'),
      });
      return;
    }
    if (!amount) {
      notification({
        type: 'error',
        title: L.translate(
          'Base.Modals.ModalMargin.MarginTransfer.margin_transfers',
        ),
        message: L.translate('Base.Modals.enter_amount'),
      });
      return;
    }
    dispatch({
      type: types.MARGIN_POST_TRANSFORM_START,
      payload: {
        type: direction,
        data: {
          asset_id: coins[code].asset.id,
          amount,
        },
      },
    });
  };
  useEffect(() => {
    setAmount('');
  }, [direction]);
  return (
    <>
      <div className="modal-body">
        <div className="d-flex transfer">
          <div className="transfer__col">
            <span className="field-label field-label--type2">
              {L.translate('Wallets.from')}
            </span>
            {direction ? <SpotWallet /> : <MarginWallet />}
          </div>

          <button
            className="transfer__icon"
            type="button"
            onClick={handleDirection}
          >
            <i className="fas fa-exchange-alt" />
          </button>

          <div className="transfer__col">
            <span className="field-label field-label--type2">
              {L.translate('Wallets.to')}
            </span>
            {direction ? <MarginWallet /> : <SpotWallet />}
          </div>
        </div>

        <SearchInput
          listCoins={listCoins}
          onSelect={handleSelect}
          coin={coins[code]}
        />

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
              <span>{toCrop(8)(balance)}</span>
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
          {L.translate('Base.Modals.confirm_transfer')}
        </button>
      </div>
    </>
  );
};

export default MarginTransfer;
