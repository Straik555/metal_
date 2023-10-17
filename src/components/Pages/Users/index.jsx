import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Switch, NavLink, Route, Redirect } from 'react-router-dom';
import AuthWrapper from '../../Base/AuthWrapper';
import routes from '../../../routes';
import types from '../../../redux/types';
import NavUser from './NavUser';

const Users = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: types.GET_USER_DATA_START,
    });
  }, [dispatch]);

  return (
    <section className="account-section">
      <div className="account-block">
        <NavUser />
        <Switch>
          <AuthWrapper
            path={routes.User.Dashboard.path}
            component={routes.User.Dashboard.component}
          />
          <AuthWrapper
            path={routes.User.Security.path}
            component={routes.User.Security.component}
          />
          <AuthWrapper
            path={routes.User.Identification.path}
            component={routes.User.Identification.component}
          />
          <AuthWrapper
            path={routes.User.ApiManagement.path}
            component={routes.User.ApiManagement.component}
          />
          <Redirect from={routes.User.path} to={routes.User.Dashboard.path} />
        </Switch>
      </div>
    </section>
  );
};

export default Users;
