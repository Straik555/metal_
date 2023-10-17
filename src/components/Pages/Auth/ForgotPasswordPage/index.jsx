import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import L from 'i18n-react';
import types from '../../../../redux/types';
import { emailValid } from '../../../../services/helpers';
import { closeModal, openModal } from '../../../Base/Modal';
import Captcha from '../../../Base/Modals/Captcha';

const ForgotPasswordPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [email, setEmail] = useState('');
  const [captcha, setCaptcha] = useState('');
  // const [totp, setTotp] = useState('');
  // const [showTotp, setShowTotp] = useState(false);
  const [error, setError] = useState(false);

  const handleChangeEmail = e => {
    if (captcha) setCaptcha('');
    setEmail(e.target.value);
  };

  const handleCaptcha = value => {
    setCaptcha(value);
    closeModal();
  };

  const openCaptcha = () => {
    openModal(() => <Captcha handleCaptcha={handleCaptcha} />);
  };

  // const handleChangeTotp = e => {
  //   setTotp(e.target.value);
  // };

  // const handleShowTotp = e => {
  //   e.preventDefault();
  //   setShowTotp(!showTotp);
  // };

  const handleClick = e => {
    e.preventDefault();
    if (!emailValid(email)) {
      setError(true);
      return;
    }
    setError('');
    openCaptcha();
  };

  const clearCaptcha = () => {
    setCaptcha('');
  };

  useEffect(() => {
    if (captcha && emailValid(email)) {
      dispatch({
        type: types.RESET_PASSWORD_START,
        payload: { email, captcha, history },
      });
      setEmail('');
      clearCaptcha();
    }
  }, [captcha, email]);

  return (
    <section className="cred-section">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-11">
            <div className="row justify-content-center">
              <div className="col-md-6 col-xl-5">
                <form className="cred-form">
                  <p className="cred-form__title">
                    {L.translate('Auth.ForgotPassword.reset_login_password')}
                  </p>
                  <div className="cred-field">
                    <p className="field-label field-label--type2">
                      {L.translate('Auth.ForgotPassword.enter_email')}
                    </p>
                    <div className={`field-wrap ${error ? 'error' : ''}`}>
                      <input
                        className="form-item form-item--icon-left form-item--type3"
                        type="email"
                        placeholder=""
                        maxLength="255"
                        value={email}
                        onChange={handleChangeEmail}
                        onFocus={clearCaptcha}
                        required
                      />
                      <span className="field-icon">
                        <svg
                          className="stroke"
                          width="20"
                          height="16"
                          viewBox="0 0 20 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M1 1.25H19V14C19 14.1989 18.921 14.3897 18.7803 14.5303C18.6397 14.671 18.4489 14.75 18.25 14.75H1.75C1.55109 14.75 1.36032 14.671 1.21967 14.5303C1.07902 14.3897 1 14.1989 1 14V1.25Z"
                            stroke="#808080"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M19 1.25L10 9.5L1 1.25"
                            stroke="#808080"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                    </div>
                    {error && (
                      <div className="error-text">
                        <p className="error-text__item">
                          {L.translate('Auth.ForgotPassword.enter_valid_email')}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="form-submit">
                    <button
                      className="page-btn page-btn--bigger page-btn--full-width"
                      type="button"
                      onClick={handleClick}
                    >
                      {L.translate('Auth.ForgotPassword.next')}
                    </button>
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

export default ForgotPasswordPage;
