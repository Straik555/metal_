/* eslint-disable no-case-declarations */
import { take, fork, call, put, race, select } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import types from '../types';
import { updateBarBySockets } from '../../components/Base/Chart/datafeed/stream';
import {
  toUpdate,
  wsUrl,
  toJoinArray,
  checkIsWSOpen,
} from '../../services/helpers';
import notification from '../../services/notification';

export const socketConnection = socketToken => {
  return new Promise((resolve, reject) => {
    let socket;
    if (socketToken) {
      socket = new WebSocket(`${wsUrl()}/?${socketToken}`, ['wamp']);
    } else {
      socket = new WebSocket(`${wsUrl()}`, ['wamp']);
    }

    socket.onopen = function () {
      resolve(socket);
    };
    socket.onerror = function (event) {
      reject(event);
    };
    socket.onclose = function (event) {
      if (event.wasClean) {
        // console.log('Соединение закрыто чисто');
      } else {
        // console.log('Обрыв соединения'); // например, "убит" процесс сервера
        // May be we need to make a conection here ?
      }
    };
  });
};

export const socketChannel = socket => {
  return eventChannel(emiter => {
    socket.onmessage = ({ data }) => {
      emiter(JSON.parse(data));
    };
    return () => {
      socket.close();
    };
  });
};

function* socketSend(socket) {
  while (true) {
    const { payload } = yield take('SOCKET_SEND');

    if (checkIsWSOpen(socket)) {
      socket.send(JSON.stringify(payload));
    }
  }
}
function* socketClose(socket) {
  while (true) {
    yield take('SOCKET_CLOSED');
    yield put({ type: 'SOCKET_DISCONNECTED' });
    socket.close();
  }
}
function* socketOnmessage(channel) {
  while (true) {
    const data = yield take(channel);
    if (+data[0] === 8) {
      switch (data[1].split(':')[0]) {
        case 'private-notifications':
          notification(data[2].data);
          break;
        case 'assets_pairs':
          const favoritePairs = yield select(
            store => store.assetPairs.favoritePairs,
          );
          const payloadAssetsPairs = yield toJoinArray({
            all: data[2].data,
            favorites: favoritePairs,
          });
          yield put({
            type: types.UPDATE_ASSET_PAIRS,
            payload: payloadAssetsPairs,
          });
          break;
        case 'top_assets_pairs':
          yield put({
            type: types.UPDATE_TOP_ASSETS_PAIRS,
            payload: data[2].data,
          });
          break;
        case 'order_book':
          yield put({
            type: types.UPDATE_SPOT_ORDER_BOOK,
            payload: data[2].data,
          });
          break;
        case 'trades':
          const recentTrades = yield select(
            store => store.trade.spot.recentTrades,
          );
          const newRecentTrades = yield [
            ...data[2].data,
            ...recentTrades,
          ].slice(0, 100);
          yield put({
            type: types.UPDATE_SPOT_RECENT_TRADES,
            payload: newRecentTrades,
          });
          if (data[2].data.length) {
            yield data[2].data.reverse().map(item =>
              updateBarBySockets({
                price: +item.price,
                time: +item.created_at * 1000,
                volume: +item.quantity,
              }),
            );
          }

          break;
        case 'open_orders':
          switch (data[1].split(':')[1]) {
            case 'spot':
              yield put({
                type: types.UPDATE_SPOT_OPEN_ORDERS,
                payload: data[2].data.orders,
              });
              break;
            case 'margin':
              yield put({
                type: types.UPDATE_MARGIN_OPEN_ORDERS,
                payload: data[2].data.orders,
              });
              break;
            default:
              break;
          }
          break;
        case 'closed_orders':
          switch (data[1].split(':')[1]) {
            case 'spot':
              console.dir(data[2]);
              yield put({
                type: types.UPDATE_SPOT_CLOSED_ORDERS,
                payload: { data: data[2].data.orders },
              });
              break;
            case 'margin':
              yield put({
                type: types.UPDATE_MARGIN_CLOSED_ORDERS,
                payload: { data: data[2].data.orders },
              });
              break;
            default:
              break;
          }
          break;
        case 'balances':
          const wallets = yield select(store => store.wallets);
          const payload = toUpdate(data[2].data, wallets);
          yield put({
            type: types.UPDATE_WALLETS,
            payload,
          });
          break;
        default:
          break;
      }
    }
  }
}

export function* watchOnSocket() {
  try {
    while (true) {
      const { socketToken } = yield take('SOCKET_OPEN');
      // console.log('watchOnSocket SOCKET_OPEN', socketToken);
      const socket = yield call(socketConnection, socketToken);
      const channel = yield call(socketChannel, socket);

      if (socket.onopen) {
        yield put({ type: 'SOCKET_CONNECTED' });
      }

      yield fork(socketSend, socket);
      yield fork(socketClose, socket);

      const { cancel } = yield race({
        task: call(socketOnmessage, channel),
        cancel: take('SOCKET_CLOSED'),
      });

      if (cancel) {
        channel.close();
      }
    }
  } catch (error) {
    // console.log('watchOnSocket');
  }
}
