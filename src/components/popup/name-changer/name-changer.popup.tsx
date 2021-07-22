import { useDispatch, useSelector } from 'react-redux';
import { SocketEvents } from '../../../enums/enums';
import { RootState } from '../../../redux/reducers';
import { setPlayerName } from '../../../redux/reducers/network.state';
import { setPlayerInput, setPopup } from '../../../redux/reducers/popup.state';

const NameChange = () => {
  const inputValue = useSelector(
    (state: RootState) => state.popup.playerNameInput
  );
  const socket = useSelector(
    (state: RootState) => state.websockets.socket
  );
  const dispatch = useDispatch();
  return (
    <div onClick={(e) => e.stopPropagation()} className="popup-window">
      <input
        className="name-placeholder"
        value={inputValue}
        type="text"
        onChange={(e) => {
          dispatch(setPlayerInput(e.target.value));
        }}
      />
      <div>player 1</div>
      <button
        type="button"
        className="change-btn"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          dispatch(setPlayerName(inputValue));
          if (socket) {
            socket
              .send(JSON.stringify({
                payload: {
                  event: SocketEvents.CHANGE_NAME,
                  name: inputValue
                }
              }));
          }
          dispatch(setPopup({ isOpen: false, mode: null }));
        }}
      >
        Change name
      </button>
    </div>
  );
};

export default NameChange;
