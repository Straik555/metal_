import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import Indicator from './Indicator';
import types from '../../../../../../redux/types';
import routes from '../../../../../../routes';
import {
  balanceMarginSelector,
  lowRiskMarginSelector,
} from '../../../../../../redux/trade/margin/selectors';
import { tokenSelector } from '../../../../../../redux/auth/selectors';

const LowRiskIndicator = () => {
  const dispatch = useDispatch();
  const token = useSelector(tokenSelector);
  const isLogin = token && Axios.defaults.headers.common.Authorization;
  const lowRisk = useSelector(lowRiskMarginSelector);
  const balance = useSelector(balanceMarginSelector);

  useEffect(() => {
    if (isLogin) {
      dispatch({ type: types.MARGIN_GET_LOW_RISK_START });
      dispatch({ type: types.MARGIN_GET_BALANCE_START });
    }
  }, [isLogin]);

  return (
    <div className="margin-indicator">
      <div className="margin-header">
        <p className="margin-header__title">Margin Ratio</p>
        <ul className="trade-drop">
          <li>
            <a href="#">
              Cross
              <span className="drop-arrow">
                <i className="fa fa-angle-down" />
              </span>
            </a>
            <ul className="trade-drop__list">
              <li>
                <button type="button">Test</button>
              </li>
              <li>
                <button type="button">Test</button>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <div className="margin-indicator__body">
        {isLogin ? (
          <div className="row">
            <div className="col-6">
              <p className="margin-name">Margin Ratio</p>
              <p className="ratio-val">{lowRisk.low_risk}%</p>
            </div>
            <div className="col-6">
              <div className="margin-slider">
                <div className="margin-slider__line">
                  <Indicator value={lowRisk.low_risk} />
                </div>
              </div>
            </div>
            <div className="col-12">
              <div className="margin-info">
                <p className="margin-name">Maintenance Margin</p>
                <p className="margin-val">0.00 USDT</p>
              </div>
              <div className="margin-info">
                <p className="margin-name">Margin Balance</p>
                <p className="margin-val">0.00 USDT</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="bottom-part__table">
            <div className="trade-login">
              <Link to={routes.Auth.Login.path}>Login</Link>
              {' or '}
              <Link to={routes.Auth.Signup.path}>Sign up</Link>
              {' to trade'}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default LowRiskIndicator;
