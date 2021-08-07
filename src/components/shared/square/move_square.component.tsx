import { useDispatch, useSelector } from 'react-redux';
import { GameModes, GridProps, SocketEvents } from '../../../enums/enums';
import { IMoveSquareProps } from '../../../interfaces/interfaces';
import { RootState } from '../../../redux/reducers';
import { figureMove } from '../../../redux/reducers/grid.state';

function MoveSquare(props: IMoveSquareProps) {
  const dispatch = useDispatch();
  const chosenFigure = useSelector(
    (state: RootState) => state.userGrid.chosenFigure
  );
  const { socket, mode } = useSelector((state: RootState) => state.websockets);
  const { coords } = props;
  const setPosition = (
    coord: number
  ) => `${(GridProps.SQUARE_SIZE) * coord}px`;

  const setDirection = () => {
    if (mode !== GameModes.REPLAY) {
      if (socket) {
        socket.send(
          JSON.stringify({
            payload: {
              event: SocketEvents.MOVE,
              params: { chosenFigure, dir: coords }
            }
          })
        );
      }
      dispatch(figureMove(coords));
    }
  };

  return (
    <>
      <div
        key={`can_move-${coords[0]}-${coords[1]}`}
        onClick={setDirection}
        className="can_move"
        style={{
          left: setPosition(coords[0]),
          top: setPosition(coords[1])
        }}
      />
    </>
  );
}

export default MoveSquare;
