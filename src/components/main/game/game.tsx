import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/reducers/index';
import './game.style.scss';
import Figure from './figure/figure.component';
import Square from './square/square.component';
import MoveSquare from './move_square/move_square.component';
import { FigureColor } from '../../../enums/enums';
import {
  generateFigures,
  generateMoves,
  generateSquares
} from './game_utils/game.utils';

function Game() {
  const { chosenFigure, currentMover, grid } = useSelector(
    (state: RootState) => state.userGrid
  );

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
        transform: currentMover === FigureColor.BLACK ? 'rotate(0.5turn)' : ''
      }}
    >
      {figuresList}
      {squaresList}
      {canMoveList}
    </div>
  );
}

export default Game;
