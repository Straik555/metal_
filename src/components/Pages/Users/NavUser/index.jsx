import React from 'react';
import { NavLink } from 'react-router-dom';
import L from 'i18n-react';
import routes from '../../../../routes';
import {
  apiIcon,
  dashboardIcon,
  identificationIcon,
  securityIcon,
  settingsIcon,
} from './NavUserIcons';

const NavUser = () => {
  return (
    <div className="account-block__bar">
      <ul className="account-nav">
        <li>
          <NavLink
            to={routes.User.Dashboard.path}
            className="account-nav__link "
          >
            <span className="account-nav__icon">{dashboardIcon}</span>
            <span className="account-bav__text">
              {L.translate('UsersPage.Navigation.dashboard')}
            </span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to={routes.User.Security.path}
            className="account-nav__link "
          >
            <span className="account-nav__icon">{securityIcon}</span>
            <span className="account-bav__text">
              {L.translate('UsersPage.Navigation.security')}
            </span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to={routes.User.Identification.path}
            className="account-nav__link"
          >
            <span className="account-nav__icon">{identificationIcon}</span>
            <span className="account-bav__text">
              {L.translate('UsersPage.Navigation.identification')}
            </span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to={routes.User.ApiManagement.path}
            className="account-nav__link"
          >
            <span className="account-nav__icon">{apiIcon}</span>
            <span className="account-bav__text">
              {L.translate('UsersPage.Navigation.api_management')}
            </span>
          </NavLink>
        </li>

        {/*  mock path is temorary because routes for this links does not exist yet */}
        {/* <li>
          <NavLink to="/mock-path" className="account-nav__link">
            <span className="account-nav__icon">{settingsIcon}</span>
            <span className="account-bav__text">
              {L.translate('UsersPage.Navigation.settings')}
            </span>
          </NavLink>
        </li> */}
      </ul>
    </div>
  );
};

export default NavUser;
