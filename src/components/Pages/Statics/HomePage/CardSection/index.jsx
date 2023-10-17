import React from 'react';
import { Link } from 'react-router-dom';
import L from 'i18n-react';

const CardSection = () => {
  return (
    <section className="card-section">
      <div className="container">
        <p className="section-title section-title--white">
          {L.translate('HomePage.CardSection.title')}
        </p>
        <p className="section-subtitle">
          {L.translate('HomePage.CardSection.subtitle')}
        </p>
        <div className="home-cards-wrap">
          {/* temporary commented beacuse this part has not been builed yet. */}
          {/* <div className="home-card">
            <div className="home-card__btns">
              <a
                href="https://html.merehead.xyz/MTC/home.html#"
                className="card-btn"
              >
                <img src="/card-btn1.png" alt="some img" />
              </a>
              <a
                href="https://html.merehead.xyz/MTC/home.html#"
                className="card-btn"
              >
                <img src="./HomepageMTC_files/card-btn2.png" alt="some img" />
              </a>
              <a
                href="https://html.merehead.xyz/MTC/home.html#"
                className="card-btn"
              >
                <img src="./HomepageMTC_files/card-btn3.png" alt="some img" />
              </a>
              <a
                href="https://html.merehead.xyz/MTC/home.html#"
                className="card-btn card-btn--qr"
              >
                <img src="./HomepageMTC_files/card-btn4.png" alt="some img" />
              </a>
            </div>
          </div> */}
          <div className="home-card-img">
            <img src="/img/iphone-mockup.png" alt="some img" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CardSection;
