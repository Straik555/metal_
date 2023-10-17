import React, { useRef } from 'react';
import { useLocation, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import L from 'i18n-react';

import SelectBuyCrypto from './SelectBuyCrypto';
import SelectTrade from './SelectTrade';
import SelectWallets from './SelectWallets';
import routes from '../../../routes';
import SelectUser from './SelectUser';
import SelectLanguage from './SelectLanguage';
import SelectPairs from './SelectPairs';
import { tokenSelector } from '../../../redux/auth/selectors';
import { languageSelector } from '../../../redux/lng/selectors';

const Headers = ({ isLogin }) => {
  const refMobileMenu = useRef(null);
  const location = useLocation();
  const language = useSelector(languageSelector); // need to update language
  const themeHeader = location.pathname.includes(routes.Trade?.SpotTrade?.path);
  const token = useSelector(tokenSelector);
  const toggleMobileMenu = e => {
    if (e.target === refMobileMenu.current) {
      refMobileMenu.current.classList.toggle('active');
      return;
    }
    refMobileMenu.current.classList.add('active');
  };

  return (
    <header
      className={themeHeader ? 'header header--trade' : 'header header--main'}
    >
      <div className="container">
        <div className="d-flex header-container">
          <NavLink to={routes.Root?.path} className="page-logo">
            <img src="/img/logo2.png" alt="" />
          </NavLink>

          <div
            className="main-nav"
            ref={refMobileMenu}
            role="presentation"
            onClick={toggleMobileMenu}
          >
            <div className="main-nav__inner" style={{ zIndex: 100 }}>
              <ul className="nav-list">
                <SelectBuyCrypto />
                <SelectTrade isLogin={isLogin} />
                <li>
                  <NavLink to={routes.WhitePaper.path}>
                    {L.translate('Header.WhitePaper')}
                  </NavLink>
                </li>
                {isLogin ? (
                  <>
                    <SelectWallets />
                  </>
                ) : null}
              </ul>
              {location.pathname.includes(routes.Trade?.SpotTrade?.path) ? (
                <SelectPairs />
              ) : null}
              {isLogin ? (
                <SelectUser />
              ) : (
                <div className="cred">
                  <NavLink
                    to={routes.Auth.Login?.path}
                    className="page-btn header-auth-links"
                  >
                    {L.translate('Global.login')}
                  </NavLink>
                  <NavLink
                    to={routes.Auth.Signup?.path}
                    className="page-btn header-auth-links"
                  >
                    {L.translate('Global.sign_up')}
                  </NavLink>
                </div>
              )}
              <SelectLanguage />
            </div>
          </div>
          <div className="lg-show">
            <button
              type="button"
              className="nav-btn"
              onClick={toggleMobileMenu}
            >
              <svg
                className="fill"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
              >
                <path
                  fill="#000"
                  d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

// export default Headers;
export default React.memo(Headers);
