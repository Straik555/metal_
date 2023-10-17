import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { socketTokenSelector } from '../../redux/auth/selectors';
import { socketSelector } from '../../redux/sockets/selectors';

const SocketOpenOrdersMargin = ({ children }) => {
  const dispatch = useDispatch();
  const socketToken = useSelector(socketTokenSelector);
  const isSocketOpen = useSelector(socketSelector);

  useEffect(() => {
    if (isSocketOpen && socketToken) {
      dispatch({ type: 'SOCKET_SEND', payload: [5, `open_orders:margin`] });
    }
    return () => {
      if (isSocketOpen && socketToken) {
        dispatch({ type: 'SOCKET_SEND', payload: [6, `open_orders:margin`] });
      }
    };
  }, [isSocketOpen, socketToken, dispatch]);
  return <>{children}</>;
};

export default SocketOpenOrdersMargin;
