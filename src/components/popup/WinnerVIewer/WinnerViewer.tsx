import { useDispatch, useSelector } from 'react-redux';
import { SocketEvents } from '../../../enums/enums';
import { RootState } from '../../../redux/reducers';
import { setPopup } from '../../../redux/reducers/popup.state';

const WinnerViewer = () => {
  const dispatch = useDispatch();
  const isWinner = useSelector((state: RootState) => state.userGrid.winner);
  const { playerColor, socket } = useSelector(
    (state: RootState) => state.websockets
  );
  return (
    <div className="popup-window">
      <div>
        {isWinner === playerColor
          ? 'You win!! Congrats!'
          : 'You lose, ahahaha!'}
      </div>
      <button
        type="button"
        onClick={() => {
          dispatch(setPopup({ isOpen: false, mode: null }));
          if (socket) {
            socket.send(
              JSON.stringify({
                payload: {
                  event: SocketEvents.CLOSE
                }
              })
            );
          }
        }}
        className="change-btn"
      >
        End party
      </button>
    </div>
  );
};

export default WinnerViewer;
