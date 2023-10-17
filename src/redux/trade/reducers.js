import { combineReducers } from 'redux';
import spot from './spot/reducers';
import margin from './margin/reducers';
import calculate from './calculate/reducer';

export default combineReducers({
  spot,
  margin,
  calculate,
});
