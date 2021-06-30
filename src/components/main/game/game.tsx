import React, { ReactElement } from 'react';
import { MagicNumbers } from '../../../enums/enums';
import './game.style.scss';
import Figure from './figure/figure.component';
import { figuresArray } from './figure/figure.data';

const chessMark = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

function Game() {
  const figuresRenderList = figuresArray.map((el) => <Figure {...el} />);
  const chessGreed = (): ReactElement<HTMLDivElement>[] => {
    let isBLack = true;
    const grid: ReactElement<HTMLDivElement>[] = [];
    for (let i = 0; i < MagicNumbers.gridSize; i++) {
      isBLack = !isBLack;
      for (let e = 0; e < MagicNumbers.gridSize; e++) {
        isBLack = !isBLack;
        grid.push(
          <div
            data-box={`${chessMark[e]}-${i + 1}`}
            className="chess-square"
            style={{ backgroundColor: `${isBLack ? 'brown' : ''}` }}
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
        {figuresRenderList}
        {chessGreed()}
      </div>
    </>
  );
}

export default Game;
