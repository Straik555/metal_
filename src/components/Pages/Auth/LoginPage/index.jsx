import React, { useEffect, useState } from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import L from 'i18n-react';
import { emailValid, passwordValid } from '../../../../services/helpers';
import types from '../../../../redux/types';
import routes from '../../../../routes';
import { closeModal, openModal } from '../../../Base/Modal';
import Captcha from '../../../Base/Modals/Captcha';

const LoginPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();
  const initLoginData = {
    email: '',
    password: '',
    captcha: '',
    remember: 0,
  };
  const [loginData, setLoginData] = useState({ ...initLoginData });
  // const [showTotp, setShowTotp] = useState(false);
  const [isShowPass, setIsShowPass] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);

  const search =
    location.search && location.search.length ? location.search.slice(1) : null;

  const handleCaptcha = value => {
    setLoginData({
      ...loginData,
      captcha: value,
    });
    closeModal();
  };

  // const handleShowTotp = e => {
  //   e.preventDefault();
  //   setShowTotp(!showTotp);
  // };

  const validateInputs = () => {
    let error = false;
    Object.keys(loginData).forEach(key => {
      const value = loginData[key];
      if (key === 'email' && (!value || !emailValid(value))) {
        setErrorEmail(true);
        error = true;
      }
      if (key === 'password' && (!value || !passwordValid(value))) {
        setErrorPassword(true);
        error = true;
      }
      // if (key === 'totp' && key.length > 6) {
      //   error = true;
      // }
    });
    return error;
  };

  const handleChangeInput = e => {
    setLoginData({
      ...loginData,
      captcha: '',
    });
    if (e.target.name === 'remember') {
      setLoginData({
        ...loginData,
        remember: +!loginData.remember,
      });
    } else {
      setLoginData({
        ...loginData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const resetErrors = () => {
    setErrorEmail(false);
    setErrorPassword(false);
  };

  const handleShowPass = e => {
    e.preventDefault();
    setIsShowPass(!isShowPass);
  };

  const openCaptcha = () => {
    openModal(() => <Captcha handleCaptcha={handleCaptcha} />);
  };

  const handleLogin = e => {
    e.preventDefault();
    resetErrors();
    if (validateInputs()) return;
    openCaptcha();
  };

  const clearCaptcha = () => {
    setLoginData({
      ...loginData,
      captcha: '',
    });
  };

  useEffect(() => {
    if (loginData.captcha && !validateInputs()) {
      dispatch({ type: types.LOGIN_START, payload: { loginData, history } });
      setLoginData({ ...initLoginData });
    }
  }, [loginData]);

  useEffect(() => {
    if (search) {
      dispatch({ type: types.CONFIRM_EMAIL_START, payload: { token: search } });
    }
  }, []);

  return (
    <section className="cred-section">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-11">
            <div className="row justify-content-center">
              <div className="col-md-6 col-xl-5">
                <form className="cred-form">
                  <p className="cred-form__title">
                    {L.translate('Auth.Login.signIn')}
                  </p>
                  <div className="anti-phishing">
                    <div className="check-site">
                      <span className="check-site__icon">
                        <svg
                          className="stroke"
                          width="13"
                          height="14"
                          viewBox="0 0 13 14"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M6.49966 9.375C7.14687 9.375 7.67154 8.85033 7.67154 8.20312C7.67154 7.55592 7.14687 7.03125 6.49966 7.03125C5.85246 7.03125 5.32779 7.55592 5.32779 8.20312C5.32779 8.85033 5.85246 9.375 6.49966 9.375Z"
                            stroke="#27AE60"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M6.49966 9.375V10.7812"
                            stroke="#27AE60"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M11.1872 5.15625H1.81216C1.55328 5.15625 1.34341 5.36612 1.34341 5.625V12.1875C1.34341 12.4464 1.55328 12.6562 1.81216 12.6562H11.1872C11.446 12.6562 11.6559 12.4464 11.6559 12.1875V5.625C11.6559 5.36612 11.446 5.15625 11.1872 5.15625Z"
                            stroke="#27AE60"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M4.39029 5.15625V3.04688C4.39029 2.48743 4.61253 1.95091 5.00811 1.55532C5.4037 1.15974 5.94022 0.9375 6.49966 0.9375C7.05911 0.9375 7.59563 1.15974 7.99122 1.55532C8.3868 1.95091 8.60904 2.48743 8.60904 3.04688V5.15625"
                            stroke="#27AE60"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                      <span>https://</span>
                      login/metaltrading.com
                    </div>
                  </div>

                  <div className="cred-field">
                    <p className="field-label field-label--type2">
                      {L.translate('Auth.Login.email')}
                    </p>
                    <div className={`field-wrap ${errorEmail ? 'error' : ''}`}>
                      <input
                        type="text"
                        className="form-item form-item--icon-left form-item--type3"
                        placeholder={L.translate('Auth.Login.email')}
                        name="email"
                        value={loginData.email}
                        onChange={handleChangeInput}
                        onFocus={clearCaptcha}
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
                    {errorEmail && (
                      <div className="error-text">
                        <p className="error-text__item">
                          {L.translate('Auth.Login.enter_valid_email')}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="cred-field">
                    <p className="field-label field-label--type2">
                      {L.translate('Auth.Login.password')}
                    </p>

                    <div
                      className={`field-wrap ${errorPassword ? 'error' : ''}`}
                    >
                      <input
                        className="form-item form-item--icon-left form-item--icon-right form-item--type3"
                        type={isShowPass ? 'text' : 'password'}
                        placeholder={L.translate('Auth.Login.password')}
                        value={loginData.password}
                        name="password"
                        // autoComplete="off"
                        onChange={handleChangeInput}
                        onFocus={clearCaptcha}
                      />

                      <span className="field-icon">
                        <svg
                          calss="stroke"
                          width="21"
                          height="21"
                          viewBox="0 0 21 21"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M6.73458 10.5156C6.15642 9.07349 6.09391 7.476 6.55762 5.99314C7.02133 4.51029 7.98281 3.23301 9.27954 2.37722C10.5763 1.52143 12.1287 1.13961 13.6745 1.29631C15.2202 1.453 16.6644 2.1386 17.7631 3.23721C18.8617 4.33582 19.5473 5.78006 19.7039 7.32581C19.8606 8.87156 19.4788 10.424 18.623 11.7207C17.7672 13.0175 16.49 13.9789 15.0071 14.4426C13.5242 14.9063 11.9268 14.8438 10.4847 14.2657L10.4847 14.2655L9.25024 15.5H7.00024V17.75H4.75024V20H1.00024V16.25L6.73474 10.5155L6.73458 10.5156Z"
                            stroke="#808080"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M14.875 7.25C15.4963 7.25 16 6.74632 16 6.125C16 5.50368 15.4963 5 14.875 5C14.2537 5 13.75 5.50368 13.75 6.125C13.75 6.74632 14.2537 7.25 14.875 7.25Z"
                            fill="#808080"
                          />
                        </svg>
                      </span>
                      <button
                        className="show-pass"
                        type="button"
                        onClick={handleShowPass}
                      >
                        {isShowPass ? (
                          <svg
                            сlass="stroke"
                            width="30"
                            height="20"
                            viewBox="0 0 30 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M15 0.999023C5 0.999023 1 10 1 10C1 10 5 18.999 15 18.999C25 18.999 29 10 29 10C29 10 25 0.999023 15 0.999023Z"
                              stroke="#1A202C"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M15 15C17.7614 15 20 12.7614 20 10C20 7.23858 17.7614 5 15 5C12.2386 5 10 7.23858 10 10C10 12.7614 12.2386 15 15 15Z"
                              stroke="#1A202C"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        ) : (
                          <svg
                            className="stroke"
                            width="24"
                            height="18"
                            viewBox="0 0 24 18"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M4.5 0.750092L19.5 17.2501"
                              stroke="#808080"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M14.5226 11.7749C13.7866 12.4438 12.8151 12.793 11.8217 12.7456C10.8284 12.6983 9.89446 12.2583 9.22548 11.5224C8.5565 10.7865 8.20723 9.81504 8.25448 8.82165C8.30174 7.82827 8.74167 6.89433 9.47749 6.22529"
                              stroke="#808080"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M6.93698 3.43073C3.11486 5.36625 1.5 9.00009 1.5 9.00009C1.5 9.00009 4.5 15.7494 12 15.7494C13.7572 15.7634 15.4926 15.3586 17.0623 14.5686"
                              stroke="#808080"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M19.5571 12.8531C21.6011 11.0225 22.5 9.00008 22.5 9.00008C22.5 9.00008 19.5 2.24935 12 2.24935C11.3504 2.24829 10.7019 2.3011 10.061 2.40724"
                              stroke="#808080"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M12.7058 5.31647C13.5028 5.46952 14.2288 5.87686 14.7747 6.47741C15.3206 7.07795 15.6571 7.83931 15.7337 8.64729"
                              stroke="#808080"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        )}
                      </button>
                    </div>
                    {errorPassword && (
                      <div className="error-text">
                        <p className="error-text__item">
                          {L.translate('Auth.Login.error_password')}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="cred-extra">
                    <div className="cred-extra__remember">
                      <div className="check-wrap">
                        <input
                          type="checkbox"
                          className="new-check"
                          id="remember"
                          name="remember"
                          value={loginData.remember}
                          onClick={handleChangeInput}
                        />
                        <label htmlFor="remember">
                          <span className="check-icon">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 26 26"
                              width="26"
                              height="26"
                              fill="#fff"
                            >
                              <path d="M 22.566406 4.730469 L 20.773438 3.511719 C 20.277344 3.175781 19.597656 3.304688 19.265625 3.796875 L 10.476563 16.757813 L 6.4375 12.71875 C 6.015625 12.296875 5.328125 12.296875 4.90625 12.71875 L 3.371094 14.253906 C 2.949219 14.675781 2.949219 15.363281 3.371094 15.789063 L 9.582031 22 C 9.929688 22.347656 10.476563 22.613281 10.96875 22.613281 C 11.460938 22.613281 11.957031 22.304688 12.277344 21.839844 L 22.855469 6.234375 C 23.191406 5.742188 23.0625 5.066406 22.566406 4.730469 Z" />
                            </svg>
                          </span>
                          <span>{L.translate('Auth.Login.remember_me')}</span>
                        </label>
                      </div>
                    </div>
                    <Link to={routes.Auth.Recovery.path}>
                      {L.translate('Auth.Login.forgot_password')}
                    </Link>
                  </div>

                  <div className="form-submit">
                    <button
                      className="page-btn page-btn--bigger page-btn--full-width"
                      onClick={handleLogin}
                      type="button"
                    >
                      {L.translate('Auth.Login.signIn')}
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

export default LoginPage;
