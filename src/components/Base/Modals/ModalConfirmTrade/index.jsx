import React from 'react';
import { useSelector } from 'react-redux';
import L from 'i18n-react';

import { currentPairSelector } from '../../../../redux/currentPair/selectors';
import { lastPriceSelector } from '../../../../redux/trade/spot/selectors';
import { closeModal } from '../../Modal';

function ModalConfirmTrade({ setAllStateToInit, createTrade, mode }) {
  const handleCancel = () => {
    closeModal();
    setAllStateToInit();
  };

  const handleConfirm = () => {
    createTrade();
    closeModal();
    setAllStateToInit();
  };
  return (
    <div className="trade-modal trade-modal--type2 ">
      <div className="trade-modal__header  ">
        <h2 className="modal-text  ">
          {mode === 'Buy'
            ? L.translate('Base.Modals.higherThanPrice')
            : L.translate('Base.Modals.lessThanPrice')}
        </h2>
        <button type="button" className="close-modal" onClick={closeModal}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            // xmlns:xlink="http://www.w3.org/1999/xlink"
            width="15px"
            height="15px"
          >
            <path
              fillRule="evenodd"
              fill="rgb(53, 64, 82)"
              d="M14.987,13.739 L13.739,14.987 L7.500,8.748 L1.261,14.987 L0.013,13.739 L6.252,7.500 L0.013,1.261 L1.261,0.013 L7.500,6.252 L13.739,0.013 L14.987,1.261 L8.748,7.500 L14.987,13.739 Z"
            />
          </svg>
        </button>
      </div>

      <div className="trade-modal__body trade-modal__body--type2">
        <div className="modal-btns modal-btns--type2">
          <div className="modal-btns__col">
            <button
              type="button"
              className="page-btn page-btn--small  page-btn--type4 page-btn--full"
              onClick={handleCancel}
            >
              {L.translate('Global.cancel')}
            </button>
          </div>
          <div className="modal-btns__col">
            <button
              type="button"
              className="page-btn  page-btn--small page-btn--full"
              onClick={handleConfirm}
            >
              {L.translate('Global.confirm')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalConfirmTrade;
