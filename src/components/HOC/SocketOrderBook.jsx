import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { currentPairSelector } from '../../redux/currentPair/selectors';
import { socketSelector } from '../../redux/sockets/selectors';

const SocketOrderBook = ({ children }) => {
  const dispatch = useDispatch();
  const pair = useSelector(currentPairSelector);
  const isSocketOpen = useSelector(socketSelector);

  useEffect(() => {
    if (isSocketOpen && pair) {
      dispatch({
        type: 'SOCKET_SEND',
        payload: [5, `order_book:${pair}`],
      });
    }

    return () => {
      if (isSocketOpen && pair) {
        dispatch({
          type: 'SOCKET_SEND',
          payload: [6, `order_book:${pair}`],
        });
      }
    };
  }, [isSocketOpen, pair]);

  return <>{children}</>;
};

export default SocketOrderBook;
