import { combineReducers } from 'redux';
import marketOrder from './marketOrder/reducers';
import limitOrder from './limitOrder/reducers';

export default combineReducers({
  marketOrder,
  limitOrder,
});
