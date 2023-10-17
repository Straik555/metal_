import React, { useState } from 'react';
import L from 'i18n-react';
import { closeModal } from '../../Modal';
import MarginBorrow from './MarginBorrow';
import Repay from './Repay';
import MarginTransfer from './MarginTransfer';

const ModalMargin = ({ active, assetCode }) => {
  const [modal, setModal] = useState(active);
  const handleTabChange = ({ target }) => {
    setModal(target.value);
  };

  const content = {
    transfer: <MarginTransfer assetCode={assetCode} />,
    borrow: <MarginBorrow assetCode={assetCode} />,
    repay: <Repay assetCode={assetCode} />,
  };

  return (
    <div className="theme-modal theme-modal--margin-type ">
      <button type="button" className="close-modal" onClick={closeModal}>
        <i className="fa fa-times" />
      </button>
      <div className="modal-tab">
        <button
          type="button"
          value="borrow"
          className={
            modal === 'borrow' ? 'modal-tab__item active' : 'modal-tab__item'
          }
          onClick={handleTabChange}
        >
          {L.translate('Wallets.borrow')}
        </button>
        <button
          type="button"
          value="repay"
          className={
            modal === 'repay' ? 'modal-tab__item active' : 'modal-tab__item'
          }
          onClick={handleTabChange}
        >
          {L.translate('Wallets.repay')}
        </button>
        <button
          type="button"
          value="transfer"
          className={
            modal === 'transfer' ? 'modal-tab__item active' : 'modal-tab__item'
          }
          onClick={handleTabChange}
        >
          {L.translate('Wallets.transfer')}
        </button>
      </div>
      {content[modal]}
    </div>
  );
};

export default ModalMargin;
