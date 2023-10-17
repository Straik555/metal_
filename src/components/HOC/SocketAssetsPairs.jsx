import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { socketSelector } from '../../redux/sockets/selectors';

const SocketAssetsPairs = ({ children }) => {
  const dispatch = useDispatch();
  const isSocketOpen = useSelector(socketSelector);

  useEffect(() => {
    if (isSocketOpen) {
      dispatch({ type: 'SOCKET_SEND', payload: [5, `assets_pairs`] });
    }
    return () => {
      if (isSocketOpen) {
        dispatch({ type: 'SOCKET_SEND', payload: [6, `assets_pairs`] });
      }
    };
  }, [isSocketOpen, dispatch]);

  return <>{children}</>;
};

export default SocketAssetsPairs;
