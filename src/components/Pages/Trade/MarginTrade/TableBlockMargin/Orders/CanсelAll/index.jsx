import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import L from 'i18n-react';
import { openModal } from '../../../../../../Base/Modal';
import Modal from './Modal';
import { assetsWalletSelector } from '../../../../../../../redux/wallets/selectors';
import { assetPairsSelector } from '../../../../../../../redux/pairs/selectors';

const CanсelAll = () => {
  const [open, setOpen] = useState(false);
  const assets = useSelector(assetsWalletSelector);
  const assetsPairs = useSelector(assetPairsSelector);

  const handleOpenList = () => {
    setOpen(!open);
  };

  const handleOpenModal = assetsName => {
    openModal(() => <Modal code={assetsName} />);
    setOpen(false);
  };

  const handleBlur = () => {
    // without setTimeout the dropdown will close before we select asset
    setTimeout(() => {
      setOpen(false);
    }, 300);
  };

  return (
    <div className="table-drop-block ">
      <ul
        className={`trade-drop trade-drop--type2 ${open ? 'active' : ''} `}
        onBlur={handleBlur}
      >
        <li>
          <Link to="#" onClick={handleOpenList}>
            {L.translate('Trading.tableBlock.cancel_all')}
            <span className="drop-arrow">
              <i className="fa fa-angle-down" />
            </span>
          </Link>
          <ul className="trade-drop__list">
            <li>
              <Link to="#" onClick={() => handleOpenModal('')}>
                {L.translate('Trading.tableBlock.all')}
              </Link>
            </li>
            {assets
              .filter(asset =>
                assetsPairs.some(
                  pairs =>
                    pairs.code.startsWith(asset.code) ||
                    pairs.code.endsWith(asset.code),
                ),
              )
              .map(asset => (
                <li key={asset.id}>
                  <Link to="#" onClick={() => handleOpenModal(asset.code)}>
                    {asset.code.toUpperCase()}
                  </Link>
                </li>
              ))}
          </ul>
        </li>
      </ul>
    </div>
  );
};

export default CanсelAll;
