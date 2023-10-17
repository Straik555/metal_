import React from 'react';

function PercentButtons({ countOrder, percentButtonCountValue, mode }) {
  return (
    <div className="margin-row d-flex">
      <div className="margin-col">
        <div className="input-wrap input-wrap--margin">
          <div className="field-wrap trade-input trade-input--margin">
            <button
              onClick={countOrder}
              value={percentButtonCountValue(0.25)}
              className={
                mode === 'Buy'
                  ? 'trade-input__item '
                  : 'trade-input__item trade-input__item--side2 '
              }
            >
              25%
            </button>
          </div>
        </div>
      </div>
      <div className="margin-col">
        <div className="input-wrap input-wrap--margin">
          <div className="field-wrap trade-input trade-input--margin">
            <button
              onClick={countOrder}
              value={percentButtonCountValue(0.5)}
              className={
                mode === 'Buy'
                  ? 'trade-input__item '
                  : 'trade-input__item trade-input__item--side2'
              }
            >
              50%
            </button>
          </div>
        </div>
      </div>
      <div className="margin-col">
        <div className="input-wrap input-wrap--margin">
          <div className="field-wrap trade-input trade-input--margin">
            <button
              onClick={countOrder}
              value={percentButtonCountValue(0.75)}
              className={
                mode === 'Buy'
                  ? 'trade-input__item '
                  : 'trade-input__item trade-input__item--side2'
              }
            >
              75%
            </button>
          </div>
        </div>
      </div>
      <div className="margin-col">
        <div className="input-wrap input-wrap--margin">
          <div className="field-wrap trade-input trade-input--margin">
            <button
              onClick={countOrder}
              value={percentButtonCountValue(1)}
              className={
                mode === 'Buy'
                  ? 'trade-input__item '
                  : 'trade-input__item trade-input__item--side2'
              }
            >
              100%
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PercentButtons;
