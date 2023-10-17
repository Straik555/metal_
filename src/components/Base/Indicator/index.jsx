import React from 'react';

const Indicator = ({ value = 0, black }) => {
  const reValue = +value > 100 ? 100 : value;
  const deg = 24 + (132 / 100) * reValue;
  const img = black ? '/img/risk-label_black.svg' : '/img/risk-label.png';
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: 70,
        height: 40,
      }}
    >
      <div style={{ width: 70, height: 23 }}>
        <img src="/img/risk-line.png" alt="" />
      </div>

      <div
        style={{
          display: 'flex',
          width: 70,
          transform: `rotate(${deg}deg)`,
        }}
      >
        <img
          src={img}
          alt=""
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: 40,
          }}
        />
      </div>
    </div>
  );
};
export default Indicator;
