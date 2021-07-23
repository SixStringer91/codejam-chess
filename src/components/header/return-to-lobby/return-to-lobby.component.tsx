import { useDispatch, useSelector } from 'react-redux';
import { GameModes, SocketEvents } from '../../../enums/enums';
import { RootState } from '../../../redux/reducers';
import { gridReset } from '../../../redux/reducers/grid.state';
import {
  setConnection,
  setPlayerName
} from '../../../redux/reducers/network.state';
import { setPopup } from '../../../redux/reducers/popup.state';
import ButtonPopup from '../../shared/button.styled.component';

function ReturnToLobby() {
  const dispatch = useDispatch();
  const { mode, socket } = useSelector((state: RootState) => state.websockets);
  const returnToLobbyHandler = () => {
    if (mode === GameModes.REPLAY) {
      dispatch(setPlayerName('Player1'));
      dispatch(setPopup({ isOpen: false, mode: null }));
    }
    if (socket) {
      socket.send(
        JSON.stringify({
          payload: {
            event: SocketEvents.CLOSE
          }
        })
      );
    } else {
      dispatch(gridReset());
      dispatch(setConnection(false));
    }
  };
  return (
    <ButtonPopup
      styles={{
        marginRight: '25px'
      }}
      text="To Lobby"
      cb={returnToLobbyHandler}
    />
  );
}

export default ReturnToLobby;
