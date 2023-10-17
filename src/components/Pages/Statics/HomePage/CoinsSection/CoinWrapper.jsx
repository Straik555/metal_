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
  const assets = useSelector(assetsWalletSelector);

  const name = coin_name?.split('_')[0]?.toUpperCase();
  const [img, setImg] = useState('');
  const selectImg = () => {
    const assetImg = assets?.find(asset =>
      coin_name?.split('_')[0]?.includes(asset.code),
    )?.img_path;
    setImg(assetImg);
  };

  const handleChangeAssetPair = () => {
    dispatch({ type: types.SET_CURRENT_PAIR_START, payload: coin_name });
  };

  useEffect(() => {
    selectImg();
  }, [assets]);

  return (
    <div className="col-lg-4">
      <div className="coin-card">
        <div className="d-flex coin-card__header">
          <div className="coin">
            <div className="coin__img">
              <img src={img} alt="" />
            </div>
            <p className="coin__name">{name}</p>
          </div>
          <p className="coin-value">
            ${numberWithCommas(cropNumber(last_price_usd, view_decimal))}
          </p>
        </div>
        <div className="coin-change coin-card__change">
          <p className="coin-change__name">
            {L.translate('HomePage.CoinSection.24h_change')}
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
        </div>

        <Link to={routes.Trade.SpotTrade.path}>
          <button
            onClick={handleChangeAssetPair}
            type="button"
            className="coin-card__btn"
          >
            {L.translate('HomePage.CoinSection.buy_now')}
          </button>
        </Link>
      </div>
    </div>
  );
}

export default CoinWrapper;
