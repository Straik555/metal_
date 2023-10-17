import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { socketSelector } from '../../redux/sockets/selectors';

const SocketTopAssetsPairs = ({ children }) => {
  const dispatch = useDispatch();
  const isSocketOpen = useSelector(socketSelector);

  useEffect(() => {
    if (isSocketOpen) {
      dispatch({ type: 'SOCKET_SEND', payload: [5, `top_assets_pairs`] });
    }
    return () => {
      if (isSocketOpen) {
        dispatch({ type: 'SOCKET_SEND', payload: [6, `top_assets_pairs`] });
      }
    };
  }, [isSocketOpen, dispatch]);

  return <>{children}</>;
};

export default SocketTopAssetsPairs;
