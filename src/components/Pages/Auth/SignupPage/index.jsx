import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import L from 'i18n-react';
import types from '../../../../redux/types';
import { emailValid, passwordValid } from '../../../../services/helpers';
import PasswordDifficult from './passwordDifficult';
import routes from '../../../../routes';
import { closeModal, openModal } from '../../../Base/Modal';
import Captcha from '../../../Base/Modals/Captcha';
import { checkMarkIcon, emailIcon, keyIcon } from './SignUpIcons';
import { eyeShow, eyeHide } from '../../../../styles/img/icons';

const SignupPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({
    email: '',
    password: '',
    captcha: '',
    agree: false,
    passwordDifficult: 'weak',
  });
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const [errorAgree, setErrorAgree] = useState(false);
  const [isShowPass, setIsShowPass] = useState(false);

  const handleShowPass = e => {
    e.preventDefault();
    setIsShowPass(!isShowPass);
  };

  const handleChangeInput = e => {
    if (e.target.name === 'agree') {
      setUserData({
        ...userData,
        agree: !userData.agree,
      });
    } else if (e.target.name === 'password') {
      const validPassword = passwordValid(e.target.value);
      let passwordDifficult;
      if (validPassword) {
        passwordDifficult = 'medium';
      } else {
        passwordDifficult = 'weak';
      }
      if (validPassword && e.target.value.length > 12) {
        passwordDifficult = 'strong';
      }
      setUserData({
        ...userData,
        [e.target.name]: e.target.value.trim(),
        passwordDifficult,
      });
    } else {
      setUserData({
        ...userData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const validateInputs = () => {
    let error = false;
    Object.keys(userData).forEach(key => {
      const value = userData[key];
      if (key === 'email' && (!value || !emailValid(value))) {
        setErrorEmail(true);
        error = true;
      }
      if (key === 'password' && (!value || !passwordValid(value))) {
        setErrorPassword(true);
        error = true;
      }
      if (key === 'agree' && !value) {
        setErrorAgree(true);
        error = true;
      }
    });
    return error;
  };

  const resetErrors = () => {
    setErrorEmail(false);
    setErrorPassword(false);
    setErrorAgree(false);
  };

  const handleCaptcha = value => {
    setUserData({
      ...userData,
      captcha: value,
    });
    closeModal();
  };

  const openCaptcha = () => {
    openModal(() => <Captcha handleCaptcha={handleCaptcha} />);
  };

  const handleRegistration = e => {
    e.preventDefault();
    resetErrors();
    if (validateInputs()) return;
    openCaptcha();
  };

  const clearCaptcha = () => {
    setUserData({
      ...userData,
      captcha: '',
    });
  };

  useEffect(() => {
    if (userData.captcha && !validateInputs()) {
      dispatch({ type: types.SIGNUP_START, payload: { userData, history } });
    }
  }, [userData]);

  return (
    <section className="cred-section">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-11">
            <div className="row justify-content-center">
              <div className="col-md-6 col-xl-5">
                <form className="cred-form">
                  <p className="cred-form__title">
                    {L.translate('Auth.SignupPage.create_free_account')}
                  </p>
                  <div className="cred-text cred-text--type2">
                    <p>{L.translate('Auth.SignupPage.welcome')}</p>
                  </div>

                  <div className="cred-field">
                    <p className="field-label field-label--type2">
                      {L.translate('Auth.SignupPage.email')}{' '}
                      <span className="req">*</span>
                    </p>
                    <div className={`field-wrap ${errorEmail ? 'error' : ''}`}>
                      <input
                        className="form-item form-item--icon-left form-item--type3"
                        type="email"
                        placeholder={L.translate('Auth.SignupPage.email')}
                        maxLength="255"
                        name="email"
                        value={userData?.email}
                        onChange={handleChangeInput}
                        onFocus={clearCaptcha}
                        required
                      />
                      <span className="field-icon">{emailIcon}</span>
                    </div>
                    {errorEmail && (
                      <div className="error-text">
                        <p className="error-text__item">
                          {L.translate('Auth.SignupPage.email_error')}
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="cred-field">
                    <div className="field-panel">
                      <p className="field-label field-label--type2">
                        {L.translate('Auth.SignupPage.password')}{' '}
                        <span className="req">*</span>
                      </p>
                      <div className="pass-lvl pass-lvl--medium">
                        <PasswordDifficult
                          password={userData?.password}
                          passwordDifficult={userData.passwordDifficult}
                        />
                      </div>
                    </div>

                    <div
                      className={`field-wrap ${errorPassword ? 'error' : ''}`}
                    >
                      <input
                        className="form-item form-item--icon-left form-item--icon-right form-item--type3"
                        type={isShowPass ? 'text' : 'password'}
                        name="password"
                        placeholder={L.translate('Auth.SignupPage.password')}
                        value={userData?.password}
                        onFocus={clearCaptcha}
                        onChange={handleChangeInput}
                        maxLength="25"
                      />
                      <span className="field-icon">{keyIcon}</span>
                      <button
                        className="show-pass"
                        type="button"
                        onClick={handleShowPass}
                      >
                        {isShowPass ? eyeShow : eyeHide}
                      </button>
                    </div>
                    <div className={errorPassword ? 'error-text' : 'help-text'}>
                      <p className={errorPassword ? 'error-text__item' : ''}>
                        {L.translate('Auth.SignupPage.error_password')}
                      </p>
                    </div>
                  </div>
                  <div className="cred-extra">
                    <div className="cred-extra__remember">
                      <div className="check-wrap">
                        <input
                          type="checkbox"
                          className="new-check"
                          id="remember"
                          name="agree"
                          value={userData?.agree}
                          onClick={handleChangeInput}
                        />
                        <label htmlFor="remember">
                          <span className="check-icon">{checkMarkIcon}</span>
                          <span>
                            {L.translate('Auth.SignupPage.i_have_read')} <br />
                            <Link to={routes.TermsConditions.path}>
                              {L.translate('Auth.SignupPage.terms_conditions')}
                            </Link>
                          </span>
                        </label>
                      </div>
                      {errorAgree && (
                        <div className="error-text">
                          <p className="error-text__item">
                            {L.translate('Auth.SignupPage.please_agree')}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="form-submit">
                    <button
                      className="page-btn page-btn--bigger page-btn--full-width"
                      type="button"
                      onClick={handleRegistration}
                    >
                      {L.translate('Auth.SignupPage.create_account')}
                    </button>
                  </div>

                  <div className="cred-signup">
                    <p>
                      {L.translate('Auth.SignupPage.already_registered')}
                      <Link to="login">{L.translate('Global.login')}</Link>
                    </p>
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

export default SignupPage;
