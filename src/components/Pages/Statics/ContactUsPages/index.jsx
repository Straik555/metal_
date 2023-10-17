import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import L from 'i18n-react';
import { emailValid, empty } from '../../../../services/helpers';
import types from '../../../../redux/types';
import Captcha from '../../../Base/Modals/Captcha';
import { closeModal, openModal } from '../../../Base/Modal';

const ContactUsPages = () => {
  const dispatch = useDispatch();
  // const { topics } = useSelector(contactUSSelector);

  const [userData, setUserData] = useState({
    name: '',
    email: '',
    // topic: '',
    text: '',
    captcha: '',
  });

  const [error, setError] = useState({
    name: false,
    email: false,
    // topic: false,
    text: false,
    captcha: false,
  });

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

  // useEffect(() => {
  //   dispatch({ type: types.GET_TOPICS_START });
  // }, []);

  // useEffect(() => {
  //   setUserData({
  //     ...userData,
  //     topic: (topics && topics[0]) || '',
  //   });
  // }, [topics]);

  const handleChangeInput = e => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const resetPasswordError = () => {
    setError({
      name: false,
      email: false,
      // topic: false,
      text: false,
      captcha: false,
    });
  };

  const clearCaptcha = () => {
    setUserData({
      ...userData,
      captcha: '',
    });
  };

  const handleSubmit = e => {
    resetPasswordError();

    const newError = Object.keys(userData).filter(key => {
      if (empty(userData[key]) && key !== 'captcha') {
        setError(prevError => ({ ...prevError, [key]: true }));
        return true;
      }
      if (key === 'email' && !emailValid(userData.email)) {
        setError(prevError => ({ ...prevError, email: true }));
        return true;
      }
      return false;
    });
    if (newError.length) return;
    openCaptcha();
  };

  useEffect(() => {
    if (userData.captcha) {
      dispatch({ type: types.SEND_CONTACTUS_FORM_START, payload: userData });
      setUserData({
        name: '',
        email: '',
        // topic: '',
        text: '',
        captcha: '',
      });
    }
  }, [userData, dispatch]);
  return (
    <section className="page-section page-section--grey">
      <div className="container">
        <p className="section-title">
          {L.translate('Statics.ContactUs.contact_support')}
        </p>
        <p className="section-subtitle">
          {L.translate('Statics.ContactUs.MTC_new_generation')}
        </p>
        <div className="contact-us">
          <div className="row justify-content-between">
            <div className="col-md-6 col-lg-5">
              <div className="contact">
                <p className="contact__title">
                  {L.translate('Statics.ContactUs.MTC_support')}
                </p>
                <div className="contact__text">
                  <p>{L.translate('Statics.ContactUs.text')}</p>
                </div>
                <div className="adress">
                  <p className="adress__title">
                    {L.translate('Statics.ContactUs.need_help')}
                  </p>
                  <a
                    className="adress__val adress__val--type2"
                    href="mailto: support@metaltrading.com"
                    target="blank"
                  >
                    support@metaltrading.com
                  </a>
                </div>
                {/* <div className="adress">
                  <p className="adress__title">
                    {L.translate('Statics.ContactUs.location')}
                  </p>
                  <p className="adress__val">
                    {L.translate('Statics.ContactUs.helsinki_finland')}
                  </p>
                </div> */}
              </div>
            </div>
            <div className="col-md-6 col-lg-5">
              <div className="contact-form">
                <div className="contact-field">
                  <p className="field-label field-label--type2">
                    {L.translate('Statics.ContactUs.full_name')}
                  </p>
                  <div className={`field-wrap ${error.name ? 'error' : ''}`}>
                    <input
                      type="text"
                      className="form-item form-item--type3 form-item--icon-left"
                      placeholder={L.translate('Statics.ContactUs.full_name')}
                      name="name"
                      value={userData.name}
                      onChange={handleChangeInput}
                      onFocus={clearCaptcha}
                    />
                    <span className="field-icon">
                      <svg
                        className="stroke"
                        width="20"
                        height="19"
                        viewBox="0 0 20 19"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M10 13C13.3137 13 16 10.3137 16 7C16 3.68629 13.3137 1 10 1C6.68629 1 4 3.68629 4 7C4 10.3137 6.68629 13 10 13Z"
                          stroke="#808080"
                          strokeWidth="1.5"
                          strokeMiterlimit="10"
                        />
                        <path
                          d="M0.905273 18.2491C1.82736 16.6531 3.15322 15.3278 4.74966 14.4064C6.34611 13.485 8.15691 13 10.0002 13C11.8434 13 13.6542 13.4851 15.2506 14.4065C16.8471 15.3279 18.1729 16.6533 19.0949 18.2493"
                          stroke="#808080"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </div>
                  {error.name && (
                    <div className="error-text">
                      <p className="error-text__item">
                        {L.translate('Statics.ContactUs.full_name_error')}
                      </p>
                    </div>
                  )}
                </div>
                <div className="contact-field">
                  <p className="field-label field-label--type2">
                    {L.translate('Statics.ContactUs.email')}
                  </p>
                  <div className={`field-wrap ${error.email ? 'error' : ''}`}>
                    <input
                      className="form-item form-item--type3 form-item--icon-left"
                      type="email"
                      placeholder={L.translate('Statics.ContactUs.email')}
                      name="email"
                      value={userData.email}
                      onChange={handleChangeInput}
                      onFocus={clearCaptcha}
                    />
                    <span className="field-icon">
                      <svg
                        className="storke"
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
                  {error.email && (
                    <div className="error-text">
                      <p className="error-text__item">
                        {L.translate('Statics.ContactUs.email_error')}
                      </p>
                    </div>
                  )}
                </div>
                <div className="contact-field">
                  <p className="field-label field-label--type2">
                    {L.translate('Statics.ContactUs.description')}
                  </p>
                  <div className={`field-wrap ${error.text ? 'error' : ''}`}>
                    <textarea
                      className="form-item form-item--type3 form-item--area"
                      placeholder={L.translate(
                        'Statics.ContactUs.enter_message_text',
                      )}
                      name="text"
                      value={userData.text}
                      onChange={handleChangeInput}
                      maxLength="500"
                      onFocus={clearCaptcha}
                    />
                    <span className="area-hint">{`${userData.text.length}/500`}</span>
                  </div>
                  {error.text && (
                    <div className="error-text">
                      <p className="error-text__item">
                        {L.translate('Statics.ContactUs.enter_message_text')}
                      </p>
                    </div>
                  )}
                </div>
                <div className="form-submit form-submit--type2">
                  <button
                    className="page-btn page-btn--full"
                    type="button"
                    onClick={handleSubmit}
                  >
                    {L.translate('Statics.ContactUs.send')}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUsPages;
