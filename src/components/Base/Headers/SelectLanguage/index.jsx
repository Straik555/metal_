import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import types from '../../../../redux/types';
import { languages } from '../../../../languages';
import { flagImages } from './flagsImages';

const SelectLanguage = () => {
  const dispatch = useDispatch();
  const { language } = useSelector(store => store.language);
  const setCurrLanguage = e => {
    const { id } = e.currentTarget;
    e.currentTarget.parentNode.parentNode.parentNode.parentNode.classList.remove(
      'active',
    );
    if (id) {
      dispatch({ type: types.SET_LANGUAGE_START, payload: id });
    }
  };

  const diactiveteList = classList => {
    setTimeout(() => {
      classList.remove('active');
    }, 300);
  };

  return (
    <ul
      className="lang-drop"
      onMouseOver={e => e.currentTarget.classList.add('active')}
      onFocus={e => e.currentTarget.classList.add('active')}
      onMouseOut={e => e.currentTarget.classList.remove('active')}
      onBlur={e => diactiveteList(e.currentTarget.classList)}
    >
      <li>
        <button type="button" className="lang-btn">
          <span className="lang-flag">
            <img src={flagImages[language]} alt="flag" />
          </span>
          <span className="lang-btn__text">
            {language}
            <span>
              <svg
                className="stroke"
                width="12"
                height="7"
                viewBox="0 0 12 7"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.375 1.25L6 5.625L1.625 1.25"
                  stroke="#1A202C"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </span>
        </button>
        <div
          className="lang-list"
          onMouseOut={e =>
            e.currentTarget.parentNode.parentNode.classList.remove('active')
          }
          onBlur={e =>
            e.currentTarget.parentNode.parentNode.classList.remove('active')
          }
        >
          <ul
            className="lang-list__item"
            onMouseOut={e =>
              e.currentTarget.parentNode.parentNode.classList.remove('active')
            }
            onBlur={e =>
              e.currentTarget.parentNode.parentNode.classList.remove('active')
            }
          >
            {languages
              ? Object.keys(languages).map(key => (
                  <li
                    id={key}
                    key={key}
                    onClick={setCurrLanguage}
                    role="presentation"
                  >
                    <button
                      type="button"
                      className="lang-btn"
                      // style={{ pointerEvents: 'none' }}
                    >
                      <span className="lang-flag">
                        <img src={flagImages[key]} alt="flag" />
                      </span>
                      <span className="lang-btn__text">{key}</span>
                    </button>
                  </li>
                ))
              : null}
          </ul>
        </div>
      </li>
    </ul>
  );
};

export default SelectLanguage;
