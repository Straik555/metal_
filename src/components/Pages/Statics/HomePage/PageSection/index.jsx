import React from 'react';
import L from 'i18n-react';

const PageSection = () => {
  return (
    <section className="page-section">
      <div className="container">
        <p className="section-title">
          {L.translate('HomePage.PageSection.title')}
        </p>
        <p className="section-subtitle">
          {L.translate('HomePage.PageSection.subtitle')}
        </p>
        <div className="reason-wrap">
          <div className="row">
            <div className="col-lg-4">
              <div className="reason">
                <div className="reason__img">
                  <img src="/img/reason1.png" alt="safe img" />
                </div>
                <p className="info-title">
                  {L.translate('HomePage.PageSection.secure_storage_1')}
                </p>
                <div className="info-text">
                  <p>{L.translate('HomePage.PageSection.secure_info_1')}</p>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="reason">
                <div className="reason__img">
                  <img src="/img/reason2.png" alt="rocket img" />
                </div>
                <p className="info-title">
                  {L.translate('HomePage.PageSection.secure_storage_2')}
                </p>
                <div className="info-text">
                  <p>{L.translate('HomePage.PageSection.secure_info_2')}</p>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="reason">
                <div className="reason__img">
                  <img src="/img/reason3.png" alt="Earth globe img" />
                </div>
                <p className="info-title">
                  {L.translate('HomePage.PageSection.secure_storage_3')}
                </p>
                <div className="info-text">
                  <p>{L.translate('HomePage.PageSection.secure_info_3')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PageSection;
