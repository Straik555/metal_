import React from 'react';

const PercentButton = ({ handlePercent }) => {
  return (
    <>
      <div className="margin-fields">
        <div className="margin-fields__col">
          <div className="field-wrap">
            <button
              type="button"
              className="form-item"
              value={0.25}
              onClick={handlePercent}
            >
              25%
            </button>
          </div>
        </div>
        <div className="margin-fields__col">
          <div className="field-wrap">
            <button
              type="button"
              className="form-item"
              value={0.5}
              onClick={handlePercent}
            >
              50%
            </button>
          </div>
        </div>
        <div className="margin-fields__col">
          <div className="field-wrap">
            <button
              type="button"
              className="form-item"
              value={0.75}
              onClick={handlePercent}
            >
              75%
            </button>
          </div>
        </div>
        <div className="margin-fields__col">
          <div className="field-wrap">
            <button
              type="button"
              className="form-item"
              value={1}
              onClick={handlePercent}
            >
              100%
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PercentButton;
