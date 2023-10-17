import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import L from 'i18n-react';
import routes from '../../../../../routes';
import { languageSelector } from '../../../../../redux/lng/selectors';

const AuthSection = () => {
  const language = useSelector(languageSelector); // need to update language

  return (
    <div className="trade-login">
      <Link to={routes.Auth.Login.path}>{L.translate('Global.do_login')}</Link>{' '}
      {L.translate('Global.or')}{' '}
      <Link to={routes.Auth.Signup.path}>
        {' '}
        {L.translate('Global.do_sign_up')}
      </Link>{' '}
    </div>
  );
};

export default React.memo(AuthSection);
