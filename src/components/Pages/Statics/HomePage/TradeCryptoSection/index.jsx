import React from 'react';
import L from 'i18n-react';

const TradeCryptoSection = () => {
  return (
    <section className="step-section">
      <div className="container">
        <p className="section-title section-title--white">
          {L.translate('HomePage.TradeCryptoSection.title')}
        </p>
        <p className="section-subtitle">
          {L.translate('HomePage.TradeCryptoSection.subtitle')}
        </p>
        <div className="start-wrap">
          <div className="row justify-content-between">
            <div className="col-lg-3">
              <div className="start-block">
                <div className="start-block__img">
                  <img src="/img/start1.png" alt="Register account img" />
                </div>
                <p className="info-title">
                  {L.translate('HomePage.TradeCryptoSection.register_account')}
                </p>
                <div className="info-text">
                  <p>
                    {L.translate('HomePage.TradeCryptoSection.register_text')}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="start-block">
                <div className="start-block__img">
                  <img src="/img/start2.png" alt="Deposit img" />
                </div>
                <p className="info-title">
                  {L.translate('HomePage.TradeCryptoSection.deposit_heading')}
                </p>
                <div className="info-text">
                  <p>
                    {L.translate('HomePage.TradeCryptoSection.deposit_info')}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="start-block">
                <div className="start-block__img">
                  <img src="/img/start3.png" alt="Bill img" />
                </div>
                <p className="info-title">
                  {L.translate('HomePage.TradeCryptoSection.orders_heading')}
                </p>
                <div className="info-text">
                  <p>
                    {L.translate('HomePage.TradeCryptoSection.orders_info')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TradeCryptoSection;
