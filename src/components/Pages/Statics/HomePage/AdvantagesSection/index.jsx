import React from 'react';
import { Link } from 'react-router-dom';
import L from 'i18n-react';
import routes from '../../../../../routes';
import { supportImg, supportLinkIcon } from './Icons/supportIcons';
import {
  communityIcon,
  facebookIcon,
  twitterIcon,
  instagramIcon,
} from './Icons/communityIcons';

const AdvantagesSection = () => {
  return (
    <section className="advantages-section">
      <div className="container">
        <p className="section-title ">
          {L.translate('HomePage.AdvantagesSection.title')}
        </p>
        <p className="section-subtitle section-subtitle--white">
          {L.translate('HomePage.AdvantagesSection.subtitle')}
        </p>
        <div className="adantages-wrap">
          <div className="row justify-content-center">
            <div className="col-lg-4">
              <div className="advantage">
                <div className="advantage__img">{supportImg}</div>
                <div className="advantage__info">
                  <p className="info-title">
                    {L.translate('HomePage.AdvantagesSection.support_time')}
                  </p>
                  <div className="info-text">
                    <p>
                      {L.translate('HomePage.AdvantagesSection.support_text')}
                    </p>
                  </div>
                  <Link to={routes.ContactUs.path} className="advantage-link">
                    {L.translate('HomePage.AdvantagesSection.support_link')}
                    <span className="d-flex advantage-link__icon">
                      {supportLinkIcon}
                    </span>
                  </Link>
                </div>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="advantage">
                <div className="advantage__img">{communityIcon}</div>
                <div className="advantage__info">
                  <p className="info-title">
                    {L.translate(
                      'HomePage.AdvantagesSection.community_heading',
                    )}
                  </p>
                  <div className="info-text">
                    <p>
                      {L.translate('HomePage.AdvantagesSection.community_text')}
                    </p>
                  </div>
                  <ul className="advantage-social">
                    <li>
                      <a
                        href="https://www.instagram.com/metal.tradingcompany/"
                        target="blank"
                      >
                        {instagramIcon}
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://www.facebook.com/MTCmetaltradingcompany/"
                        target="blank"
                      >
                        {facebookIcon}
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://twitter.com/MetalTradingCo1"
                        target="blank"
                      >
                        {twitterIcon}
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdvantagesSection;
