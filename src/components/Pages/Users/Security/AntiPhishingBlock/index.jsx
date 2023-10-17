import React, { useEffect, useState } from 'react';
import L from 'i18n-react';
import { useDispatch, useSelector } from 'react-redux';
import types from '../../../../../redux/types';
import { hasAntiphishingPhraseSelector } from '../../../../../redux/auth/selectors';
import { checkValue } from './Helpers';

export const AntiPhishingBlock = () => {
  const dispatch = useDispatch();
  const hasAntiphishingPhrase = useSelector(hasAntiphishingPhraseSelector);

  const [phrase, setPhrase] = useState('');
  const [phraseError, setPhraseError] = useState(false);

  const handleChange = e => {
    const { value } = e.target;
    setPhrase(value);

    const checkedValue = checkValue(value);
    if (checkedValue) setPhraseError(false);
    else setPhraseError(true);
  };

  const hanldeEnableClick = () => {
    if (!checkValue(phrase)) {
      setPhraseError(true);
      return;
    }

    const body = {
      enable: true,
      phrase,
    };
    dispatch({
      type: types.SET_USER_ANTIPHISHING_DATA_START,
      body,
    });
    setPhrase('');
    setPhraseError(false);
  };
  const handleDisableClick = () => {
    const body = {
      enable: false,
      phrase: null,
    };
    dispatch({
      type: types.SET_USER_ANTIPHISHING_DATA_START,
      body,
    });
  };

  useEffect(() => {
    dispatch({
      type: types.CHECK_USER_ANTIPHISHING_DATA_START,
    });
  }, [dispatch]);

  const translatePath = 'UsersPage.Security.AntiphishingBlock';
  return (
    <div className="col-lg-6">
      <p className="account-box__title">
        {L.translate(`${translatePath}.title`)}
      </p>
      <div className="password-form">
        {hasAntiphishingPhrase ? (
          <div className="field">
            <span className="field-label field-label--type2 antiphishing-note">
              {L.translate(`${translatePath}.phrase_enabled`)}
            </span>
            <button
              type="button"
              className="page-btn"
              onClick={handleDisableClick}
            >
              {L.translate(`${translatePath}.btn_disable`)}
            </button>
          </div>
        ) : (
          <>
            <div className="field">
              <span className="field-label field-label--type2 antiphishing-note">
                {L.translate(`${translatePath}.phrase_note`)}
              </span>
              <div className="field-wrap">
                <input
                  type="text"
                  className="form-item"
                  value={phrase}
                  onChange={handleChange}
                  placeholder={L.translate(
                    `${translatePath}.phrase_placeholder`,
                  )}
                />
                {phraseError && (
                  <div className="error-text">
                    <p className="error-text__item">
                      {L.translate(`${translatePath}.phrase_error`)}
                    </p>
                  </div>
                )}
              </div>
            </div>
            <div className="form-submit form-submit--type2">
              <button
                type="button"
                className="page-btn"
                onClick={hanldeEnableClick}
              >
                {L.translate(`${translatePath}.btn_enable`)}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
