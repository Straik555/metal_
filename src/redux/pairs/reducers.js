import types from '../types';

const initialState = {
  assetPairs: [],
  topAssetsPairs: [],
  favoritePairs: [],
  topPairs: [],
  marginPairs: [],
  spotPairs: [],
  loading: false,
};
const assetPairs = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_ASSET_PAIRS_START:
    case types.GET_FAVORITE_ASSET_PAIRS_START:
    case types.GET_MARGIN_ASSET_PAIRS_START:
    case types.GET_SPOT_ASSET_PAIRS_START:
    case types.GET_TOP_PAIRS_START:
      return {
        ...state,
        loading: true,
      };

    case types.GET_ASSET_PAIRS_SUCCESS:
      return {
        ...state,
        loading: false,
        assetPairs: action.payload,
      };

    case types.UPDATE_ASSET_PAIRS:
      return {
        ...state,
        assetPairs: action.payload,
        favoritePairs: action.payload.filter(item => item.favorite),
        marginPairs: action.payload,
        spotPairs: action.payload,
      };

    case types.UPDATE_TOP_ASSETS_PAIRS:
      return {
        ...state,
        topAssetsPairs: action.payload,
      };

    case types.GET_FAVORITE_ASSET_PAIRS_SUCCESS:
      return {
        ...state,
        loading: false,
        favoritePairs: action.payload,
      };

    case types.UPDATE_FAVORITE_ASSET_PAIR_SUCCESS:
      return {
        ...state,
        loading: false,
        assetPairs: action.payload, // Temp
        favoritePairs: action.payload.filter(item => item.favorite),
        marginPairs: action.payload,
        spotPairs: action.payload,
      };
    case types.GET_MARGIN_ASSET_PAIRS_SUCCESS:
      return {
        ...state,
        loading: false,
        marginPairs: action.payload,
      };

    case types.GET_SPOT_ASSET_PAIRS_SUCCESS:
      return {
        ...state,
        loading: false,
        assetPairs: action.payload, // Temp
        favoritePairs: action.payload.filter(item => item.favorite), // Temp
        spotPairs: action.payload,
      };
    case types.GET_TOP_PAIRS_SUCCESS:
      return {
        ...state,
        topPairs: action.payload,
      };
    case types.GET_ASSET_PAIRS_FAILURE:
    case types.GET_FAVORITE_ASSET_PAIRS_FAILURE:
    case types.GET_TOP_PAIRS_FAILURE:
    case types.GET_MARGIN_ASSET_PAIRS_FAILURE:
    case types.GET_SPOT_ASSET_PAIRS_FAILURE:
      return {
        ...state,
        loading: false,
      };
    case types.LOGOUT_SUCCESS:
      return initialState;
    default:
      return state;
  }
};

export default assetPairs;
