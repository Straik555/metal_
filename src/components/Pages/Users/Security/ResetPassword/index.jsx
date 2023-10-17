import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import L from 'i18n-react';
import types from '../../../../../redux/types';
import { passwordValid } from '../../../../../services/helpers';
import { eyeShow, eyeHide } from '../../../../../styles/img/icons';

const ResetPassword = () => {
  // const { totp } = props;
  const dispatch = useDispatch();
  const [isShowPass, setIsShowPass] = useState(false);
  const [isShowConfirmPass, setIsShowConfirmPass] = useState(false);
  const [passwords, setPasswords] = useState({
    password: '',
    confirmPassword: '',
    totp: '',
  });

  const [errors, setErrors] = useState({
    password: false,
    confirmPassword: false,
    totp: false,
  });

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
      totp: false,
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
    // if (totp && !passwords.totp) {
    //   newErrors.totp = true;
    //   error = true;
    // }
    setErrors(newErrors);
    return error;
  };

  const handleSavePassword = () => {
    if (validateInputs()) {
      return;
    }
    dispatch({
      type: types.USERS_RESET_PASSWORD_START,
      payload: { password: passwords.password, totp: passwords.totp },
    });
    setPasswords({ password: '', confirmPassword: '', totp: '' });
  };

  return (
    <div className="col-lg-6">
      <p className="account-box__title">
        {L.translate('UsersPage.Security.password')}
      </p>
      <div className="password-form">
        <div className="field">
          <span className="field-label field-label--type2">
            {L.translate('UsersPage.Security.new_password')}
          </span>
          <div className="field-wrap">
            <input
              type={isShowPass ? 'text' : 'password'}
              className="form-item form-item--type3"
              value={passwords.password}
              name="password"
              maxLength="25"
              onChange={handleChange}
            />
            <button
              className="show-pass"
              type="button"
              onClick={() => setIsShowPass(prev => !prev)}
            >
              {isShowPass ? eyeShow : eyeHide}
            </button>
          </div>
          <div className={errors.password ? 'error-text' : 'help-text'}>
            <p className={errors.password ? 'error-text__item' : ''}>
              {L.translate('Auth.SignupPage.error_password')}
            </p>
          </div>
        </div>
        <div className="field">
          <span className="field-label field-label--type2">
            {L.translate('UsersPage.Security.confirm_password')}
          </span>
          <div className="field-wrap">
            <input
              type={isShowConfirmPass ? 'text' : 'password'}
              className="form-item form-item--type3"
              name="confirmPassword"
              value={passwords.confirmPassword}
              maxLength="25"
              onChange={handleChange}
            />
            <button
              className="show-pass"
              type="button"
              onClick={() => setIsShowConfirmPass(prev => !prev)}
            >
              {isShowPass ? eyeShow : eyeHide}
            </button>
          </div>
          {errors.confirmPassword && (
            <div className="error-text">
              <p className="error-text__item">
                {L.translate('UsersPage.Security.do_not_match')}
              </p>
            </div>
          )}
        </div>
        {/* {totp === 1 && (
          <div className="field">
            <span className="field-label field-label--type2">
              {L.translate('UsersPage.Security.google_authenticator_code')}
            </span>
            <div className="field-wrap">
              <input
                type="text"
                className="form-item form-item--type3"
                name="totp"
                maxLength="6"
                value={passwords.totp}
                onChange={handleChange}
              />
              {errors.totp && (
                <div className="error-text">
                  <p className="error-text__item">
                    {L.translate('UsersPage.Security.please_enter_code')}
                  </p>
                </div>
              )}
            </div>
          </div>
        )} */}
        <div className="form-submit form-submit--type2">
          <button
            type="button"
            className="page-btn"
            onClick={handleSavePassword}
          >
            {L.translate('UsersPage.Security.save')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
