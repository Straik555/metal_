import React from 'react';
import L from 'i18n-react';
import { useDispatch } from 'react-redux';
import { closeModal } from '../../Modal';
import types from '../../../../redux/types';

const Modal = ({ token }) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch({
      type: types.UPDATE_TOKEN_DISKOUNT_START,
      payload: { token_discount: 0 },
    });
    closeModal();
  };
  return (
    <div className="theme-modal theme-modal--regular">
      <button type="button" className="close-modal" onClick={closeModal}>
        <i className="fa fa-times" />
      </button>
      <div className="modal-header">
        <p className="modal-title">
          {L.translate('UsersPage.Dashboard.DownPanel.Modal.title', {
            name: token,
          })}
        </p>
      </div>
      <div className="modal-text modal-text--type2">
        {L.translate('UsersPage.Dashboard.DownPanel.Modal.text')}
      </div>
      <div className="modal-actions">
        <button
          type="button"
          className="page-btn page-btn--type2"
          onClick={closeModal}
        >
          {L.translate('UsersPage.Dashboard.DownPanel.Modal.keep_it_on')}
        </button>
        <button type="button" className="page-btn" onClick={handleClick}>
          {L.translate('UsersPage.Dashboard.DownPanel.Modal.off')}
        </button>
      </div>
    </div>
  );
};

export default Modal;
