import React from 'react';
import { useDispatch } from 'react-redux';
import L from 'i18n-react';
import types from '../../../../../redux/types';
import { closeModal } from '../../../../Base/Modal';

const ModalDisableKey = ({ APIKey }) => {
  const dispatch = useDispatch();

  const handleSubmit = () => {
    dispatch({ type: types.DISABLE_TOKENS_START, payload: APIKey });
    closeModal();
  };

  return (
    <>
      <div className="theme-modal theme-modal--regular">
        <button type="button" className="close-modal" onClick={closeModal}>
          <i className="fa fa-times" />
        </button>
        <div className="modal-header">
          <p className="modal-subtitle">
            {APIKey.status
              ? L.translate('UsersPage.ApiManagement.confirm_disable')
              : L.translate('UsersPage.ApiManagement.confirm_activate')}
          </p>
        </div>
        <div className="modal-actions">
          <button
            type="button"
            className="page-btn page-btn--type2"
            onClick={closeModal}
          >
            {L.translate('Global.cancel')}
          </button>
          <button type="button" className="page-btn" onClick={handleSubmit}>
            {L.translate('Global.confirm')}
          </button>
        </div>
      </div>
    </>
  );
};

export default ModalDisableKey;
