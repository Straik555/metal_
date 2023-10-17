import React, { useEffect, useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Axios from 'axios';
import L from 'i18n-react';
import types from '../../../../redux/types';
import {
  cropNumber,
  toCrop,
  numberWithCommas,
} from '../../../../services/helpers';
import SocketAssetsPairs from '../../../HOC/SocketAssetsPairs';
import SocketBalances from '../../../HOC/SocketBalances';
import { storeDecimalPairs } from '../../../../redux/decimals/selectors';
import { tokenSelector } from '../../../../redux/auth/selectors';
import {
  assetPairsSelector,
  favoritePairsSelector,
} from '../../../../redux/pairs/selectors';
import { dataPairs } from './selectPairsHelpers';
import { starIcon } from './selectPairsIcons';

const SelectPairs = () => {
  // const token = allStore?.user?.token;
  // const assetPairs = allStore?.assetPairs?.assetPairs;
  // const currentPair = allStore?.currentPair;
  // const assetFavorites = allStore?.assetPairs?.favoritePairs;
  // const allStore = useSelector(state => state);
  const dispatch = useDispatch();
  const location = useLocation();
  const token = useSelector(tokenSelector);
  const assetPairs = useSelector(assetPairsSelector);
  const assetFavorites = useSelector(favoritePairsSelector);
  const currentPair = useSelector(state => state.currentPair);
  const decimalPairs = useSelector(storeDecimalPairs);

  const [search, setSearch] = useState('');
  const [sort, setSort] = useState(false);
  const [pairs, setPairs] = useState([]);
  const [lastPairs, setLastPairs] = useState([]);

  const isLogin = token && Axios.defaults.headers.common.Authorization;
  const getDecimals = cod => decimalPairs[cod];

  useEffect(() => {
    if (isLogin) {
      dispatch({ type: types.GET_SPOT_ASSET_PAIRS_START });
    } else {
      dispatch({ type: types.GET_ASSET_PAIRS_START });
    }
  }, [isLogin, dispatch]);

  // const mapperFavorites = (arr1, arr2) => {
  //   return arr1.map(asset => ({
  //     ...asset,
  //     favorite: !!arr2.find(e => e.code === asset.code),
  //   }));
  // };

  const changeFavorites = useCallback(
    e => {
      const { pair } = e.currentTarget.dataset;
      dispatch({
        type: types.UPDATE_FAVORITE_ASSET_PAIR_START,
        payload: { id: pair },
      });
    },
    [dispatch],
  );

  const changePair = useCallback(
    e => {
      if (e.target.type === 'button') return;
      const { pair } = e.currentTarget.dataset;
      if (!pair || currentPair.pair === pair) return;
      dispatch({ type: types.SET_CURRENT_PAIR_START, payload: pair });
    },
    [currentPair, dispatch],
  );

  useEffect(() => {
    setPairs(
      sort
        ? dataPairs(location.pathname, assetPairs, assetFavorites, search).sort(
            (a, b) => +b.favorite - +a.favorite,
          )
        : dataPairs(location.pathname, assetPairs, assetFavorites, search),
    );
  }, [location.pathname, assetPairs, assetFavorites, search, sort]);

  // useEffect for update colors last_price_usd previous and actual price
  useEffect(() => {
    if (lastPairs.length) {
      const pairsData = lastPairs.map(pair => {
        const actualPairData = pairs.find(newPair => newPair.id === pair.id);
        const newPairData = assetPairs.find(newPair => newPair.id === pair.id);
        if (
          pair?.id === actualPairData?.id &&
          actualPairData?.last_price_usd !== newPairData?.last_price_usd
        ) {
          return {
            ...pair,
            last_price_usd: actualPairData.last_price_usd,
          };
        }
        return pair;
      });
      setLastPairs(pairsData);
    } else {
      setLastPairs(pairs);
    }
  }, [pairs, assetPairs]);

  const carrentMenuShow = e => e.currentTarget.classList.add('active');
  const carrentMenuHiden = e => e.currentTarget.classList.remove('active');
  const parrentMenuShow = e => e.currentTarget.classList.add('active');

  useEffect(() => {
    if (location.pathname.includes('/margin')) {
      const test = pairs.find(pair => pair.code === currentPair.pair);
      if (!test && pairs.length) {
        dispatch({
          type: types.SET_CURRENT_PAIR_START,
          payload: pairs[0]?.code,
        });
      }
    }
  }, [location, pairs]);

  return (
    <>
      <SocketAssetsPairs />
      <SocketBalances />
      <div
        className="pair-search"
        onMouseOver={carrentMenuShow}
        onFocus={carrentMenuShow}
        onMouseOut={carrentMenuHiden}
        onBlur={carrentMenuHiden}
      >
        <p className="pair-search__item">
          {currentPair?.pair && currentPair?.pair?.replace('_', '/')}
          <span>
            <i className="fa fa-angle-down" />
          </span>
        </p>
        <div
          className="pair-search__drop"
          onMouseOut={parrentMenuShow}
          onBlur={parrentMenuShow}
        >
          <div className="top-search">
            <button
              type="button"
              className={sort ? 'top-search__fav active' : 'top-search__fav'}
              onClick={() => setSort(prevSort => !prevSort)}
            >
              {starIcon}
            </button>
            <div className="top-search__field">
              <div className="field-wrap">
                <input
                  type="text"
                  className="form-item"
                  placeholder="Search..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
                <span className="field-icon">
                  <i className="fa fa-search" />
                </span>
              </div>
            </div>
          </div>
          <div className="top-table">
            <table>
              <thead>
                <tr>
                  <td>
                    <span>{L.translate('Header.SelectPairs.coin')}</span>
                  </td>
                  <td>
                    <span>{L.translate('Header.SelectPairs.last_price')}</span>
                  </td>
                  <td>
                    <span>{L.translate('Header.SelectPairs.volume')}</span>
                  </td>
                  <td>
                    <span>{L.translate('Header.SelectPairs.change')}</span>
                  </td>
                </tr>
              </thead>
              <tbody>
                {pairs.length
                  ? pairs.map(pair => {
                      const lastPairData = lastPairs.find(
                        lastPair => lastPair.id === pair.id,
                      );
                      return (
                        <tr
                          key={pair.id + pair.code}
                          data-pair={pair.code}
                          onClick={changePair}
                        >
                          <td>
                            <div className="coin">
                              <button
                                type="button"
                                data-pair={pair.id}
                                className={
                                  pair.favorite ? 'fav-star active' : 'fav-star'
                                }
                                onClick={changeFavorites}
                              >
                                {starIcon}
                              </button>
                              <span className="coin__name">
                                {pair?.code?.replace('_', '/').toUpperCase()}
                              </span>
                            </div>
                          </td>
                          <td>
                            <p>
                              {numberWithCommas(
                                toCrop(getDecimals(pair?.code))(
                                  pair.last_price || 0,
                                ),
                              )}{' '}
                              <span
                                className={
                                  pair?.last_price_usd >=
                                  lastPairData?.last_price_usd
                                    ? 'green'
                                    : 'red'
                                }
                              >
                                $
                                {numberWithCommas(
                                  toCrop(getDecimals(pair?.code))(
                                    pair.last_price_usd || 0,
                                  ),
                                )}
                              </span>
                            </p>
                          </td>
                          <td>
                            <p>
                              {numberWithCommas(
                                toCrop(getDecimals(pair?.code))(
                                  pair.volume24h || 0,
                                ),
                              )}
                            </p>
                          </td>
                          <td>
                            <p
                              className={
                                pair.change_24_hour >= 0 ? 'green' : 'red'
                              }
                            >
                              {toCrop(2)(pair.change_24_hour)}%
                            </p>
                          </td>
                        </tr>
                      );
                    })
                  : null}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

// export default SelectPairs;
export default React.memo(SelectPairs);
