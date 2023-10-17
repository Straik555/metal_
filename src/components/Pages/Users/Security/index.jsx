import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import L from 'i18n-react';
import ResetPassword from './ResetPassword';
import StatusPanel from './StatusPanel';
import types from '../../../../redux/types';
import Loader from '../../../Base/Loader';
import { userSecurityDataSettingsSelector } from '../../../../redux/settings/selectors';
import { AntiPhishingBlock } from './AntiPhishingBlock';

const Security = () => {
  const dispatch = useDispatch();
  const userSecurityData = useSelector(userSecurityDataSettingsSelector);

  useEffect(() => {
    dispatch({
      type: types.GET_USER_SECURITY_DATA_START,
    });
  }, []);

  const notLoader = Object.keys(userSecurityData || {}).length;
  return (
    <div className="account-block__main">
      {!notLoader ? (
        <Loader />
      ) : (
        <>
          <div className="account-box">
            <StatusPanel userSecurityData={userSecurityData} />
            {/* <div className="account-box">
            <p className="account-box__title">
              {L.translate('UsersPage.Security.twofa')}
            </p>
            <div className="security-wrap"> */}
            {/* <div className="security-item">
                <div className="security">
                  <div className="security__icon">
                    <img src="/img/security1.png" alt="" />
                  </div>
                  <div className="security-info">
                    <p className="security-info__title security-info__title--type2">
                      <Link to="#">
                        {L.translate('UsersPage.Security.security_key')}
                      </Link>{' '}
                      {L.translate('UsersPage.Security.recommend_yubiKey')}
                    </p>
                    <p className="security-info__extra">
                      {L.translate('UsersPage.Security.what_is_security')}
                    </p>
                  </div>
                  <div className="security-action">
                    <button
                      type="button"
                      className="page-btn page-btn--type6 page-btn--full"
                    >
                      <span className="page-btn__inner">
                        {L.translate('UsersPage.Security.setup')}
                      </span>
                    </button>
                  </div>
                </div>
                <div className="security-switch">
                  <div className="security-switch__item">
                    <div className="security-toggle">
                      <p className="security-toggle__name">
                        {L.translate('UsersPage.Security.withdraw_api')}
                      </p>
                      <div className="onoffswitch security-toggle__item">
                        <label
                          className="onoffswitch-label"
                          htmlFor="myonoffswitch"
                        >
                          <input
                            type="checkbox"
                            name="onoffswitch"
                            className="onoffswitch-checkbox"
                            id="myonoffswitch"
                          />
                          <span className="onoffswitch-inner onoffswitch-inner--status-type onoffswitch-inner--type2" />
                          <span className="onoffswitch-switch" />
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="security-switch__item">
                    <div className="security-toggle">
                      <p className="security-toggle__name">
                        {L.translate('UsersPage.Security.log_in')}
                      </p>
                      <div className="onoffswitch security-toggle__item">
                        <label
                          className="onoffswitch-label"
                          htmlFor="myonoffswitch2"
                        >
                          <input
                            type="checkbox"
                            name="onoffswitch"
                            className="onoffswitch-checkbox"
                            id="myonoffswitch2"
                          />
                          <span className="onoffswitch-inner onoffswitch-inner--status-type onoffswitch-inner--type2" />
                          <span className="onoffswitch-switch" />
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="security-switch__item">
                    <div className="security-toggle">
                      <p className="security-toggle__name">
                        {L.translate('UsersPage.Security.reset_password')}
                      </p>
                      <div className="onoffswitch security-toggle__item">
                        <label
                          className="onoffswitch-label"
                          htmlFor="myonoffswitch3"
                        >
                          <input
                            type="checkbox"
                            name="onoffswitch"
                            className="onoffswitch-checkbox"
                            id="myonoffswitch3"
                          />
                          <span className="onoffswitch-inner onoffswitch-inner--status-type onoffswitch-inner--type2" />
                          <span className="onoffswitch-switch" />
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}
            {/* </div>
          </div> */}
            <div className="row">
              <ResetPassword />
              <AntiPhishingBlock />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Security;
