import React from 'react';

const Indicator = ({ value = 0 }) => {
  const deg = 24 + (132 / 100) * value;
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
          src="/img/risk-label.png"
          alt=""
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        />
      </div>
    </div>
  );
};
export default Indicator;
