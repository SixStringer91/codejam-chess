import { useDispatch, useSelector } from 'react-redux';
import { SocketEvents } from '../../../enums/enums';
import { RootState } from '../../../redux/reducers';
import { gridReset, saveReplay } from '../../../redux/reducers/grid.state';
import { setConnection } from '../../../redux/reducers/network.state';
import { setPopup } from '../../../redux/reducers/popup.state';
import { createReplay } from '../../replay/createReplay';

const WinnerViewer = () => {
  const dispatch = useDispatch();
  const { winner, moves } = useSelector((state: RootState) => state.userGrid);
  const {
    playerColor, socket, PLAYER, OPPONENT
  } = useSelector(
    (state: RootState) => state.websockets
  );
  return (
    <div className="popup-window">
      <div>
        {winner === playerColor
          ? 'You win!! Congrats!'
          : 'You lose, ahahaha!'}
      </div>
      <button
        type="button"
        onClick={() => {
          const replay = createReplay(moves, PLAYER, OPPONENT, playerColor);
          dispatch(saveReplay(replay));
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
