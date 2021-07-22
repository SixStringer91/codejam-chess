import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/reducers/index';
import './game.style.scss';
import Figure from './figure/figure.component';
import Square from './square/square.component';
import MoveSquare from './move_square/move_square.component';
import {
  FigureColor,
  GameModes,
  PopupMode,
  SocketEvents
} from '../../../enums/enums';
import {
  generateFigures,
  generateMoves,
  generateSquares
} from './game_logic/elements.component-generators';
import { setPopup } from '../../../redux/reducers/popup.state';
import { createReplay } from '../../replay/createReplay';
import { saveReplay } from '../../../redux/reducers/grid.state';

function Game() {
  const dispatch = useDispatch();
  const {
    chosenFigure, currentMover, grid, winner, moves
  } = useSelector(
    (state: RootState) => state.userGrid
  );

  const {
    PLAYER, OPPONENT, mode, playerColor, socket
  } = useSelector(
    (state: RootState) => state.websockets
  );

  useEffect(() => {
    if (winner === playerColor) {
      const replay = createReplay(moves, PLAYER, OPPONENT, playerColor);
      dispatch(saveReplay(replay));
      dispatch(setPopup({ isOpen: true, mode: PopupMode.SHOW_WINNER }));
      socket?.send(
        JSON.stringify({
          payload: {
            event: SocketEvents.GAME_OWER
          }
        })
      );
    }
  }, [winner]);

  const transformRotater = () => {
    if (mode === GameModes.NETWORK_PVP && playerColor === FigureColor.BLACK) {
      return 'rotate(0.5turn)';
    }
    if (mode === GameModes.LOCAL_PVP && currentMover === FigureColor.BLACK) {
      return 'rotate(0.5turn)';
    }
    return '';
  };

  const figuresList = useMemo(() => generateFigures(grid, Figure), [grid]);

  const squaresList = generateSquares(grid, Square);

  const canMoveList = useMemo(
    () => (chosenFigure ? generateMoves(grid, chosenFigure, MoveSquare) : ''),
    [chosenFigure]
  );
  return (
    <div
      className="grid"
      style={{
        transform: transformRotater()
      }}
    >
      {figuresList}
      {squaresList}
      {canMoveList}
    </div>
  );
}

export default Game;
