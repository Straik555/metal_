import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import routes from '../../../routes';

const AuthWrapper = ({ exact = false, path, component, auth = true }) => {
  return auth ? (
    <Route exact={exact} path={path} component={component} />
  ) : (
    <Redirect to={routes.Root} />
  );
};

export default AuthWrapper;
