import React, { useRef } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import L from 'i18n-react';
import routes from '../../../routes';
import {
  facebookLogo,
  twitterLogo,
  instagrammLogo,
  youtubeLogo,
  telegrammLogo,
} from './FooterLogos';

const Footers = props => {
  const location = useLocation();
  // const history = useHistory();
  const notRenderFooter = location.pathname.includes(
    routes.Trade?.SpotTrade?.path,
  );
  // const main = location.pathname === routes.Root.path;

  const clickOnLogo = () => {
    // if (!main) {
    //   history.push(routes.Root.path);
    //  }
    if (props.refAutoScroll?.current && window.pageYOffset > 0) {
      props.refAutoScroll.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {notRenderFooter ? null : (
        <footer className="footer">
          <div className="container">
            <div className="row">
              <div className="col-lg-8">
                <ul className="f-nav">
                  <li>
                    <Link to={routes.PrivacyPolicy.path}>
                      {L.translate('Footer.privacy_policy')}
                    </Link>
                  </li>
                  <li>
                    <Link to={routes.TermsConditions.path}>
                      {L.translate('Footer.terms_of_use')}
                    </Link>
                  </li>
                  <li>
                    <Link to={routes.FAQs.path}>
                      {L.translate('Footer.FAQs')}
                    </Link>
                  </li>
                  <li>
                    <Link to={routes.ContactUs.path}>
                      {L.translate('Footer.contact_us_link')}
                    </Link>
                  </li>
                  <li>
                    <Link to={routes.AboutUs.path}>
                      {L.translate('Footer.about_us_link')}
                    </Link>
                  </li>
                </ul>
                <p className="copyright">
                  © Copyright 2021 | Metal Trading Company | All Rights Reserved
                </p>
              </div>
              <div className="col-lg-4">
                <Link
                  to={routes.Root.path}
                  onClick={clickOnLogo}
                  className="f-logo"
                >
                  <img src="/img/logo2.png" alt="Metal Traiding Logo" />
                </Link>
                <div className="f-social">
                  <a
                    href="https://www.instagram.com/metal.tradingcompany/"
                    target="blank"
                    className="f-social__link"
                  >
                    {instagrammLogo}
                  </a>
                  <a
                    href="https://www.facebook.com/MTCmetaltradingcompany/"
                    target="blank"
                    className="f-social__link"
                  >
                    {facebookLogo}
                  </a>
                  <a
                    href="https://twitter.com/MetalTradingCo1"
                    target="blank"
                    className="f-social__link"
                  >
                    {twitterLogo}
                  </a>

                  {/* <Link to="#" className="f-social__link">
                    {youtubeLogo}
                  </Link>
                  <Link to="#" className="f-social__link">
                    {telegrammLogo}
                  </Link> */}
                </div>
              </div>
            </div>
          </div>
        </footer>
      )}
    </>
  );
};

export default Footers;
