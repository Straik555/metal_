import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { socketTokenSelector } from '../../redux/auth/selectors';
import { socketSelector } from '../../redux/sockets/selectors';

const SocketClosedOrdersMargin = ({ children }) => {
  const dispatch = useDispatch();
  const socketToken = useSelector(socketTokenSelector);
  const isSocketOpen = useSelector(socketSelector);

  useEffect(() => {
    if (isSocketOpen && socketToken) {
      dispatch({ type: 'SOCKET_SEND', payload: [5, `closed_orders:margin`] });
    }
    return () => {
      if (isSocketOpen && socketToken) {
        dispatch({ type: 'SOCKET_SEND', payload: [6, `closed_orders:margin`] });
      }
    };
  }, [isSocketOpen, socketToken, dispatch]);
  return <>{children}</>;
};

export default SocketClosedOrdersMargin;
