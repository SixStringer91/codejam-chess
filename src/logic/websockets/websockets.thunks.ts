import { Dispatch } from 'redux';
import { SocketEvents } from '../../enums/enums';
import { isJSON, WS_URL } from '../../utils/usefull_utils';
import { gridReset } from '../../redux/reducers/grid.state';
import { setConnection } from '../../redux/reducers/network.state';
import { websocketMessagesHandler } from './websocket.messages';

export const setWebsocketConnection = (
  dispatch: Dispatch, name: string
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
      console.log('Обрыв соединения');
    }
    console.log(`Код: ${event.code} причина: ${event.reason}`);
    dispatch(setConnection(false));
    dispatch(gridReset());
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
