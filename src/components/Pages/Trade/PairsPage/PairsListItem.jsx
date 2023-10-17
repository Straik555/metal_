import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import L from 'i18n-react';

import types from '../../../../redux/types';
import routes from '../../../../routes';
import {
  cropNumber,
  toCrop,
  numberWithCommas,
} from '../../../../services/helpers';
import { storeDecimalPairs } from '../../../../redux/decimals/selectors';

function PairsListItem(props) {
  const {
    id,
    code,
    active,
    maker_active,
    has_course_data,
    buy_price,
    sell_price,
    rate,
    rate_usd,
    change_24_hour,
    volume24h,
    last_price,
    last_price_usd,
    low24,
    high24,
    for_margin,
    favorite,
  } = props.pair;

  const { push } = useHistory();
  // const auth = useSelector(store => store.auth.auth);
  const [isFavorite, setIsFavorite] = useState(favorite);
  const dispatch = useDispatch();
  const decimalPairs = useSelector(storeDecimalPairs);
  const getDecimals = cod => {
    return decimalPairs[cod];
  };
  const divideCurrencyLabel = currancyCode => {
    const splittedCurrancyCode = currancyCode?.split('_');
    const leftPart = splittedCurrancyCode[0];
    const rightPart = splittedCurrancyCode[1];

    return (
      <p className="slash-value table-coin__name">
        {leftPart.toUpperCase()}
        <span className="slash-value__right"> / {rightPart.toUpperCase()}</span>
      </p>
    );
  };

  const handleSetFavorite = () => {
    // setIsFavorite(prevState => !prevState);
    dispatch({
      type: types.UPDATE_FAVORITE_ASSET_PAIR_START,
      payload: { id, setIsFavorite },
    });
  };

  const handleChangeAssetPair = () => {
    dispatch({ type: types.SET_CURRENT_PAIR_START, payload: code });
  };

  return (
    <>
      <tr data-tr="Currency 1">
        <td data-label="Currency">
          <div className="table-coin">
            <button
              onClick={() => handleSetFavorite()}
              type="button"
              className={isFavorite ? 'fav-star active' : 'fav-star'}
            >
              <svg
                className="svg-inline--fa fa-star fa-w-18"
                aria-hidden="true"
                data-prefix="fa"
                data-icon="star"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 576 512"
                data-fa-i2svg=""
              >
                <path
                  fill="currentColor"
                  d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"
                />
              </svg>
            </button>
            {divideCurrencyLabel(code)}
            {/* {for_margin ? <span className="include-margin">M</span> : null} */}
          </div>
        </td>
        <td className="" data-label="Last price">
          <p className="table-text slash-value">
            {numberWithCommas(toCrop(getDecimals(code))(last_price))}{' '}
            <span className="slash-value__right">
              / ${numberWithCommas(toCrop(getDecimals(code))(last_price_usd))}
            </span>
          </p>
        </td>
        <td className="" data-label="24h Change">
          <p
            className={
              change_24_hour > 0 ? 'table-text positive' : 'table-text negative'
            }
          >
            {change_24_hour > 0
              ? `+${toCrop(2)(change_24_hour)}`
              : toCrop(2)(change_24_hour)}
            %
          </p>
        </td>
        <td className="" data-label="24h High">
          <p className="table-text">
            {numberWithCommas(toCrop(getDecimals(code))(high24))}
          </p>
        </td>
        <td className="" data-label="24h Low">
          <p className="table-text">
            {numberWithCommas(toCrop(getDecimals(code))(low24))}
          </p>
        </td>
        {/* <td className="" data-label="Market Cap">
        <p className="table-text">$1,513.81M</p>
      </td> */}
        <td className="" data-label="24h Volume">
          <p className="table-text">
            {numberWithCommas(toCrop(getDecimals(code))(volume24h))}
          </p>
        </td>
        <td className="" data-label="Edit">
          <div className="table-action">
            <Link
              to={
                window.location.pathname.includes('margin')
                  ? routes.Trade.MarginTrade.path
                  : routes.Trade.SpotTrade.path
              }
            >
              <button
                onClick={() => handleChangeAssetPair()}
                type="button"
                className="page-btn page-btn--type5"
              >
                {L.translate('Trading.listOfPairs.trade')}
              </button>
            </Link>
          </div>
        </td>
      </tr>
    </>
  );
}

export default PairsListItem;
