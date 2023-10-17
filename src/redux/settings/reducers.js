import { combineReducers } from 'redux';
import apiManagement from './apiManagement/reducer';
import dashboard from './dashboard/reduser';
import security from './security/reducer';
import files from './identification/reducer';
import types from '../types';

const init = {
  email: '',
  documents: [],
  data: {
    first_name: '',
    last_name: '',
    phone: '',
    dob: '',
    country: '',
    state: '',
    city: '',
    street: '',
    post_code: '',
    can_withdraw: false,
  },
};

const user = (state = init, { type, payload }) => {
  switch (type) {
    // user information
    case types.GET_USER_DATA_START:
    case types.GET_USER_DATA_FAILURE:
      return init;

    case types.GET_USER_DATA_SUCCESS:
      return { ...state, ...payload };

    // update user personal date
    case types.UPDATE_USER_DATA_SUCCESS:
      return { ...state, data: payload };
    case types.LOGOUT_SUCCESS:
      return init;
    default:
      return state;
  }
};

export default combineReducers({
  user,
  dashboard,
  apiManagement,
  security,
  files,
});
