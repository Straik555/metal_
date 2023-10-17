import types from '../types';

const initialState = {
  topics: [],
  loader: false,
};

const topics = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.GET_TOPICS_START:
      return { ...state, loader: true };
    case types.GET_TOPICS_SUCCESS:
      return { loader: false, topics: payload };
    case types.GET_TOPICS_FAILURE:
      return { ...state, loader: false };
    case types.LOGOUT_SUCCESS:
      return initialState;
    default:
      return state;
  }
};

export default topics;
