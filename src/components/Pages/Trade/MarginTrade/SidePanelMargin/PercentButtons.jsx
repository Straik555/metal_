import React from 'react';

function PercentButtons({ countOrder, percentButtonCountValue }) {
  return (
    <div className="margin-row d-flex">
      <div className="margin-col">
        <div className="input-wrap input-wrap--margin">
          <div className="field-wrap trade-input trade-input--margin">
            <button
              onClick={countOrder}
              value={percentButtonCountValue(0.25)}
              className="trade-input__item "
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
              className="trade-input__item "
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
              className="trade-input__item "
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
              className="trade-input__item "
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
