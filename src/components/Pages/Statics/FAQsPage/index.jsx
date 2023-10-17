import React from 'react';
import L from 'i18n-react';

const FAQsPage = () => {
  return (
    <section className="page-section page-section--grey">
      <div className="container">
        <p className="section-title">{L.translate('Statics.FAQ.title')}</p>
        <p className="section-subtitle">
          {L.translate('Statics.FAQ.subtitle')}
        </p>

        <div className="faq-wrap">
          <div className="row ">
            <div className="col-lg-4">
              <div className="faq">
                <p className="faq__title">
                  {L.translate('Statics.FAQ.section_1.title')}
                </p>
                <div className="faq__text">
                  <p>{L.translate('Statics.FAQ.section_1.text')}</p>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="faq">
                <p className="faq__title">
                  {L.translate('Statics.FAQ.section_2.title')}
                </p>
                <div className="faq__text">
                  <p>{L.translate('Statics.FAQ.section_2.text')}</p>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="faq">
                <p className="faq__title">
                  {L.translate('Statics.FAQ.section_3.title')}
                </p>
                <div className="faq__text">
                  <p>{L.translate('Statics.FAQ.section_3.text')}</p>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="faq">
                <p className="faq__title">
                  {L.translate('Statics.FAQ.section_4.title')}
                </p>
                <div className="faq__text">
                  <p>{L.translate('Statics.FAQ.section_4.text')}</p>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="faq">
                <p className="faq__title">
                  {L.translate('Statics.FAQ.section_5.title')}
                </p>
                <div className="faq__text">
                  <p>{L.translate('Statics.FAQ.section_5.text')}</p>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="faq">
                <p className="faq__title">
                  {L.translate('Statics.FAQ.section_6.title')}
                </p>
                <div className="faq__text">
                  <p>{L.translate('Statics.FAQ.section_6.text')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQsPage;
