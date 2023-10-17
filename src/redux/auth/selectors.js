import { createSelector } from 'reselect';
import { transformData } from '../../services/helpers';

export const userSelector = state => state.user;
export const tokenSelector = state => state.user.token;
export const userAuthBool = createSelector(tokenSelector, token => !!token);

export const dataUserSelector = state => state.user.data;
export const socketTokenSelector = state => state.user.socket_token;
export const memcodeSelector = state => state.user.mem_code;
export const emailSelector = state => state.user.email;
export const usernameSelector = state => state.user.username;
export const hasAntiphishingPhraseSelector = state =>
  state.user.hasAntiphishingPhrase;

export const registerDataSelector = createSelector(
  state => state.user.created_at,
  created_at => transformData(created_at, 'YYYY-MM-DD'),
);
