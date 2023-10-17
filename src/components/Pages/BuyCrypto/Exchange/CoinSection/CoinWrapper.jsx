import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import L from 'i18n-react';
import types from '../../../../../redux/types';
import routes from '../../../../../routes';
import { assetsWalletSelector } from '../../../../../redux/wallets/selectors';
import { cropNumber, numberWithCommas } from '../../../../../services/helpers';

function CoinWrapper(props) {
  const { coin_name, last_price_usd, change_24, view_decimal } = props;
  const dispatch = useDispatch();
  const name = coin_name.split('_')[0].toUpperCase();
  const assets = useSelector(assetsWalletSelector);

  const [img, setImg] = useState('');
  const selectImg = () => {
    const assetImg = assets?.find(asset =>
      coin_name.split('_')[0].includes(asset.code),
    )?.img_path;
    setImg(assetImg);
  };

  const handleChangeAssetPair = () => {
    dispatch({ type: types.SET_CURRENT_PAIR_START, payload: coin_name });
  };

  useEffect(() => {
    selectImg();
  }, []);

  return (
    <div className="exchange-coins__col">
      <Link
        to={routes.Trade.SpotTrade.path}
        className="coin-card coin-card--exchange"
        onClick={handleChangeAssetPair}
      >
        <span className="d-flex coin-card__header">
          <span className="coin">
            <span className="coin__img">
              <img src={img} alt="" />
            </span>
            <p className="coin__name">{name}</p>
          </span>
          <p className="coin-value">
            {' '}
            ${numberWithCommas(cropNumber(last_price_usd, view_decimal))}
          </p>
        </span>
        <span className="coin-change coin-card__change">
          <p className="coin-change__name">
            {L.translate('BuyCrypto.hours_change')}
          </p>
          {change_24 >= 0 ? (
            <span className="coin-change__val">
              {cropNumber(change_24, 2)}%
            </span>
          ) : (
            <span className="coin-change__val coin-change__val--type2">
              {cropNumber(change_24, 2)}%
            </span>
          )}
        </span>
      </Link>
    </div>
  );
}

export default CoinWrapper;
