import React from 'react';
import { Link } from 'react-router-dom';
import L from 'i18n-react';
import routes from '../../../../../routes';

const HomeSection = () => {
  return (
    <section className="home-section">
      <div className="container">
        <div className="home">
          <h1 className="home__title">
            {L.translate('HomePage.HomeSection.platform')}
          </h1>
          <p className="home__subtitle">
            {L.translate('HomePage.HomeSection.title_info')}
          </p>
          <Link to={routes.Trade.SpotTrade.path} className="home__btn">
            {L.translate('HomePage.HomeSection.trade_now')}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HomeSection;
