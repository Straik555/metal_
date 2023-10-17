import React from 'react';
import L from 'i18n-react';

const AboutUsPage = () => {
  return (
    <section className="page-section">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-11">
            <p className="section-title">
              {L.translate('Statics.AboutUs.AboutUs')}
            </p>
            <p className="section-subtitle">
              {L.translate('Statics.AboutUs.title')}
            </p>
            <div className="about-us-wrap">
              <div className="row justify-content-between">
                <div className="col-lg-5">
                  <div className="about-us-extra">
                    <p>{L.translate('Statics.AboutUs.title2')}</p>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="about-us-text">
                    <div className="info-text">
                      <p>{L.translate('Statics.AboutUs.text1')}</p>
                      <p>{L.translate('Statics.AboutUs.text2')}</p>
                      <p>{L.translate('Statics.AboutUs.text3')}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="reason-wrap">
                <div className="row">
                  <div className="col-lg-4">
                    <div className="reason">
                      <div className="reason__img">
                        <img src="./img/reason4.png" alt="" />
                      </div>
                      <p className="info-title">
                        {L.translate('Statics.AboutUs.cart1_title')}
                      </p>
                      <div className="info-text">
                        <p>{L.translate('Statics.AboutUs.cart1_text')}</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="reason">
                      <div className="reason__img">
                        <img src="./img/reason5.png" alt="" />
                      </div>
                      <p className="info-title">
                        {L.translate('Statics.AboutUs.cart1_title')}
                      </p>
                      <div className="info-text">
                        <p>{L.translate('Statics.AboutUs.cart1_text')}</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="reason">
                      <div className="reason__img">
                        <img src="./img/reason6.png" alt="" />
                      </div>
                      <p className="info-title">
                        {L.translate('Statics.AboutUs.cart1_title')}
                      </p>
                      <div className="info-text">
                        <p>{L.translate('Statics.AboutUs.cart1_text')}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUsPage;
