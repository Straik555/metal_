import types from '../types';

const socket = (state = false, { type }) => {
  switch (type) {
    case 'SOCKET_CONNECTED':
      return true;
    // case 'SOCKET_CLOSE':
    case 'SOCKET_DISCONNECTED':
      return false;
    case types.LOGOUT_SUCCESS:
      return false;
    default:
      return state;
  }
};
export default socket;
