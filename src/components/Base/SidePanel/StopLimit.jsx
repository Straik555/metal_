import React, { useState } from 'react';

function StopLimit(props) {
  const { auth, balance } = props;

  const [stopLimitOrderState, setStopLimitOrderState] = useState({
    stop: null,
    limit: null,
    amount: null,
    total: null,
  });

  const countOreder = e => {
    setStopLimitOrderState({
      ...stopLimitOrderState,
      amount: e.target.value,
    });
  };
  return (
    <>
      <div className="input-wrap ">
        <div className="field-wrap trade-input ">
          <input
            type="number"
            className="trade-input__item "
            placeholder="Stop"
          />
          <p className="input-info">
            <span>BTC</span>
          </p>
        </div>
      </div>
      <div className="input-wrap ">
        <div className="field-wrap trade-input ">
          <input
            type="number"
            className="trade-input__item "
            placeholder="Limit"
          />
          <p className="input-info">
            <span>BTC</span>
          </p>
        </div>
      </div>
      <div className="input-wrap ">
        <div className="field-wrap trade-input ">
          <input
            type="number"
            className="trade-input__item "
            placeholder="Amount"
            value={stopLimitOrderState.amount}
          />
          <p className="input-info">
            <span>ETH</span>
          </p>
        </div>
      </div>
      <div className="margin-row d-flex">
        <div className="margin-col">
          <div className="input-wrap input-wrap--margin">
            <div className="field-wrap trade-input trade-input--margin">
              <button
                onClick={e => countOreder(e)}
                value={balance * 0.25}
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
                onClick={e => countOreder(e)}
                value={balance * 0.5}
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
                onClick={e => countOreder(e)}
                value={balance * 0.75}
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
                onClick={e => countOreder(e)}
                value={balance}
                className="trade-input__item "
              >
                100%
              </button>
            </div>
          </div>
        </div>
      </div>
      {auth && (
        <div className="input-wrap ">
          <div className="field-wrap trade-input ">
            <input
              type="number"
              className="trade-input__item "
              placeholder="Total"
            />
            <p className="input-info">
              <span>BTC</span>
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export default StopLimit;
