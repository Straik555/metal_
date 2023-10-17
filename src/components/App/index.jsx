import React, { StrictMode, Suspense, useEffect, useRef } from 'react';
import {
  Redirect,
  Route,
  Switch,
  useHistory,
  useLocation,
} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import L from 'i18n-react';
import Headers from '../Base/Headers';
import routes from '../../routes';
import Footers from '../Base/Footers';
import AuthWrapper from '../Base/AuthWrapper';
import types from '../../redux/types';
import { languages } from '../../languages';
import SocketConnect from '../HOC/SocketConnect';
import { Modal } from '../Base/Modal';
import Loader from '../Base/Loader';
import SocketPrivateNotifications from '../HOC/SocketPrivateNotifications';
import { intervalReguest } from '../../services/axiosInterceptors';

const App = () => {
  const dispatch = useDispatch();
  // const allStore = useSelector(state => state);
  const token = useSelector(state => state?.user?.token);
  const lang = useSelector(state => state?.language?.language);
  // const isLogin = token || axios.defaults.headers.common.Authorization;
  const location = useLocation();
  const history = useHistory();

  L.setTexts(languages[lang]);
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;
      intervalReguest();
    }
  }, [token]);

  useEffect(() => {
    dispatch({ type: types.GET_ASSETS_START });
  }, [dispatch]);

  useEffect(() => {
    if (token) {
      dispatch({ type: types.GET_USER_DATA_START });
      dispatch({ type: types.GET_WALLETS_START });
    }
  }, [token, dispatch]);

  useEffect(() => {
    if (
      location.pathname === routes.Auth.ResetPassword.path &&
      location.search
    ) {
      history.replase(`${routes.Auth.ResetPassword.path}/${location.search}`);
    }
    if (location.pathname === routes.Auth.Login.path && location.search) {
      history.replase(`${routes.Auth.Login.path}/${location.search}`);
    }
  }, [history, location.pathname, location.search]);

  const refAutoScroll = useRef(null);
  useEffect(() => {
    if (refAutoScroll?.current && window.pageYOffset > 0) {
      refAutoScroll.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [location.pathname, refAutoScroll]);

  return (
    <>
      <Modal />
      <StrictMode>
        <SocketConnect />
        <SocketPrivateNotifications />
        <div ref={refAutoScroll} />
        <div className="wrapper">
          <div className="content">
            {!history.location.pathname.includes('/trade/chart') && (
              <Headers isLogin={token} />
            )}
            <Suspense fallback={<Loader />}>
              {/* <Suspense fallback={loaderStart()}> */}
              <Switch>
                {token && (
                  <AuthWrapper
                    path={routes.User.path}
                    component={routes.User.component}
                  />
                )}
                {token && (
                  <AuthWrapper
                    path={routes.Wallets.path}
                    component={routes.Wallets.component}
                  />
                )}

                {token && (
                  <AuthWrapper
                    path={routes.Pairs.path}
                    component={routes.Pairs.component}
                  />
                )}

                <AuthWrapper
                  exact
                  path={routes.Root.path}
                  component={routes.Home.component}
                />
                <AuthWrapper
                  path={routes.Trade.ChartPage.path}
                  component={routes.Trade.ChartPage.component}
                />
                <AuthWrapper
                  path={routes.Auth.Login.path}
                  component={routes.Auth.Login.component}
                />
                <AuthWrapper
                  path={routes.Auth.Signup.path}
                  component={routes.Auth.Signup.component}
                />
                <AuthWrapper
                  path={routes.Auth.Signup.path}
                  component={routes.Auth.Signup.component}
                />
                <AuthWrapper
                  path={routes.TestingDnD.path}
                  component={routes.TestingDnD.component}
                />

                <AuthWrapper
                  path={routes.BuyCrypto.Exchange.path}
                  component={routes.BuyCrypto.Exchange.component}
                />

                <AuthWrapper
                  path={routes.Trade.SpotTrade.path}
                  component={routes.Trade.SpotTrade.component}
                />

                <AuthWrapper
                  path={routes.FAQs.path}
                  component={routes.FAQs.component}
                />

                <AuthWrapper
                  path={routes.AboutUs.path}
                  component={routes.AboutUs.component}
                />

                <AuthWrapper
                  path={routes.ContactUs.path}
                  component={routes.ContactUs.component}
                />

                <Route
                  path={routes.Auth.Recovery.path}
                  component={routes.Auth.Recovery.component}
                />

                <AuthWrapper
                  path={routes.Auth.ResetPassword.path}
                  component={routes.Auth.ResetPassword.component}
                />

                <AuthWrapper
                  path={routes.TermsConditions.path}
                  component={routes.TermsConditions.component}
                />

                <AuthWrapper
                  path={routes.PrivacyPolicy.path}
                  component={routes.PrivacyPolicy.component}
                />

                <AuthWrapper
                  path={routes.Auth.NewIP.path}
                  component={routes.Auth.NewIP.component}
                />
                <Route
                  path={routes.WhitePaper.path}
                  component={routes.WhitePaper.component}
                />
                <Redirect to={routes.Root.path} />
              </Switch>
            </Suspense>
          </div>
          <Footers refAutoScroll={refAutoScroll} />
        </div>
      </StrictMode>
    </>
  );
};

// export default App;
export default React.memo(App);
