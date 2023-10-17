import React, { useState } from 'react';
import PercentButton from '../PercentButton';

const LimitOrder = ({ auth, balance }) => {
  // const [amount, setAmount] = useState('');
  // const handleAmount = e => {
  //   const { value } = e.target;
  //   if (value || value === '') {
  //     setAmount(value);
  //   }
  // };
  // const clearAmount = () => {
  //   setAmount('');
  // };

  const [limitOrderState, setLimitOrderState] = useState({
    amount: null,
    price: null,
    total: null,
  });

  const countOreder = e => {
    setLimitOrderState({
      ...limitOrderState,
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
            placeholder="Amount"
            value={limitOrderState.amount}
          />
          <p className="input-info">
            <span>ETH</span>
          </p>
        </div>
      </div>
      <div className="input-wrap ">
        <div className="field-wrap trade-input ">
          <input
            type="number"
            className="trade-input__item "
            placeholder="Price"
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

      <span style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span className="trade-val">
          Total: <span>0</span> BTC
        </span>
        <span className="trade-val">$ 0</span>
      </span>
      <span className="trade-val">
        Fee: <span>~0</span> ETH
      </span>
    </>
  );
};

export default LimitOrder;
