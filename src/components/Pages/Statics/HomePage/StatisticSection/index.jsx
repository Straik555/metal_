import React from 'react';
import L from 'i18n-react';

const StatisticSection = () => {
  return (
    <section className="statistic-section">
      <div className="container">
        <div className="statistic-wrap">
          <div className="row">
            <div className="col-md-4">
              <div className="statistic">
                <p className="statistic__title">$250B+</p>
                <p className="statistic__text">
                  {L.translate(
                    'HomePage.StatisticSection.cryptocurrency_exchanged',
                  )}
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="statistic">
                <p className="statistic__title">42</p>
                <p className="statistic__text">
                  {L.translate('HomePage.StatisticSection.countries_supported')}
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="statistic">
                <p className="statistic__title">40M+</p>
                <p className="statistic__text">
                  {L.translate('HomePage.StatisticSection.customers_served')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatisticSection;
