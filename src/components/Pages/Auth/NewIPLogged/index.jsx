import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import L from 'i18n-react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import types from '../../../../redux/types';
import { numberValidation } from '../../../../services/helpers';

const NewIPLogged = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();
  const [code, setCode] = useState('');
  const [email, setEmail] = useState('');

  const handleChange = e => {
    if (!numberValidation(e.target.value) || e.target.value.length > 6) return;
    setCode(e.target.value);
  };

  const handleClick = () => {
    dispatch({
      type: types.VERIFY_USER_IP_START,
      payload: { code, email, history },
    });
  };

  const handleClickRecentCode = () => {
    dispatch({
      type: types.RECENT_CODE_START,
      payload: { email },
    });
  };

  useEffect(() => {
    setEmail(location?.state?.email);
  }, []);

  return (
    <section className="page-section">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-11">
            <p className="section-icon">
              <img src="/img/key-icon.png" alt="" />
            </p>
            <p className="section-title">
              {L.translate('Auth.NewIpLogger.check_your_email')}
            </p>
            <div className="title-line" />

            <div className="row justify-content-center">
              <div className="col-md-6 col-xl-5">
                <form className="cred-form">
                  <div className="cred-text">
                    <p>
                      {L.translate('Auth.NewIpLogger.login_new_device')} (
                      <Link to="#">{email}</Link>)
                    </p>
                  </div>
                  <div className="code-form">
                    <div className="code-form__field">
                      <span className="field-label field-label--type2">
                        {L.translate('Auth.NewIpLogger.code')}
                      </span>
                      <div className="field-wrap">
                        <input
                          type="text"
                          className="form-item form-item--type3"
                          value={code}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="code-form__btn">
                      <button
                        type="button"
                        className="page-btn page-btn--full"
                        onClick={handleClick}
                      >
                        <span className="page-btn__inner">
                          {L.translate('Global.submit')}
                        </span>
                      </button>
                    </div>
                  </div>
                  <div className="info-hint info-hint--type2">
                    <div className="info-hint__text">
                      <p>{L.translate('Auth.NewIpLogger.didnt_get_code')}</p>
                      <p>
                        {L.translate('Auth.NewIpLogger.if_you_didnt_get')}
                        <Link to="#" onClick={handleClickRecentCode}>
                          {L.translate('Auth.NewIpLogger.resend_code')}
                        </Link>
                      </p>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewIPLogged;
