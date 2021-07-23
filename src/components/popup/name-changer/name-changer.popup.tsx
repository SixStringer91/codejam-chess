import { useDispatch, useSelector } from 'react-redux';
import { SocketEvents } from '../../../enums/enums';
import { RootState } from '../../../redux/reducers';
import { setPlayerName } from '../../../redux/reducers/network.state';
import { setPlayerInput, setPopup } from '../../../redux/reducers/popup.state';
import ButtonPopup from '../../shared/button-styled/button.styled.component';

const NameChange = () => {
  const inputValue = useSelector(
    (state: RootState) => state.popup.playerNameInput
  );
  const socket = useSelector((state: RootState) => state.websockets.socket);
  const dispatch = useDispatch();
  const nameChangeHandler = () => {
    dispatch(setPlayerName(inputValue));
    if (socket) {
      socket.send(
        JSON.stringify({
          payload: {
            event: SocketEvents.CHANGE_NAME,
            name: inputValue
          }
        })
      );
    }
    dispatch(setPopup({ isOpen: false, mode: null }));
  };

  return (
    <div onClick={(e) => e.stopPropagation()} className="popup-window">
      <div className="input-wrapper">
        <input
          className="name-placeholder"
          value={inputValue}
          type="input-text"
          placeholder="type your name"
          onChange={(e) => {
            e.target.placeholder = '';
            dispatch(setPlayerInput(e.target.value));
          }}
        />
        <ButtonPopup
          styles={{ alignSelf: 'center' }}
          text="Change name"
          cb={nameChangeHandler}
        />
      </div>
    </div>
  );
};

export default NameChange;
