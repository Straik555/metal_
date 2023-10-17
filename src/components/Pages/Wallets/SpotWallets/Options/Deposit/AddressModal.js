import React from 'react';
import { closeModal } from '../../../../../Base/Modal';

function MemoModal({ context }) {
  const handleCloseModal = () => closeModal();

  return (
    <div className="theme-modal theme-modal--medium">
      <button onClick={handleCloseModal} type="button" className="close-modal">
        <svg
          width="15"
          height="15"
          viewBox="0 0 15 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1.72431 0.281387C1.53527 0.0987908 1.28208 -0.00224601 1.01927 3.78936e-05C0.756455 0.00232179 0.505056 0.107744 0.319214 0.293598C0.133373 0.479452 0.0279575 0.730868 0.0256738 0.993696C0.02339 1.25652 0.12442 1.50973 0.307004 1.69879L6.09551 7.48768L0.306002 13.2766C0.210268 13.369 0.133908 13.4797 0.0813763 13.602C0.0288447 13.7243 0.00119436 13.8558 3.78454e-05 13.9889C-0.00111867 14.122 0.024242 14.254 0.0746405 14.3772C0.125039 14.5004 0.199466 14.6123 0.293578 14.7064C0.38769 14.8005 0.499604 14.875 0.622787 14.9254C0.745971 14.9758 0.877958 15.0011 1.01105 15C1.14414 14.9988 1.27567 14.9712 1.39795 14.9186C1.52024 14.8661 1.63085 14.7897 1.72331 14.694L7.51282 8.90508L13.3013 14.694C13.4904 14.8766 13.7436 14.9776 14.0064 14.9753C14.2692 14.973 14.5206 14.8676 14.7064 14.6818C14.8923 14.4959 14.9977 14.2445 15 13.9817C15.0022 13.7188 14.9012 13.4656 14.7186 13.2766L8.93013 7.48768L14.7186 1.69879C14.9012 1.50973 15.0022 1.25652 15 0.993696C14.9977 0.730868 14.8923 0.479452 14.7064 0.293598C14.5206 0.107744 14.2692 0.00232179 14.0064 3.78936e-05C13.7436 -0.00224601 13.4904 0.0987908 13.3013 0.281387L7.51282 6.07028L1.72431 0.280385V0.281387Z"
            fill="#080A0D"
          />
        </svg>
      </button>
      <div className="modal-icon modal-icon--big modal-icon--success">
        <svg
          className="stroke"
          width="70"
          height="71"
          viewBox="0 0 70 71"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M20.7775 1.75H48.7225L68.5 21.5275V49.4725L48.7225 69.25H20.7775L1 49.4725V21.5275L20.7775 1.75Z"
            stroke="#00D496"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M35 19L35 39"
            stroke="#00D496"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M35 49H35.0329"
            stroke="#00D496"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <div className="modal-text modal-text--type2">
        {context === 'memo' && (
          <>
            Please enter both Tag and Address data, which are required to
            deposit XRP to your Binance account successfully
          </>
        )}
        {context === 'eth' && (
          <>
            This deposit address supports ERC20 tokens. We will automatically
            convert your tokens to the Mainnet.
          </>
        )}
      </div>
      <div className="modal-actions">
        <button
          type="button"
          onClick={handleCloseModal}
          className="page-btn page-btn--full"
        >
          I understand
        </button>
      </div>
    </div>
  );
}

export default MemoModal;
