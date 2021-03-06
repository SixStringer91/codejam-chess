import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { RootState } from '../../../redux/reducers';
import {
  setWebsocketConnection
} from '../../../logic/websockets/websockets.thunks';
import './menu.style.scss';
import {
  GameModes,
  Members,
  PopupMode,
  SocketEvents
} from '../../../enums/enums';
import {
  setReadyState,
  setGameMode,
  setGameCycle,
  setConnection
} from '../../../redux/reducers/network.state';
import { setPopup } from '../../../redux/reducers/popup.state';
import img from '../../../assets/rings.svg';
import { getReplays } from '../../../redux/reducers/replays.state';

function Menu() {
  const { LOCAL_PVP, NETWORK_PVP } = GameModes;
  const dispatch = useDispatch();
  const mode = useSelector((state: RootState) => state.websockets.mode);
  const playerName = useSelector(
    (state: RootState) => state.websockets[Members.PLAYER]
  );
  const socket = useSelector((state: RootState) => state.websockets.socket);
  const connected = useSelector(
    (state: RootState) => state.websockets.connected
  );
  const opponent = useSelector(
    (state: RootState) => state.websockets.opponentConnected
  );
  const readyState = useSelector(
    (state: RootState) => state.websockets.readyState
  );

  const setStartGame = (): void => {
    switch (mode) {
      case NETWORK_PVP:
        if (connected && opponent) {
          dispatch(setGameCycle());
        } else {
          dispatch(setReadyState('WAIT'));
          socket?.send(
            JSON.stringify({ payload: { event: SocketEvents.START } })
          );
        }
        break;
      case LOCAL_PVP:
        dispatch(setGameCycle());
        break;
      default:
        break;
    }
  };
  const viewReplays = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    e.preventDefault();
    dispatch(setPopup({ isOpen: true, mode: PopupMode.REPLAYS }));
    dispatch(getReplays());
  };

  const isOnlineBtnColor = ({
    gameMode,
    conn
  }: {
    gameMode: GameModes;
    conn: boolean;
  }) => {
    if (gameMode === NETWORK_PVP && conn) {
      return '';
    }
    if (gameMode === NETWORK_PVP && !conn) {
      return 'grey';
    }
    return '#C38D9D';
  };

  const setOnline: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (mode === NETWORK_PVP || socket) {
      socket?.close(1000, '???????????? ??????????????????');
      dispatch(setGameMode(LOCAL_PVP));
      dispatch(setConnection(false));
    } else {
      setWebsocketConnection(dispatch, playerName);
      dispatch(setGameMode(NETWORK_PVP));
    }
  };

  return (
    <div className="menu">
      <NavLink
        to="/game"
        onClick={setStartGame}
        className="menu-btn"
        style={{
          backgroundColor:
            readyState && mode === NETWORK_PVP && connected ? 'grey' : ''
        }}
      >
        <button
          type="button"
          onClick={setOnline}
          className="button-online"
          style={{
            backgroundColor: isOnlineBtnColor({
              gameMode: mode,
              conn: connected
            })
          }}
        >
          {mode === NETWORK_PVP ? 'online' : 'offline'}
        </button>
        {readyState && mode === NETWORK_PVP && connected ? (
          <img
            style={{
              width: '80%',
              height: '80%'
            }}
            src={img}
            alt="rings"
          />
        ) : (
          'Start'
        )}
        <button onClick={viewReplays} type="button" className="button-replays">
          view replays
        </button>
      </NavLink>
    </div>
  );
}

export default Menu;
