import React from 'react';

const PercentButton = ({ cbValue, value }) => {
  const handleClick = e => {
    const { name } = e.target;
    if (!name) return;
    cbValue(+value * +name);
  };
  return (
    <>
      <div className="margin-row d-flex">
        <div className="margin-col">
          <div className="input-wrap input-wrap--margin">
            <div className="field-wrap trade-input trade-input--margin">
              <button
                type="button"
                name="0.25"
                onClick={handleClick}
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
                type="button"
                name="0.5"
                onClick={handleClick}
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
                type="button"
                name="0.75"
                onClick={handleClick}
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
                type="button"
                name="1"
                onClick={handleClick}
                className="trade-input__item "
              >
                100%
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PercentButton;
