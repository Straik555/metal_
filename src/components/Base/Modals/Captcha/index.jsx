import React, { useEffect, useRef, useState } from 'react';
import {
  GoogleReCaptcha,
  GoogleReCaptchaProvider,
} from 'react-google-recaptcha-v3';
import ReactSlider from 'react-slider';
import L from 'i18n-react';
import Styles from './styles.module.css';
import { closeModal } from '../../Modal';
import { captchaKey } from '../../../../services/helpers';

const getPosition = () => {
  const position = Math.random() * 70;
  return position < 10 ? position + 10 : position;
};

const Captcha = ({
  handleCaptcha,
  title = {
    platform: L.translate('Base.Modals.Captcha.platform'),
    text: L.translate('Base.Modals.Captcha.text'),
  },
  icon = {
    active: '/img/captcha-logo1.png',
    default: '/img/captcha-logo2.png',
  },
  swipe = {
    buttonImg: '/img/slide-icon.png',
    text: L.translate('Base.Modals.Captcha.slide_text'),
  },
}) => {
  const [colorSwipe, setColorSwipe] = useState('#C4C4C4');
  const refCaptchaWrap = useRef(null);
  const [startCaptcha, setStartCaptcha] = useState(false);
  const [swipeDeg, setSwipeDeg] = useState(0);
  const [activeIconDeg, setActiveIconDeg] = useState(0);
  const [defaultIconDeg, setDefaultIconDeg] = useState(0);
  const [disabledCaptcha, setDisabledCaptcha] = useState(false);
  const init = () => {
    if (refCaptchaWrap?.current?.offsetWidth) {
      setColorSwipe('#C4C4C4');
      setDisabledCaptcha(false);
      setActiveIconDeg(0);
      setSwipeDeg(0);
      setDefaultIconDeg(getPosition());
    }
  };
  const reDegre = value => {
    return (value / 1000) * 76;
  };
  const onMove = value => {
    if (value > 1000 || value < 0) return;
    setActiveIconDeg(reDegre(value));
    setSwipeDeg(value);
  };
  const reloadCaptcha = () => {
    init();
  };
  const validation = () => {
    setDisabledCaptcha(true);
    if (
      activeIconDeg + 2 > defaultIconDeg &&
      activeIconDeg - 2 < defaultIconDeg
    ) {
      setColorSwipe('#05d395');
      setStartCaptcha(true);
      return;
    }
    setColorSwipe('#ed1c24');
    setStartCaptcha(false);
  };
  useEffect(() => {
    init();
  }, []);

  const CustomSwipe = props => (
    <div {...props}>
      <div className={Styles.yesh_slide__btn}>
        <svg
          className={Styles.yesh_slide__svg}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="22"
          viewBox="0 0 24 22"
        >
          <g>
            <rect width="4" height="22" rx="2" fill={colorSwipe} />
          </g>
          <g>
            <rect x="10" width="4" height="22" rx="2" fill={colorSwipe} />
          </g>
          <g>
            <rect x="20" width="4" height="22" rx="2" fill={colorSwipe} />
          </g>
        </svg>
      </div>
    </div>
  );

  return (
    <GoogleReCaptchaProvider reCaptchaKey={captchaKey}>
      <div className="captcha-modal">
        <div className="captcha-wrap" ref={refCaptchaWrap}>
          {startCaptcha && <GoogleReCaptcha onVerify={handleCaptcha} />}
          <div className="captcha-cover">
            <p className="captcha-text">
              <span>{title.platform}</span>
              {title.text}
            </p>
            <img
              className="captcha-cover__item"
              src="/img/captcha-bg.png"
              alt=""
            />
            <div className="captcha-move" style={{ left: `${activeIconDeg}%` }}>
              <img src={icon?.active} alt="active" />
            </div>
            <div
              className="capthca-default"
              style={{ left: `${defaultIconDeg}%` }}
            >
              <img src={icon?.default} alt="default" />
            </div>
          </div>
          <div className={Styles.yesh_slide}>
            <ReactSlider
              disabled={disabledCaptcha}
              onAfterChange={validation}
              onChange={onMove}
              snapDragDisabled
              min={0}
              value={swipeDeg}
              max={1000}
              renderThumb={CustomSwipe}
            />
            <div className={Styles.yesh_slide__text}>{swipe.text}</div>
          </div>
          <div className="capthca-actions">
            <button
              type="button"
              className="capthca-actions__item"
              onClick={closeModal}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 28 28"
                fill="none"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M14 3.19741C8.03389 3.19741 3.19741 8.03389 3.19741 14C3.19741 19.9661 8.03389 24.8026 14 24.8026C19.9661 24.8026 24.8026 19.9661 24.8026 14C24.8026 8.03389 19.9661 3.19741 14 3.19741ZM0.80249 14C0.80249 6.71121 6.71121 0.80249 14 0.80249C21.2888 0.80249 27.1975 6.71121 27.1975 14C27.1975 21.2888 21.2888 27.1975 14 27.1975C6.71121 27.1975 0.80249 21.2888 0.80249 14ZM18.4466 9.55324C18.9142 10.0209 18.9142 10.7791 18.4466 11.2467L15.6933 14L18.4466 16.7533C18.9142 17.2209 18.9142 17.9791 18.4466 18.4467C17.979 18.9144 17.2208 18.9144 16.7531 18.4467L13.9999 15.6934L11.2466 18.4467C10.7789 18.9144 10.0208 18.9144 9.55312 18.4467C9.08548 17.9791 9.08548 17.2209 9.55312 16.7533L12.3064 14L9.55312 11.2467C9.08548 10.7791 9.08548 10.0209 9.55312 9.55324C10.0208 9.08561 10.7789 9.08561 11.2466 9.55324L13.9999 12.3065L16.7531 9.55324C17.2208 9.08561 17.979 9.08561 18.4466 9.55324Z"
                  fill="#474747"
                />
              </svg>
            </button>
            <button
              type="button"
              className="capthca-actions__item"
              onClick={reloadCaptcha}
            >
              <svg
                style={{ pointerEvents: 'none' }}
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="24"
                viewBox="0 0 28 24"
                fill="none"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M11.9338 2.89956C13.4715 2.55163 15.0723 2.59891 16.5868 3.03699C18.1014 3.47507 19.4802 4.28967 20.5948 5.40478C20.6034 5.4134 20.6122 5.42189 20.6211 5.43024L23.8879 8.49998H19.8334C19.1891 8.49998 18.6667 9.02231 18.6667 9.66665C18.6667 10.311 19.1891 10.8333 19.8334 10.8333H26.8221C26.8514 10.8336 26.8807 10.8328 26.9099 10.8308C27.0491 10.8218 27.1815 10.7884 27.3032 10.7349C27.4174 10.6847 27.5251 10.6154 27.6213 10.5271C27.8541 10.3138 28.0001 10.0073 28.0001 9.66665V2.66665C28.0001 2.02231 27.4777 1.49998 26.8334 1.49998C26.1891 1.49998 25.6667 2.02231 25.6667 2.66665V6.96964L22.2318 3.74201C20.841 2.35492 19.1223 1.3414 17.2352 0.795538C15.342 0.24794 13.341 0.188842 11.4188 0.623759C9.49665 1.05868 7.71598 1.97343 6.24295 3.28267C4.76993 4.59191 3.65256 6.25296 2.99512 8.11083C2.78018 8.71825 3.09834 9.38492 3.70576 9.59986C4.31319 9.81481 4.97985 9.49664 5.19479 8.88922C5.72075 7.40293 6.61464 6.07409 7.79306 5.02669C8.97148 3.9793 10.396 3.2475 11.9338 2.89956ZM0.248635 13.6132C0.285168 13.5667 0.325161 13.5231 0.368225 13.4826C0.452617 13.4033 0.54616 13.3388 0.645426 13.2892C0.8023 13.2108 0.979327 13.1666 1.16667 13.1666H8.16667C8.811 13.1666 9.33333 13.6889 9.33333 14.3333C9.33333 14.9776 8.811 15.4999 8.16667 15.4999H4.11184L7.37887 18.5698C7.38775 18.5782 7.3965 18.5867 7.40512 18.5953C8.51968 19.7104 9.89855 20.525 11.4131 20.9631C12.9276 21.4011 14.5284 21.4484 16.0662 21.1005C17.6039 20.7526 19.0284 20.0207 20.2069 18.9734C21.3853 17.926 22.2792 16.5971 22.8051 15.1108C23.0201 14.5034 23.6867 14.1852 24.2942 14.4002C24.9016 14.6151 25.2197 15.2818 25.0048 15.8892C24.3474 17.7471 23.23 19.4081 21.757 20.7174C20.2839 22.0266 18.5033 22.9414 16.5811 23.3763C14.6589 23.8112 12.6579 23.7521 10.7647 23.2045C8.87759 22.6587 7.15894 21.6451 5.76809 20.2581L2.33333 17.0306V21.3333C2.33333 21.9776 1.811 22.4999 1.16667 22.4999C0.522335 22.4999 0 21.9776 0 21.3333V14.3433V14.3333C0 14.2915 0.0022 14.2502 0.00649039 14.2095C0.0300784 13.9858 0.116854 13.781 0.248635 13.6132ZM0.00649039 14.2095C0.0289571 13.9976 0.109407 13.7903 0.248635 13.6132Z"
                  fill="#474747"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </GoogleReCaptchaProvider>
  );
};
export default Captcha;
