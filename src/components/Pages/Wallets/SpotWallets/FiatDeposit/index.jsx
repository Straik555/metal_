import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import L from 'i18n-react';
import { closeModal } from '../../../../Base/Modal';
import types from '../../../../../redux/types';
import notification from '../../../../../services/notification';
import { downloadInvoice } from '../../../../Base/Invoice';
import { invoiceWalletSelector } from '../../../../../redux/wallets/selectors';
import { dataUserSelector } from '../../../../../redux/auth/selectors';
import { numberWithCommas } from '../../../../../services/helpers';

const FiatDeposit = ({ wallet }) => {
  const dispatch = useDispatch();
  const [amount, setAmount] = useState('');
  const [generate, setGenerate] = useState(false);
  const data = useSelector(invoiceWalletSelector);
  const userData = useSelector(dataUserSelector);
  const changeAmount = e => {
    const value = e?.currentTarget?.value;
    if (+value > 999999999) return;

    setAmount(value);
  };
  const generateInvoice = () => {
    if (amount < wallet.asset.deposit_min) {
      notification({
        type: 'error',
        title: L.translate('Wallets.deposit'),
        message: L.translate('Wallets.Spot.FiatDeposit.minimum_deposit', {
          value: wallet.asset.deposit_min,
        }),
      });
      return;
    }
    dispatch({
      type: types.POST_CREATE_BANK_DEPOSITE_REQUEST_START,
      setGenerate,
      payload: {
        amount,
        asset_id: wallet.asset.id,
      },
    });
  };
  const download = () => {
    if (data && userData && generate) {
      downloadInvoice({ data, userData });
    }
  };
  return (
    <>
      <div className="theme-modal  theme-modal--regular ">
        <button type="button" className="close-modal" onClick={closeModal}>
          <svg
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.72431 0.281387C1.53527 0.0987908 1.28208 -0.00224601 1.01927 3.78936e-05C0.756455 0.00232179 0.505056 0.107744 0.319214 0.293598C0.133373 0.479452 0.0279575 0.730868 0.0256738 0.993696C0.02339 1.25652 0.12442 1.50973 0.307004 1.69879L6.09551 7.48768L0.306002 13.2766C0.210268 13.369 0.133908 13.4797 0.0813763 13.602C0.0288447 13.7243 0.00119436 13.8558 3.78454e-05 13.9889C-0.00111867 14.122 0.024242 14.254 0.0746405 14.3772C0.125039 14.5004 0.199466 14.6123 0.293578 14.7064C0.38769 14.8005 0.499604 14.875 0.622787 14.9254C0.745971 14.9758 0.877958 15.0011 1.01105 15C1.14414 14.9988 1.27567 14.9712 1.39795 14.9186C1.52024 14.8661 1.63085 14.7897 1.72331 14.694L7.51282 8.90508L13.3013 14.694C13.4904 14.8766 13.7436 14.9776 14.0064 14.9753C14.2692 14.973 14.5206 14.8676 14.7064 14.6818C14.8923 14.4959 14.9977 14.2445 15 13.9817C15.0022 13.7188 14.9012 13.4656 14.7186 13.2766L8.93013 7.48768L14.7186 1.69879C14.9012 1.50973 15.0022 1.25652 15 0.993696C14.9977 0.730868 14.8923 0.479452 14.7064 0.293598C14.5206 0.107744 14.2692 0.00232179 14.0064 3.78936e-05C13.7436 -0.00224601 13.4904 0.0987908 13.3013 0.281387L7.51282 6.07028L1.72431 0.280385V0.281387Z"
              fill="black"
            />
          </svg>
        </button>
        <div className="modal-header">
          <p className="modal-title"> {L.translate('Wallets.deposit')}</p>
        </div>
        <div className="modal-body">
          <div className="modal-field">
            <span className="field-label field-label--type2">
              {L.translate('Wallets.amount')}
            </span>
            <div className="field-wrap">
              <input
                type="text"
                className="form-item"
                placeholder="0"
                onChange={changeAmount}
                value={numberWithCommas(amount)}
              />
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <button
            disabled={amount <= 0 || generate}
            type="button"
            className="page-btn page-btn--full-width"
            onClick={generateInvoice}
          >
            {L.translate('Wallets.Spot.FiatDeposit.generate_invoice')}
          </button>
          <div className="download-invoice">
            <button
              type="button"
              disabled={generate === false}
              className="download-invoice__btn"
              onClick={download}
            >
              {L.translate('Wallets.Spot.FiatDeposit.download_invoice')}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default FiatDeposit;
