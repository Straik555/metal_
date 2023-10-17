import React from 'react';
import L from 'i18n-react';

const NothingToShow = ({ colSpan }) => {
  return (
    <tr>
      <td colSpan={colSpan}>
        <div className="no-data">
          <div className="no-data__icon">
            <svg
              width="69"
              height="65"
              viewBox="0 0 69 65"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M52.553 56.4358C58.9972 56.4358 64.2212 51.2118 64.2212 44.7676C64.2212 38.3234 58.9972 33.0994 52.553 33.0994C46.1088 33.0994 40.8848 38.3234 40.8848 44.7676C40.8848 51.2118 46.1088 56.4358 52.553 56.4358Z"
                stroke="#E7A737"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M60.8037 53.0205L67.5547 59.7715"
                stroke="#E7A737"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M1.62891 28.6539C1.62891 13.8476 13.6318 1.84473 28.4381 1.84473C42.9468 1.84473 54.7637 13.3699 55.2329 27.7645H56.7336C56.2638 12.5413 43.7753 0.344727 28.4381 0.344727C12.8034 0.344727 0.128906 13.0192 0.128906 28.6539C0.128906 44.2887 12.8034 56.9632 28.4381 56.9632C31.9502 56.9632 35.3129 56.3236 38.4161 55.1546L37.8588 53.7612C34.928 54.8614 31.7533 55.4632 28.4381 55.4632C13.6318 55.4632 1.62891 43.4603 1.62891 28.6539Z"
                fill="#1A202C"
              />
              <circle cx="55.9969" cy="27.763" r="0.889007" fill="#1A202C" />
              <circle cx="38.2174" cy="54.4349" r="0.889007" fill="#1A202C" />
              <path
                d="M33.1082 42.3862H18.1617C17.8403 42.3862 17.5321 42.2585 17.3049 42.0313C17.0776 41.804 16.95 41.4958 16.95 41.1744V14.5152C16.95 14.1939 17.0776 13.8856 17.3049 13.6584C17.5321 13.4311 17.8403 13.3035 18.1617 13.3035H32.7043L41.1867 21.7859V29.0566"
                stroke="#1A202C"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M23.4138 27.8464H34.3198"
                stroke="#E7A737"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d="M23.4138 32.6934H29.8766"
                stroke="#E7A737"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d="M32.7041 13.3035V21.7859H41.1878"
                stroke="#1A202C"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <p className="no-data__text">
            {L.translate('Global.nothing_to_show')}
          </p>
        </div>
      </td>
    </tr>
  );
};

export default NothingToShow;
