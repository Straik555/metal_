import React from 'react';
import { useSelector } from 'react-redux';
import { store } from '../../../redux/store';
import types from '../../../redux/types';

export const openModal = Dom => {
  if (Dom) {
    store.dispatch({
      type: types.SET_MODAL_START,
      payload: { status: true, Dom },
    });
  }
};

export const closeModal = () => {
  store.dispatch({
    type: types.SET_MODAL_START,
    payload: { status: false, Dom: null },
  });
};

export const Modal = () => {
  const status = useSelector(store => store.modal.status);
  const Dom = useSelector(store => store.modal.Dom);
  const close = e => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };
  return (
    <>
      {status ? (
        <div className="modal-wrapper">
          <div
            className="modal-wrapper__inner"
            role="presentation"
            onClick={close}
          >
            {Dom ? <Dom /> : null}
          </div>
        </div>
      ) : null}
    </>
  );
};
