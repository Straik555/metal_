import { combineReducers } from 'redux';
import selectedTrade from './selectedTrade/reducers';
import { selectedContract } from './selectedContract/reducers';

export default combineReducers({
  selectedTrade,
  selectedContract,
});
