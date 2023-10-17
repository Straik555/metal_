import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import L from 'i18n-react';
import types from '../../../../redux/types';
import routes from '../../../../routes';
import { hideEmail } from '../../../../services/helpers';
import { userSelector } from '../../../../redux/auth/selectors';
import {
  apiIcon,
  dashboardIcon,
  identificationIcon,
  logoutIcon,
  securityIcon,
} from './selectUserIcons';
import { getStatus } from './utils';
import { dropDownArrow } from '../../../../styles/img/icons';

const SelectUser = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector(userSelector);

  const handleLogout = () => {
    dispatch({ type: types.LOGOUT_START, payload: { history, type: 'back' } });
  };

  const diactiveteList = classList => {
    setTimeout(() => {
      classList.remove('active');
    }, 300);
  };

  return (
    <ul
      className="user-drop"
      onMouseOver={e => e.currentTarget.classList.add('active')}
      onFocus={e => e.currentTarget.classList.add('active')}
      onMouseOut={e => e.currentTarget.classList.remove('active')}
      onBlur={e => diactiveteList(e.currentTarget.classList)}
      style={{ paddingBottom: '5px' }}
    >
      <li>
        <button type="button" className="drop-btn" id="open-user-nav">
          <span className="drop-btn__inner">
            <span className="dtop-name">{hideEmail(user?.email)}</span>
            <span className="drop-btn__arrow">{dropDownArrow}</span>
            <span className="user-extra">
              <span
                className={
                  user?.status?.name !== 'approved'
                    ? 'user-extra__status user-extra__status--unverified'
                    : 'user-extra__status'
                }
              >
                {getStatus(user?.status?.name)}
              </span>
            </span>
          </span>
        </button>
        <div
          className="drop-list"
          onMouseOut={e =>
            e.currentTarget.parentNode.classList.remove('active')
          }
          onBlur={e => e.currentTarget.classList.remove('active')}
        >
          <ul className="drop-list__item">
            <li>
              <Link to={routes.User.Dashboard.path} className="drop-btn">
                <span className="drop-icon">{dashboardIcon}</span>
                {L.translate('Header.SelectUser.dashboard')}
              </Link>
            </li>
            <li>
              <Link to={routes.User.Security.path} className="drop-btn">
                <span className="drop-icon">{securityIcon}</span>
                {L.translate('Header.SelectUser.security')}
              </Link>
            </li>

            <li>
              <Link to={routes.User.Identification.path} className="drop-btn">
                <span className="drop-icon">{identificationIcon}</span>
                {L.translate('Header.SelectUser.identification')}
              </Link>
            </li>
            <li>
              <Link to={routes.User.ApiManagement.path} className="drop-btn">
                <span className="drop-icon">{apiIcon}</span>
                {L.translate('Header.SelectUser.API_management')}
              </Link>
            </li>
            <li>
              <button type="button" className="drop-btn" onClick={handleLogout}>
                <span className="drop-icon drop-icon--logout">
                  {logoutIcon}
                </span>
                {L.translate('Header.SelectUser.log_out')}
              </button>
            </li>
          </ul>
        </div>
      </li>
    </ul>
  );
};

export default SelectUser;
