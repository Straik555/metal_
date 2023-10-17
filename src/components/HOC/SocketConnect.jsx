import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { socketTokenSelector } from '../../redux/auth/selectors';

const SocketConnect = ({ children }) => {
  const dispatch = useDispatch();
  const socketToken = useSelector(socketTokenSelector);

  useEffect(() => {
    if (socketToken) {
      dispatch({ type: 'SOCKET_OPEN', socketToken });
    } else {
      dispatch({ type: 'SOCKET_OPEN', socketToken: null });
    }

    return () => {
      dispatch({ type: 'SOCKET_CLOSED' });
    };
  }, [socketToken]);
  return <>{children}</>;
};

export default SocketConnect;
