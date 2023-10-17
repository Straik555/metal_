import types from '../types';

const initialState = {
  currentAssetFees: {},
  allFees: [],
};

const fees = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.GET_ASSET_FEES_SUCCESS:
      return {
        ...state,
        currentAssetFees: payload,
      };
    case types.GET_ALL_FEES_SUCCESS:
      return {
        ...state,
        allFees: payload,
      };
    default:
      return state;
  }
};
export default fees;
