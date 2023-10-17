/* eslint-disable react/prop-types */
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import L from 'i18n-react';
import {
  toCrop,
  cropNumber,
  numberValidation,
  numberWithCommas,
  getNumbersAfterDot,
  checkIsCommaLastCharacter,
  getValidNumber,
  comissionCalculator,
  formatBalance,
} from '../../../../../services/helpers';
import routes from '../../../../../routes';
import types from '../../../../../redux/types';
import { spotWalletSelector } from '../../../../../redux/wallets/selectors';
import { instanceExchangeRateSelector } from '../../../../../redux/bankTransfer/exchange/selectors';
import {
  checkMarkIcon,
  exhangeReverseIcon,
  inputDrodownIcon,
} from './TransferBlockIcons';
import {
  getGoldAssetPairs,
  removeEinNumString, // I don't know why, but "cropNumber" fn can return value like 9.7587e-7
} from './utils';
import { currentAssetFeesSelector } from '../../../../../redux/fees/selectors';

const TransferBlock = ({ assets, assetsPairs, isLogin }) => {
  // hooks
  const dispatch = useDispatch();
  const history = useHistory();
  const rate = useSelector(instanceExchangeRateSelector);
  const assetComissions = useSelector(currentAssetFeesSelector);
  const allSpots = useSelector(spotWalletSelector);

  // state
  const [isOpenFirstAsset, setOpenFirstAsset] = useState(false);
  const [isOpenSecondAsset, setOpenSecondAsset] = useState(false);
  const [firstCurrentAsset, setFirstCurrentAsset] = useState(null); // {} expected later
  const [secondCurrentAsset, setSecondCurrentAsset] = useState(null); // {} expected later
  const [firstAssetQuantity, setFirstAssetQuantity] = useState('1');
  const [secondAssetQuantity, setSecondAssetQuantity] = useState('');
  const [balance, setBalance] = useState([]);
  const [sellSumError, setSellSumError] = useState(false);
  const [buySumError, setBuySumError] = useState(false);
  const [buyValueError, setBuyValueError] = useState(false); // To show error in case like "123,456," but allow value change.

  // varriables
  const isFirstCurrestAssetAreGold = firstCurrentAsset?.code === 'gold';
  const isSecondCurrestAssetAreGold = secondCurrentAsset?.code === 'gold';

  // memoized values
  const goldPairs = useMemo(() => getGoldAssetPairs(assets), [assets]);

  const commissionData = useMemo(() => {
    let fee = assetComissions?.exchange_fee;

    if (
      firstCurrentAsset?.type === 'fiat' &&
      secondCurrentAsset?.code === 'mtcg'
    ) {
      fee = 0; // 0% comission for filat => mtcg exchange
    } else if (
      firstCurrentAsset?.code === 'gold' &&
      secondCurrentAsset?.code === 'mtcg'
    ) {
      fee = 1; // 1% comission for gold => mtcg exchange
    }

    if (!Number.isFinite(fee)) {
      return {
        fee: 0,
        amountToBeCredited: 0,
      };
    }
    if (!secondAssetQuantity) {
      return {
        fee,
        amountToBeCredited: 0,
      };
    }

    const validQuantity = getValidNumber(secondAssetQuantity);
    const comission = comissionCalculator(fee, validQuantity);

    return {
      fee,
      amountToBeCredited: (validQuantity - comission).toFixed(8),
    };
  }, [
    assetComissions,
    secondAssetQuantity,
    firstCurrentAsset,
    secondCurrentAsset,
  ]);

  const currenciesRateString = useMemo(() => {
    const firstCode = firstCurrentAsset?.code?.toUpperCase();
    const secondCode = secondCurrentAsset?.code?.toUpperCase();

    const formatNumber = numberWithCommas(
      toCrop(getNumbersAfterDot(secondCurrentAsset?.code))(rate),
    );

    if (secondCode === 'GOLD') {
      return `1 ${firstCode} = ${formatNumber} grams ${secondCode} `;
    }
    if (firstCode === 'GOLD') {
      return `1 ${firstCode} gram = ${formatNumber} ${secondCode} `;
    }

    return `1 ${firstCode} = ${formatNumber} ${secondCode}`;
  }, [firstCurrentAsset, secondCurrentAsset, rate]);

  // handlers

  const formatAvilableBalance = useCallback(() => {
    // const formmattedBalance = getValidNumber(
    //    numberWithCommas(balance[1]?.balance),
    // ).toFixed(getNumbersAfterDot(balance[0]));

    const formmattedBalance = formatBalance(balance[1]?.balance, balance[0]);

    const result = `${formmattedBalance} ${balance[0]?.toUpperCase()}`;
    return result;
  }, [balance]);

  const handleFirstCurrentAssetChange = useCallback(
    assetToChange => {
      if (!assetToChange) return;

      const isGold = assetToChange?.code === 'gold';
      if (!isGold) {
        setFirstCurrentAsset(assetToChange);
        return;
      }
      const isGoldPair = goldPairs.some(
        ({ code }) => code === secondCurrentAsset?.code,
      );
      setFirstCurrentAsset(assetToChange);
      if (!isGoldPair) setSecondCurrentAsset(goldPairs[0]);
    },
    [goldPairs, secondCurrentAsset],
  );

  const handleSecondCurentAssetChange = useCallback(
    assetToChange => {
      if (!assetToChange) return;

      const isGold = assetToChange?.code === 'gold';
      if (!isGold) {
        setSecondCurrentAsset(assetToChange);
        return;
      }
      const isGoldPair = goldPairs.some(
        ({ code }) => code === firstCurrentAsset?.code,
      );
      setSecondCurrentAsset(assetToChange);
      if (!isGoldPair) setFirstCurrentAsset(goldPairs[0]);
    },
    [goldPairs, firstCurrentAsset],
  );

  const handleInputChange = useCallback(
    e => {
      const { name, value } = e.target;

      if (name === 'firstAsset' && numberValidation(value)) {
        setFirstAssetQuantity(value);
        const currentSpot = allSpots[firstCurrentAsset?.code];
        const validNumber = getValidNumber(value); // to get the correct value when input value like 123,456.789
        const numbersAfterDot = getNumbersAfterDot(secondCurrentAsset?.code);

        const cropped = removeEinNumString(
          cropNumber(validNumber * rate, numbersAfterDot),
        );

        setSecondAssetQuantity(cropped);

        if (validNumber > Number(currentSpot?.balance) || validNumber === 0) {
          setSellSumError(true);
          return;
        }
        setSellSumError(false);
        setBuySumError(false);
      }

      if (name === 'secondAsset' && numberValidation(value)) {
        setSecondAssetQuantity(value);
        const validNumber = getValidNumber(value); // to get the correct value when input value like 123,456.789
        const numbersAfterDot = getNumbersAfterDot(firstCurrentAsset?.code);
        const converted = validNumber / rate;

        const cropped = removeEinNumString(
          cropNumber(converted, numbersAfterDot),
        );
        setFirstAssetQuantity(cropped);

        const spotToExchange = allSpots[firstCurrentAsset.code];

        if (converted > Number(spotToExchange?.balance) || validNumber === 0) {
          setBuySumError(true);
          return;
        }
        if (checkIsCommaLastCharacter(value)) {
          setBuyValueError(true);
          return;
        }

        setBuySumError(false);
        setSellSumError(false);
        setBuyValueError(false);
      }
    },
    [allSpots, firstCurrentAsset, secondCurrentAsset, rate],
  );

  const handleRevers = useCallback(() => {
    setFirstCurrentAsset(secondCurrentAsset);
    setSecondCurrentAsset(firstCurrentAsset);

    const validNumber = getValidNumber(firstAssetQuantity);
    const nextFirstCurrentAsset = allSpots[secondCurrentAsset?.code];

    // To check sell value and prevent case when we send a request with value > balance
    if (validNumber > Number(nextFirstCurrentAsset?.balance)) {
      setSellSumError(true);
      return;
    }
    setSellSumError(false);
  }, [allSpots, firstAssetQuantity, firstCurrentAsset, secondCurrentAsset]);

  const handleBlur = useCallback(() => {
    // without setTimeout the dropdown will close before we select asset
    if (isOpenFirstAsset) {
      setTimeout(() => {
        setOpenFirstAsset(false);
      }, 300);
    }
    if (isOpenSecondAsset) {
      setTimeout(() => {
        setOpenSecondAsset(false);
      }, 300);
    }
  }, [isOpenFirstAsset, isOpenSecondAsset]);

  const handleClickExchange = useCallback(() => {
    if (!isLogin) {
      history.push(routes.Auth.Signup.path);
      return;
    }
    if (sellSumError || buySumError || buyValueError) return;

    dispatch({
      type: types.EXCHANGE_START,
      payload: {
        quantity: firstAssetQuantity,
        exchange_min: firstCurrentAsset.exchange_min,
        from_asset_id: firstCurrentAsset.id,
        to_asset_id: secondCurrentAsset.id,
      },
    });

    // setting default values
    setFirstAssetQuantity('1');
    const numbersAfterDot = getNumbersAfterDot(secondCurrentAsset?.code);
    const cropped = removeEinNumString(cropNumber(rate, numbersAfterDot));
    setSecondAssetQuantity(cropped);
  }, [
    history,
    dispatch,
    sellSumError,
    buySumError,
    buyValueError,
    isLogin,
    rate,
    firstAssetQuantity,
    firstCurrentAsset,
    secondCurrentAsset,
  ]);

  // lifecycle
  useEffect(() => {
    if (assets.length && assetsPairs.length) {
      const actualAssets = assets.filter(asset =>
        assetsPairs.some(
          pairs =>
            pairs.code.startsWith(asset.code) ||
            pairs.code.endsWith(asset.code),
        ),
      );
      const btcAsset = actualAssets.find(asset => asset.code === 'btc');
      const usdtAsset = actualAssets.find(asset => asset.code === 'usdt');
      setFirstCurrentAsset(actualAssets[0] || btcAsset);
      setSecondCurrentAsset(actualAssets[1] || usdtAsset);
    }
  }, [assets, assetsPairs]);

  useEffect(() => {
    if (firstCurrentAsset && secondCurrentAsset) {
      dispatch({
        type: types.EXCHANGE_RATE_START,
        payload: {
          from_asset_id: firstCurrentAsset.id,
          to_asset_id: secondCurrentAsset.id,
        },
      });
    }
  }, [firstCurrentAsset, secondCurrentAsset, dispatch]);

  useEffect(() => {
    if (secondCurrentAsset) {
      const numbersAfterDot = getNumbersAfterDot(secondCurrentAsset?.code);
      const cropped = removeEinNumString(
        cropNumber(firstAssetQuantity * rate, numbersAfterDot),
      );
      setSecondAssetQuantity(cropped);
    }
    // temp
    // uncorrect dependency array because we need to call this effect once when we got the rate
    // when dep. array is correct we have inccorrect "buy" input value.
  }, [rate]);

  useEffect(() => {
    if (firstCurrentAsset) {
      const changeWallet = Object.entries(allSpots).find(
        key => key[0] === firstCurrentAsset.code,
      );
      setBalance(changeWallet);
    }
  }, [firstCurrentAsset, allSpots]);

  useEffect(() => {
    if (!secondCurrentAsset) return;

    const assetID = secondCurrentAsset?.id;

    dispatch({
      type: types.GET_ASSET_FEES_START,
      assetID,
    });
  }, [secondCurrentAsset, dispatch]);

  return (
    <div className="exchange-wrap">
      <div className="container">
        <p className="exchange-value">
          {firstCurrentAsset && secondCurrentAsset ? currenciesRateString : ''}
        </p>
        <div className="row justify-content-center">
          <div className="col-lg-11">
            <div className="exchange-block">
              <div className="exchange-block__col">
                <span className="field-label field-label--type2">
                  {L.translate('BuyCrypto.sell')}
                </span>
                <div className="field-wrap exchange-field">
                  <div
                    className={
                      sellSumError
                        ? 'exchange-field__item error'
                        : 'exchange-field__item'
                    }
                  >
                    <input
                      autoComplete="off"
                      className="form-item"
                      name="firstAsset"
                      value={numberWithCommas(firstAssetQuantity)}
                      onChange={handleInputChange}
                    />
                    {sellSumError && (
                      <div className="error-text">
                        <p className="error-text__item">
                          {L.translate('BuyCrypto.sell_error')}
                        </p>
                      </div>
                    )}
                  </div>
                  <ul
                    className={
                      isOpenFirstAsset
                        ? 'exchange-select active'
                        : 'exchange-select'
                    }
                    onBlur={handleBlur}
                  >
                    <li>
                      <button
                        type="button"
                        onClick={() => setOpenFirstAsset(prev => !prev)}
                      >
                        {firstCurrentAsset?.code?.toUpperCase()}
                        {inputDrodownIcon}
                      </button>
                      <div className="drop-list">
                        <ul className="drop-list__item">
                          {assets
                            .filter(asset => {
                              if (!isSecondCurrestAssetAreGold) {
                                return secondCurrentAsset?.code !== asset.code;
                              }
                              return goldPairs.some(
                                ({ code }) => code === asset?.code,
                              );
                            })
                            .map(asset => (
                              <li key={asset.id}>
                                <button
                                  type="button"
                                  className="drop-btn"
                                  onClick={() =>
                                    handleFirstCurrentAssetChange(asset)
                                  }
                                >
                                  {checkMarkIcon}
                                  {asset.code.toUpperCase()}
                                </button>
                              </li>
                            ))}
                        </ul>
                      </div>
                    </li>
                  </ul>
                </div>
                {isLogin && (
                  <p className="exchange-balance">
                    {L.translate('BuyCrypto.available_balance')}{' '}
                    <span>
                      {balance.length && formatAvilableBalance(balance)}
                    </span>
                  </p>
                )}
              </div>
              <button type="button" onClick={handleRevers}>
                <div className="exchange-block__icon">{exhangeReverseIcon}</div>
              </button>
              <div className="exchange-block__col">
                <span className="field-label field-label--type2">
                  {L.translate('BuyCrypto.buy')}
                </span>
                <div className="field-wrap exchange-field">
                  <div
                    className={
                      buySumError || buyValueError
                        ? 'exchange-field__item error'
                        : 'exchange-field__item'
                    }
                  >
                    <input
                      autoComplete="off"
                      className="form-item"
                      name="secondAsset"
                      value={numberWithCommas(secondAssetQuantity)}
                      onChange={handleInputChange}
                    />
                    {buySumError && (
                      <div className="error-text">
                        <p className="error-text__item">
                          {L.translate('BuyCrypto.buy_error')}
                        </p>
                      </div>
                    )}
                    {buyValueError && (
                      <div className="error-text">
                        <p className="error-text__item">
                          {L.translate('BuyCrypto.sell_invalid_value')}
                        </p>
                      </div>
                    )}
                  </div>
                  <ul
                    className={
                      isOpenSecondAsset
                        ? 'exchange-select active'
                        : 'exchange-select'
                    }
                    onBlur={handleBlur}
                  >
                    <li>
                      <button
                        type="button"
                        onClick={() => setOpenSecondAsset(prev => !prev)}
                      >
                        {secondCurrentAsset?.code?.toUpperCase()}
                        {inputDrodownIcon}
                      </button>
                      <div className="drop-list">
                        <ul className="drop-list__item">
                          {/* PREVIOUS FILTER CODE */}
                          {/* assets
                            .filter(asset => {
                              return (
                                assetsPairs.some(
                                  pairs =>
                                    pairs.code.startsWith(asset.code) ||
                                    pairs.code.endsWith(asset.code),
                                ) && firstCurrentAsset?.code !== asset.code
                              );
                            }) */}

                          {assets
                            .filter(asset => {
                              if (!isFirstCurrestAssetAreGold) {
                                return firstCurrentAsset?.code !== asset.code;
                              }
                              return goldPairs.some(
                                ({ code }) => code === asset?.code,
                              );
                            })
                            .map(asset => (
                              <li key={asset.id}>
                                <button
                                  type="button"
                                  className="drop-btn"
                                  onClick={() =>
                                    handleSecondCurentAssetChange(asset)
                                  }
                                >
                                  {checkMarkIcon}
                                  {asset.code.toUpperCase()}
                                </button>
                              </li>
                            ))}
                        </ul>
                      </div>
                    </li>
                  </ul>
                </div>
                {assetComissions?.exchange_fee !== undefined && (
                  <>
                    <p className="exchange-balance">
                      {L.translate('BuyCrypto.comission_info')}
                      <span style={{ margin: '0 5px' }}>
                        {commissionData.fee}%
                      </span>
                    </p>
                    <p className="exchange-balance" style={{ marginTop: 25 }}>
                      {L.translate('BuyCrypto.amount_info')}
                      <span>
                        {' '}
                        {formatBalance(
                          commissionData.amountToBeCredited,
                          secondCurrentAsset?.code,
                        )}
                      </span>
                    </p>
                  </>
                )}
              </div>
            </div>
            <div className="exchange-confirm">
              <button
                type="button"
                className="page-btn"
                onClick={handleClickExchange}
              >
                {L.translate('BuyCrypto.exchange')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransferBlock;
