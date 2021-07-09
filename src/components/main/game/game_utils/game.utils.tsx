import React, { ReactElement } from 'react';
import { chessMark, squareDir } from '../../../../utils/square_directions';
import { ChessFigures, FigureColor } from '../../../../enums/enums';
import { figures } from '../figure/figure.rules';

const {
  KING,
  HORSE,
  PAWN,
  ROOK,
  QUEEN,
  BISHOP
} = ChessFigures;

export const generateFigures = (grid, Component)
: ReactElement<HTMLDivElement>[] => grid
  .map((col, y) => col
    .map(
      (row, x) => typeof row !== 'number' && (
        <Component
          color={row.color}
          coords={[x, y]}
          key={`${JSON.stringify(row)}-${x}-${y}`}
          {...figures[row.figure]}
        />
      )
    )
    .filter((row) => typeof row !== 'number'))
  .reduce((summ, current) => [...summ, ...current]);

export const generateSquares = (grid, Component)
: ReactElement<HTMLDivElement>[] => {
  let isBLack = true;
  const gridRender: ReactElement<HTMLDivElement>[] = [];
  for (let y = 0; y < grid.length; y++) {
    isBLack = !isBLack;
    for (let x = 0; x < grid.length; x++) {
      isBLack = !isBLack;
      gridRender.push(
        <Component
          key={`${isBLack ? 'black' : 'white'}${x}-${y}`}
          color={isBLack ? '#032B43' : ''}
          coords={[x, y]}
          chessMark={`${chessMark[x]}-${y}`}
        />
      );
    }
  }
  return gridRender;
};

export const squareCheck = (square, figure, color?) => {
  if (figure) {
    const figureCoords = {
      x: figure.position[0],
      y: figure.position[1]
    };
    return figures[figure.type].moveCheck(figureCoords, square, color);
  }
  return false;
};

export const generateMoves = (grid, figure, Component)
: ReactElement<HTMLDivElement>[] => {
  const squareCoords = [];
  const figureDir = {
    x: figure.position[0],
    y: figure.position[1]
  };
  for (let i = 0; i < grid.length; i++) {
    if (figure.type === BISHOP || KING || ROOK || QUEEN) {
      let x = figureDir.x + squareDir[i].x;
      let y = figureDir.y + squareDir[i].y;
      while (x < grid.length && x > -1 && y < grid.length && y > -1) {
        if (grid[y][x].color === figure.color) {
          break;
        }
        if (squareCheck({ x, y }, figure)) {
          squareCoords.push({ x, y });
        }
        if (grid[y][x]
            && grid[y][x].color !== figure.color) {
          break;
        }
        x += squareDir[i].x;
        y += squareDir[i].y;
      }
    }
    if (figure.type === HORSE) {
      for (let x = 0; x < 8; x++) {
        const check = squareCheck({ x, y: i }, figure)
        && (!grid[i][x] || grid[i][x].color !== figure.color);
        if (check) {
          squareCoords.push({ x, y: i });
        }
      }
    }
    if (figure.type === PAWN) {
      let x = figureDir.x + squareDir[i].x;
      let y = figureDir.y + squareDir[i].y;
      while (x < grid.length && x > -1 && y < grid.length && y > -1) {
        if (squareCheck({ x, y }, figure, figure.color) && !grid[y][x]) {
          squareCoords.push({ x, y });
        }
        if (figure.color === FigureColor.WHITE) {
          if (grid[y][x] !== 0) {
            if (Math.abs(figureDir.x - x) === 1
            && figureDir.y - y === 1
            && grid[y][x].color !== figure.color
            ) {
              squareCoords.push({ x, y });
            }
          }
        }
        if (figure.color === FigureColor.BLACK) {
          if (grid[y][x]) {
            if (Math.abs(figureDir.x - x) === 1
            && y - figureDir.y === 1
            && grid[y][x].color !== figure.color
            ) {
              squareCoords.push({ x, y });
            }
          }
        }
        x += squareDir[i].x;
        y += squareDir[i].y;
      }
    }
  }
  return squareCoords.map((el) => (
    <Component key={`move-${el.x}-${el.y}`} coords={[el.x, el.y]} />));
};
