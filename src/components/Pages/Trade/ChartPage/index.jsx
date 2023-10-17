import React, { useEffect } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import queryString from 'query-string';
import { useDispatch } from 'react-redux';
import Chart from '../../../Base/Chart';
import SocketTrades from '../../../HOC/SocketTrades';
import types from '../../../../redux/types';

const ChartPage = () => {
  const dispatch = useDispatch();
  const search = useLocation()?.search;
  const pair = queryString?.parse(search)?.pair;

  useEffect(() => {
    if (pair) {
      dispatch({ type: types.SET_CURRENT_PAIR_START, payload: pair });
    }
  }, [pair, dispatch]);

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <SocketTrades />
      <Chart />
    </div>
  );
};

export default ChartPage;
