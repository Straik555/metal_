import { combineReducers } from 'redux';
import types from '../../types';

const loading = (state = null, { type, payload }) => {
  switch (type) {
    case types.DELETE_DOCUMENTS_START:
    case types.UPDATE_DOCUMENTS_START:
      return payload.document_id;

    case types.DELETE_DOCUMENTS_FAILURE:
    case types.UPDATE_DOCUMENTS_FAILURE:
    case types.UPDATE_DOCUMENTS_SUCCESS:
    case types.DELETE_DOCUMENTS_SUCCESS:
      return null;
    case types.LOGOUT_SUCCESS:
      return null;
    default:
      return state;
  }
};

const data = (state = [], { type, payload }) => {
  switch (type) {
    case types.DELETE_DOCUMENTS_SUCCESS:
      return state.map(document =>
        document.id === payload.document_id
          ? { ...document, files: [] } // put empty array
          : document,
      );

    case types.UPDATE_DOCUMENTS_SUCCESS: // update file properties in redux state
      return state.map(document =>
        document.id === payload.document_id
          ? { ...document, files: [payload] } // put uploaded file
          : document,
      );

    case types.GET_USER_DATA_SUCCESS:
      return payload.documents;
    case types.LOGOUT_SUCCESS:
      return [];
    default:
      return state;
  }
};

export default combineReducers({ loading, data });
