import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/reducers/index';
import {
  MagicNumbers,
  ChessIDBlack,
  ChessIDWhite
} from '../../../enums/enums';
import './game.style.scss';
import Figure from './figure/figure.component';
import { figures } from './figure/figure.rules';
import Square from './square/square.component';
import MoveSquare from './move_square/move_square.component';

const chessMark = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
function Game() {
  const { chosenFigure } = useSelector((state: RootState) => state.userGrid);
  const {
  B, H, K, Q, R
  } = ChessIDBlack;
  const {
    b, h, k, q, r
  } = ChessIDWhite;
  const gridScheme = [
    [R, H, B, Q, K, B, H, R],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [r, h, b, q, k, b, h, r]
  ];

  const squareDir = [
    {
      x: -1,
      y: 0
    },
    {
      x: -1,
      y: -1
    },
    {
      x: 0,
      y: -1
    },
    {
      x: 1,
      y: -1
    },
    {
      x: 1,
      y: 0
    },
    {
      x: 1,
      y: 1
    },
    {
      x: 0,
      y: 1
    },
    {
      x: -1,
      y: 1
    }
  ];

  const figuresOnGridList = gridScheme
    .map((col, y) => col
      .map((row, x) => (
        typeof row !== 'number'
        && (
          <Figure
            color={row.color}
            coords={[x, y]}
            key={`${row}-${x}-${y}`}
            {...figures[row.figure]}
          />
        )
      )).filter((row) => typeof row !== 'number'))
    .reduce((summ, current) => [...summ, ...current]);

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
    const grid:ReactElement<HTMLDivElement>[] = [];
    for (let y = 0; y < MagicNumbers.gridSize; y++) {
      isBLack = !isBLack;
      for (let x = 0; x < MagicNumbers.gridSize; x++) {
        isBLack = !isBLack;
        grid.push(
          <Square
            color={isBLack ? 'brown' : ''}
            coords={[x, y]}
            chessMark={`${chessMark[x]}-${y}`}
          />
        );
      }
    }
    return grid;
  };

  const canMoveList = () => {
    const squareCoords = [];
    const figureDir = {
      x: chosenFigure.position[0],
      y: chosenFigure.position[1]
    };
    for (let i = 0; i < 8; i++) {
      if (chosenFigure.type !== 'HORSE') {
        let x = figureDir.x + squareDir[i].x;
        let y = figureDir.y + squareDir[i].y;
        while (x < 8 && x > -1 && y < 8 && y > -1) {
          if (gridScheme[y][x]) {
            break;
          }
          if (squareCheck({ x, y })) {
            squareCoords.push({ x, y });
          }
          x += squareDir[i].x;
          y += squareDir[i].y;
        }
      } else {
        for (let x = 0; x < 8; x++) {
          if (squareCheck({ x, y: i }) && !gridScheme[i][x]) {
            squareCoords.push({ x, y: i });
          }
        }
      }
    }
    return squareCoords.map((el) => <MoveSquare coords={[el.x, el.y]} />);
  };
  return (
    <>
      <div className="grid">
        {figuresOnGridList}
        {chessGreed()}
        {chosenFigure ? canMoveList() : ''}
      </div>
    </>
  );
}

export default Game;
