import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { socketSelector } from '../../redux/sockets/selectors';
import { socketTokenSelector } from '../../redux/auth/selectors';

const SocketOpenOrdersSpot = ({ children }) => {
  const dispatch = useDispatch();
  const socketToken = useSelector(socketTokenSelector);
  const isSocketOpen = useSelector(socketSelector);

  useEffect(() => {
    if (isSocketOpen && socketToken) {
      dispatch({ type: 'SOCKET_SEND', payload: [5, `open_orders:spot`] });
    }
    return () => {
      if (isSocketOpen && socketToken) {
        dispatch({ type: 'SOCKET_SEND', payload: [6, `open_orders:spot`] });
      }
    };
  }, [isSocketOpen, socketToken, dispatch]);
  return <>{children}</>;
};

export default SocketOpenOrdersSpot;
