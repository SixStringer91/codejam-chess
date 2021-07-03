import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/reducers/index';
import { MagicNumbers, ChessID } from '../../../enums/enums';
import './game.style.scss';
import Figure from './figure/figure.component';
import { figures } from './figure/figure.data';

const chessMark = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
function Game() {
  // eslint-disable-next-line max-len
  const chosenFigure = useSelector((state:RootState) => state.userGrid.chosenFigure);
  console.log('game');
  const {
    H, K, R, B, Q, P
  } = ChessID;
  const gridScheme = [
    [R, H, B, Q, K, B, H, R],
    [P, P, P, P, P, P, P, P],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0]
  ];

  const figuresOnGridList = gridScheme
    .map((col, y) => col
      .filter((row) => typeof row !== 'number')
      .map((row, x) => (
        <Figure
          coords={[x, y]}
          key={`${row}-${x}-${y}`}
          {...figures[row]}
        />
      )))
    .reduce((a, b) => [...a, ...b]);

  const squareCheck = (square) => {
    if (chosenFigure) {
      const figureCoords = {
        x: chosenFigure.position[0],
        y: chosenFigure.position[1]
      };
      return figures[chosenFigure.type].moveCheck(figureCoords, square);
    }
    return false;
  };

  const chessGreed = (): ReactElement<HTMLDivElement>[] => {
    let isBLack = true;
    const grid: ReactElement<HTMLDivElement>[] = [];
    for (let i = 0; i < MagicNumbers.gridSize; i++) {
      isBLack = !isBLack;
      for (let e = 0; e < MagicNumbers.gridSize; e++) {
        isBLack = !isBLack;
        grid.push(
          <div
            key={`${e}-${i}`}
            data-box={`${chessMark[e]}-${i + 1}`}
            className="chess-square"
            style={{
              backgroundColor: `${
                // eslint-disable-next-line no-nested-ternary
                chosenFigure !== null && squareCheck({ x: e, y: i })
                  ? 'yellow'
                  : isBLack
                    ? 'brown'
                    : ''}`
            }}
          >
            {`${chessMark[e]}-${i + 1}`}
          </div>
        );
      }
    }
    return grid;
  };
  return (
    <>
      <div className="grid">
        {figuresOnGridList}
        {chessGreed()}
      </div>
    </>
  );
}

export default Game;
