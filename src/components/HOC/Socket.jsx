import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { socketSelector } from '../../redux/sockets/selectors';
import { currentPairSelector } from '../../redux/currentPair/selectors';

const SocketClosedOrdersSpot = ({ children }) => {
  const dispatch = useDispatch();
  const currentPair = useSelector(currentPairSelector);
  const isSocketOpen = useSelector(socketSelector);
  useEffect(() => {
    if (isSocketOpen && currentPair) {
      dispatch({
        type: 'SOCKET_SEND',
        payload: [5, `closed_orders:spot`],
      });
    }
    return () => {
      if (isSocketOpen && currentPair) {
        dispatch({
          type: 'SOCKET_SEND',
          payload: [6, `closed_orders:spot`],
        });
      }
    };
  }, [isSocketOpen, currentPair]);

  return <>{children}</>;
};

export default SocketClosedOrdersSpot;
