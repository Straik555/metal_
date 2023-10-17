import React from 'react';
import { Link } from 'react-router-dom';
import L from 'i18n-react';
import routes from '../../../../../routes';

const AuthSection = () => (
  <div className="trade-login">
    <Link to={routes.Auth.Login.path}>{L.translate('Global.login')}</Link>{' '}
    {L.translate('Global.or')}{' '}
    <Link to={routes.Auth.Signup.path}> {L.translate('Global.sign_up')}</Link>{' '}
    {L.translate('Global.to_trade')}
  </div>
);

export default React.memo(AuthSection);
