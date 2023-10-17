import React from 'react';
import { NavLink } from 'react-router-dom';
import L from 'i18n-react';
import SelectWrap from '../base/SelectWrap';
import routes from '../../../../routes';

const SelectBuyCrypto = () => {
  return (
    <SelectWrap
      title={L.translate('Header.SelectBuyCrypto.buy_crypto')}
      listenerID="BuyCrypto"
    >
      <ul className="drop-list__item">
        <li>
          <NavLink to={routes.BuyCrypto.Exchange.path} className="drop-btn">
            {L.translate('Header.SelectBuyCrypto.exchange')}
          </NavLink>
        </li>
      </ul>
    </SelectWrap>
  );
};

export default SelectBuyCrypto;
