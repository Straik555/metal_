import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { socketSelector } from '../../redux/sockets/selectors';
import { currentPairSelector } from '../../redux/currentPair/selectors';

const SocketTrades = ({ children }) => {
  const dispatch = useDispatch();
  const isSocketOpen = useSelector(socketSelector);
  const pair = useSelector(currentPairSelector);

  useEffect(() => {
    if (isSocketOpen) {
      if (pair) {
        dispatch({
          type: 'SOCKET_SEND',
          payload: [5, `trades:${pair}`],
        });
      }
    }
    return () => {
      if (isSocketOpen) {
        if (pair) {
          dispatch({
            type: 'SOCKET_SEND',
            payload: [6, `trades:${pair}`],
          });
        }
      }
    };
  }, [isSocketOpen, pair]);

  return <>{children}</>;
};

export default SocketTrades;
