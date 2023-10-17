import React from 'react';
import { useDispatch } from 'react-redux';
import L from 'i18n-react';
import types from '../../../../../../../../redux/types';
import { closeModal } from '../../../../../../../Base/Modal';

const Modal = props => {
  const dispatch = useDispatch();
  const { code } = props;

  const handleCancel = () => {
    if (!code) {
      dispatch({
        type: types.SPOT_CANCEL_ALL_ORDERS_START,
      });
      return;
    }
    dispatch({
      type: types.SPOT_CANCEL_ALL_ORDERS_START,
      payload: { asset_code: code },
    });
  };

  return (
    <div className="trade-modal trade-modal--type2">
      <div className="trade-modal__header">
        <h2 className="modal-text">
          {L.translate('Trading.tableBlock.are_you_sure', {
            code: code.toUpperCase(),
          })}
        </h2>
        <button type="button" className="close-modal" onClick={closeModal}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xlink="http://www.w3.org/1999/xlink"
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
              onClick={closeModal}
            >
              {L.translate('Global.cancel')}
            </button>
          </div>
          <div className="modal-btns__col">
            <button
              type="button"
              className="page-btn  page-btn--small page-btn--full"
              onClick={handleCancel}
            >
              {L.translate('Trading.tableBlock.cancel_all')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
