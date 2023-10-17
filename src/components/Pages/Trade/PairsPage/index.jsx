import React, { useState, useEffect } from 'react';
import {
  Link,
  Switch,
  Route,
  useLocation,
  useHistory,
  Redirect,
} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import L from 'i18n-react';

import PairsTableHead from './PairsTableHead';
import routes from '../../../../routes';
import PairsSpot from './PairsSpot';
import types from '../../../../redux/types';
import SpotFavorites from './Favorites/SpotFavorites';
import SocketAssetsPairs from '../../../HOC/SocketAssetsPairs';
import { tokenSelector } from '../../../../redux/auth/selectors';
import { assetPairsLoaderSelector } from '../../../../redux/pairs/selectors';

function PairsList() {
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();

  const token = useSelector(tokenSelector);
  const isLogin = token && axios.defaults.headers.common.Authorization;

  const [searchState, setSearchState] = useState('');

  useEffect(() => {
    dispatch({ type: types.GET_SPOT_ASSET_PAIRS_START });
    // dispatch({ type: types.GET_FAVORITE_ASSET_PAIRS_START });
    //   dispatch({ type: types.GET_ASSET_PAIRS_START });
    //   dispatch({ type: types.GET_FAVORITE_ASSET_PAIRS_START });
  }, [dispatch]);

  const handleChangeSearch = e => {
    setSearchState(e.target.value);
  };

  useEffect(() => {
    if (location.pathname === '/pairs') {
      history.replace(routes.Pairs.Spot.path);
    }
  }, [location.pathname]);

  useEffect(() => {
    if (location.pathname === '/pairs/favorites') {
      history.replace(routes.Pairs.Favorites.SpotFavorites.path);
    }
  }, [location.pathname]);

  // const redirect = () => {
  //   history.replace(routes.Auth.Login.path); //check by isLogin
  // };
  return (
    <>
      <SocketAssetsPairs />
      <section className="page-section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-11">
              <div className="page-panel">
                <div className="page-tab">
                  <button
                    onClick={() => history.replace(routes.Pairs.Favorites.path)}
                    type="button"
                    className={
                      location.pathname.includes(routes.Pairs.Favorites.path)
                        ? 'page-tab__item active'
                        : 'page-tab__item'
                    }
                  >
                    {L.translate('Trading.listOfPairs.favorites')}
                  </button>
                  <button
                    onClick={e => {
                      history.replace(routes.Pairs.Spot.path);
                    }}
                    type="button"
                    className={
                      // openTab.spot ? 'page-tab__item active' : 'page-tab__item'
                      location.pathname === routes.Pairs.Spot.path
                        ? 'page-tab__item active'
                        : 'page-tab__item'
                    }
                  >
                    {L.translate('Trading.listOfPairs.spot')}
                  </button>
                </div>
                <div className="panel-search">
                  <div className="field-wrap">
                    <span className="panel-search__icon">
                      <i className="fa fa-search" />
                    </span>
                    <input
                      value={searchState}
                      onChange={e => handleChangeSearch(e)}
                      type="text"
                      className="form-item form-item--type3 pairs-search-input"
                      placeholder={L.translate(
                        'Trading.listOfPairs.coin_search',
                      )}
                    />
                  </div>
                </div>
              </div>

              {location.pathname.includes('/pairs/favorites') ? (
                <div className="pair-switch">
                  <button
                    type="button"
                    onClick={e =>
                      history.replace(routes.Pairs.Favorites.SpotFavorites.path)
                    }
                    className={
                      location.pathname ===
                      routes.Pairs.Favorites.SpotFavorites.path
                        ? 'pair-switch__item active'
                        : 'pair-switch__item'
                    }
                  >
                    {L.translate('Trading.listOfPairs.spot')}
                  </button>
                </div>
              ) : null}

              <div className="table-box">
                <table className="page-table page-table--sm-transform page-table--small-text">
                  <PairsTableHead />

                  <Switch>
                    {/* Favorites Routes start */}
                    <Route path={routes.Pairs.Favorites.SpotFavorites.path}>
                      <SpotFavorites searchState={searchState} />
                    </Route>
                    {/* Favorites Routes end */}

                    <Route path={routes.Pairs.Spot.path}>
                      <PairsSpot
                        // assetPairs={assetPairs}
                        searchState={searchState}
                      />
                    </Route>
                  </Switch>
                </table>
                {/* {isAssetPairsLoading ? <LoaderTable /> : null} */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default PairsList;
