import React, { ReactElement } from 'react';
import { chessMark, squareDir } from '../../../../utils/square_directions';
import { ChessFigures, FigureColor, GridColor } from '../../../../enums/enums';
import { figures } from '../figure/figure.rules';
import {
  IFigure,
  IChosenFigure,
  IFigureProps,
  ISquareProps,
  IMoveSquareProps
} from '../../../../interfaces/interfaces';

const {
  KING,
  HORSE,
  PAWN,
  ROOK,
  QUEEN,
  BISHOP
} = ChessFigures;

const { BLACK, WHITE } = GridColor;

export const generateFigures = (grid:(IFigure|0)[][],
  Component:React.FC<IFigureProps>) => grid
  .map((col, y) => col
    .map(
      (row, x) => typeof row !== 'number' && (
        <Component
          color={row.color}
          coords={[x, y]}
          key={`${JSON.stringify(row)}-${x}-${y}`}
          name={ChessFigures[row.type]}
        />
      )
    )
    .filter((row) => typeof row !== 'number'))
  .reduce((summ, current) => [...summ, ...current]);

export const generateSquares = (
  grid:(IFigure|0)[][],
  Component:React.FC<ISquareProps>
) => {
  let isBLack = false;
  const gridRender: ReactElement<HTMLDivElement>[] = [];
  for (let y = 0; y < grid.length; y++) {
    isBLack = !isBLack;
    for (let x = 0; x < grid.length; x++) {
      isBLack = !isBLack;
      gridRender.push(
        <Component
          key={`${isBLack ? BLACK : WHITE}${x}-${y}`}
          color={isBLack ? BLACK : WHITE}
          coords={[x, y]}
          chessMark={`${chessMark[x]}-${y}`}
        />
      );
    }
  }
  return gridRender;
};

export const squareCheck = (
  square:{x:number, y:number},
  figure:IChosenFigure
) => {
  if (figure) {
    const figureCoords = {
      x: figure.position[0],
      y: figure.position[1]
    };
    return figures[figure.type]!.moveCheck(figureCoords, square, figure.color);
  }
  return false;
};

export const generateMoves = (
  grid:(IFigure|0)[][],
  figure:IChosenFigure,
  Component:React.FC<IMoveSquareProps>
)
: ReactElement<HTMLDivElement>[] => {
  const squareCoords = [];
  const figureDir = {
    x: figure.position[0],
    y: figure.position[1]
  };
  for (let i = 0; i < grid.length; i++) {
    if (figure.type === BISHOP
      || figure.type === KING
      || figure.type === ROOK
      || figure.type === QUEEN) {
      let x = figureDir.x + squareDir[i]!.x;
      let y = figureDir.y + squareDir[i]!.y;
      while (x < grid.length && x > -1 && y < grid.length && y > -1) {
        const currentSquare = grid[y]![x];
        if (currentSquare !== 0 && currentSquare!.color === figure.color) {
          break;
        }
        if (squareCheck({ x, y }, figure)) {
          squareCoords.push({ x, y });
        }
        if (currentSquare
            && currentSquare!.color !== figure.color) {
          break;
        }
        x += squareDir[i]!.x;
        y += squareDir[i]!.y;
      }
    }
    if (figure.type === HORSE) {
      for (let x = 0; x < 8; x++) {
        const currentSquare = grid[i]![x];
        const check = squareCheck({ x, y: i }, figure)
        && (!currentSquare || currentSquare.color !== figure.color);
        if (check) {
          squareCoords.push({ x, y: i });
        }
      }
    }
    if (figure.type === PAWN) {
      let x = figureDir.x + squareDir[i]!.x;
      let y = figureDir.y + squareDir[i]!.y;
      while (x < grid.length && x >= 0 && y < grid.length && y >= 0) {
        const currentSquare = grid[y]![x];
        if (squareCheck({ x, y }, figure) && !currentSquare) {
          squareCoords.push({ x, y });
        }
        if (figure.color === FigureColor.WHITE) {
          if (currentSquare !== 0) {
            if (Math.abs(figureDir.x - x) === 1
            && figureDir.y - y === 1
            && currentSquare!.color !== figure.color
            ) {
              squareCoords.push({ x, y });
            }
          }
        }
        if (figure.color === FigureColor.BLACK) {
          if (currentSquare) {
            if (Math.abs(figureDir.x - x) === 1
            && y - figureDir.y === 1
            && currentSquare.color !== figure.color
            ) {
              squareCoords.push({ x, y });
            }
          }
        }
        x += squareDir[i]!.x;
        y += squareDir[i]!.y;
      }
    }
  }
  return squareCoords.map((el) => (
    <Component key={`move-${el.x}-${el.y}`} coords={[el.x, el.y]} />));
};
