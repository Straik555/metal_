import axios from 'axios';
import { store } from '../redux/store';
import types from '../redux/types';
import routes from '../routes';

const err = {
  err: true,
  interval: null,
  req: { endSession: null, lastActive: new Date().getTime() },
};

const toMs = time => +time * 60 * 1000;

export const intervalReguest = (
  timeout1 = 30,
  timeout2 = 10,
  timeout3 = timeout2 * 0.9,
) => {
  if (err.interval || !axios.defaults.headers.common.Authorization) {
    clearInterval(err.interval);
  }
  err.interval = setInterval(() => {
    if (
      err.req.endSession - toMs(timeout1) < err.req.lastActive &&
      new Date().getTime() - toMs(timeout3) < err.req.lastActive
    ) {
      store.dispatch({ type: types.GET_REFRESH_TOKEN_START });
    }
  }, toMs(timeout2));
};

export const axiosInterceptors = ({ history, dispatch }) => {
  axios.interceptors.request.use(
    config => {
      err.req.lastActive = new Date().getTime();
      return config;
    },
    error => Promise.reject(error),
  );

  axios.interceptors.response.use(
    response => {
      if (response.config.url === '/api/login') {
        const bearerToken = response.data.token;
        err.req.endSession = response.data.token_expired_at * 1000;
        if (bearerToken) {
          axios.defaults.headers.common.Authorization = `Bearer ${bearerToken}`;
        }
        history.replace(routes.Root.path);
      }
      if (response.config.url === '/api/user') {
        err.req.endSession = response.data.token_expired_at;
      }
      if (response.config.url === '/api/token/refresh') {
        const bearerToken = response.data.token;
        const endSession = response.data.token_expired_at * 1000;
        if (bearerToken && endSession) {
          axios.defaults.headers.common.Authorization = `Bearer ${bearerToken}`;
        }
      }
      return response;
    },

    error => {
      if (error.response && error.response.status === 401) {
        // OLD LOGIC //
        const logout =
          history.location.pathname === routes.Auth.ResetPassword.path;
        if (err.err && !logout) {
          err.err = false;
          delete axios.defaults.headers.common.Authorization;
          dispatch({
            type: types.LOGOUT_START,
            payload: { type: 'front', history },
          });
          setTimeout(() => {
            err.err = true;
          }, 8000);
        }

        // NEW LOGIC //
        // if (err.err) {
        //   store.dispatch({ type: types.GET_REFRESH_TOKEN_START });
        // }
      }
      return Promise.reject(error);
    },
  );
};
