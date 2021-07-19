import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/reducers/index';
import './game.style.scss';
import Figure from './figure/figure.component';
import Square from './square/square.component';
import MoveSquare from './move_square/move_square.component';
import { FigureColor, GameModes, PopupMode } from '../../../enums/enums';
import {
  generateFigures,
  generateMoves,
  generateSquares
} from './game_utils/game.utils';
import { setPopup } from '../../../redux/reducers/popup.state';

function Game() {
  const dispatch = useDispatch();
  const {
    chosenFigure, currentMover, grid, winner
  } = useSelector(
    (state: RootState) => state.userGrid
  );

  const { mode, playerColor } = useSelector(
    (state: RootState) => state.websockets
  );

  useEffect(() => {
    if (winner) {
      dispatch(setPopup({ isOpen: true, mode: PopupMode.SHOW_WINNER }));
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
