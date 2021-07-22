import { useDispatch, useSelector } from 'react-redux';
import { SocketEvents } from '../../../enums/enums';
import { RootState } from '../../../redux/reducers';
import { gridReset } from '../../../redux/reducers/grid.state';
import { setConnection } from '../../../redux/reducers/network.state';
import { setPopup } from '../../../redux/reducers/popup.state';

const WinnerViewer = () => {
  const dispatch = useDispatch();
  const { winner } = useSelector((state: RootState) => state.userGrid);
  const {
    playerColor, socket
  } = useSelector(
    (state: RootState) => state.websockets
  );
  return (
    <div className="popup-window">
      <div>
        {winner === playerColor
          ? 'You win!! Congrats!'
          : 'You lose, hahaha!'}
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
          } else {
            dispatch(gridReset());
            dispatch(setConnection(false));
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