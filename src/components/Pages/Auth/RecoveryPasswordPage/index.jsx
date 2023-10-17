import React, { useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import L from 'i18n-react';
import types from '../../../../redux/types';
import { passwordValid } from '../../../../services/helpers';

const RecoveryPassword = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const [passwords, setPasswords] = useState({
    password: '',
    confirmPassword: '',
  });
  const [showPass, setShowPass] = useState({
    isShowPass: false,
    isShowConfirmPass: false,
  });

  const [errors, setErrors] = useState({
    password: false,
    confirmPassword: false,
  });

  const handleClickShowPass = e => {
    const { name } = e.currentTarget;
    setShowPass({
      ...showPass,
      [name]: !showPass[name],
    });
  };

  const search =
    location.search && location.search.length ? location.search.slice(1) : null;

  const handleChange = e => {
    setPasswords({
      ...passwords,
      [e.target.name]: e.target.value,
    });
  };

  const validateInputs = () => {
    const newErrors = {
      password: false,
      confirmPassword: false,
    };
    let error = false;
    if (!passwordValid(passwords.password)) {
      newErrors.password = true;
      error = true;
    }
    if (passwords.password !== passwords.confirmPassword) {
      newErrors.confirmPassword = true;
      error = true;
    }
    setErrors(newErrors);
    return error;
  };

  const handleClick = e => {
    e.preventDefault();
    if (validateInputs()) {
      return;
    }
    const payload = {
      password: passwords.password,
      token: search,
      history,
    };
    dispatch({ type: types.CHANGE_PASSWORD_START, payload });
  };

  return (
    <section className="cred-section">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-11">
            <div className="row justify-content-center">
              <div className="col-md-6 col-xl-5">
                <form className="cred-form">
                  <p className="cred-form__title">
                    {L.translate('Auth.RecoveryPassword.password_recovery')}
                  </p>
                  <div className="cred-field">
                    <p className="field-label field-label--type2">
                      {L.translate('Auth.RecoveryPassword.new_password')}
                    </p>
                    <div
                      className={`field-wrap ${errors.password ? 'error' : ''}`}
                    >
                      <input
                        className="form-item form-item--icon-left form-item--icon-right form-item--type3"
                        type={showPass.isShowPass ? 'text' : 'password'}
                        placeholder={L.translate(
                          'Auth.RecoveryPassword.new_password',
                        )}
                        name="password"
                        value={passwords.password}
                        maxLength="25"
                        onChange={handleChange}
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
                        name="isShowPass"
                        onClick={handleClickShowPass}
                      >
                        {showPass.isShowPass ? (
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
                    {errors.password && (
                      <div className="error-text">
                        <p className="error-text__item">
                          {L.translate('Auth.RecoveryPassword.error_password')}
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="cred-field">
                    <p className="field-label field-label--type2">
                      {L.translate('Auth.RecoveryPassword.confirm_password')}
                    </p>

                    <div
                      className={`field-wrap ${
                        errors.confirmPassword ? 'error' : ''
                      }`}
                    >
                      <input
                        className="form-item form-item--icon-left form-item--icon-right form-item--type3"
                        type={showPass.isShowConfirmPass ? 'text' : 'password'}
                        placeholder={L.translate(
                          'Auth.RecoveryPassword.confirm_password',
                        )}
                        name="confirmPassword"
                        maxLength="25"
                        value={passwords.confirmPassword}
                        onChange={handleChange}
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
                        name="isShowConfirmPass"
                        onClick={handleClickShowPass}
                      >
                        {showPass.isShowConfirmPass ? (
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
                    {errors.confirmPassword && (
                      <div className="error-text">
                        <p className="error-text__item">
                          {L.translate(
                            'Auth.RecoveryPassword.passwords_not_match',
                          )}
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
                      {L.translate('Auth.RecoveryPassword.save')}
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

export default RecoveryPassword;
