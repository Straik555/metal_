import React from 'react';
import { useHistory } from 'react-router-dom';
import routes from '../../../../../routes';

const OpenWallet = ({ onToggle }) => {
  const history = useHistory();

  const handleClose = e => {
    if (e.target !== e.currentTarget) return;
    history.push(routes.Trade.SpotTrade.path);
  };

  return (
    <div className="modal-wrapper" onClick={handleClose} aria-hidden="true">
      <div className="modal-wrapper__inner">
        <div className="theme-modal theme-modal--margin-type ">
          <button
            type="button"
            className="close-modal"
            onClick={() => {
              history.push(routes.Trade.SpotTrade.path);
            }}
          >
            <i className="fa fa-times" />
          </button>

          <div className="modal-header">
            <p className="modal-title">Important reminder</p>
          </div>
          <div className="modal-body">
            <div className="reminder">
              <div className="reminder__text">
                <p>
                  Margin trading confers a higher profit potential than
                  traditional trading, but also greater risk. Please, be aware
                  that in the event of extreme market volatility, there is even
                  a risk that your assets may be liquidated
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OpenWallet;
