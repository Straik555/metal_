import React from 'react';

const KYCAuthSentVerification = ({ title }) => {
  return (
    <div className="load-box load-box--type3">
      <div className="upload">
        <span className="upload__check">
          <svg
            width="49"
            height="49"
            viewBox="0 0 49 49"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M46.3333 22.6857V24.6791C46.3307 29.3513 44.8178 33.8975 42.0202 37.6397C39.2227 41.3818 35.2905 44.1194 30.8099 45.4442C26.3294 46.7689 21.5407 46.6099 17.158 44.9907C12.7753 43.3715 9.03342 40.379 6.49041 36.4594C3.94741 32.5398 2.73955 27.9032 3.04697 23.2411C3.35439 18.579 5.16062 14.1411 8.19627 10.5894C11.2319 7.03768 15.3344 4.5624 19.8917 3.53272C24.4491 2.50304 29.2172 2.97413 33.485 4.87574"
              stroke="#FFA227"
              strokeWidth="4.33333"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M46.3346 7.34546L24.668 29.0338L18.168 22.5338"
              stroke="#FFA227"
              strokeWidth="4.33333"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <span className="upload__title">{title}</span>
      </div>
    </div>
  );
};

export default KYCAuthSentVerification;
