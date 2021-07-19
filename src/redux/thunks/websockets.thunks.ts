import { Dispatch } from 'react';
import { SocketEvents } from '../../enums/enums';
import { isJSON, WS_URL } from '../../utils/backend_utils';
import { } from '../reducers/grid.state';
import { setConnection } from '../reducers/network.state';
import { websocketMessagesHandler } from './websocket.messages';

export const setWebsocketConnection = (
  dispatch: Dispatch<any>, name: string
) => {
  const wsConnection = new WebSocket(WS_URL);

  wsConnection.addEventListener('open', () => {
    wsConnection.send(JSON.stringify(
      {
        payload: { event: SocketEvents.CHANGE_NAME, name }
      }
    ));
    dispatch(setConnection(wsConnection));
  });
  wsConnection.addEventListener('close', (event) => {
    if (event.wasClean) {
      console.log('Соединение закрыто чисто');
    } else {
      console.log('Обрыв соединения'); // например, "убит" процесс сервера
    }
    console.log(`Код: ${event.code} причина: ${event.reason}`);
    dispatch(setConnection(false));
  });

  wsConnection.addEventListener('error', (event) => {
    console.log(event);
  });

  wsConnection.addEventListener('message', (event) => {
    console.log(event);
    if (isJSON(event.data)) {
      const msg = JSON.parse(event.data);
      websocketMessagesHandler(dispatch, msg);
    }
  });
};
