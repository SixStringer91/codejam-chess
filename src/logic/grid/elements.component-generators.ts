import { chessMark } from '../../utils/square_directions';
import { ChessFigures, GridColor } from '../../enums/enums';
import {
  IFigure,
  IChosenFigure
} from '../../interfaces/interfaces';
import {
  validationBKRQ,
  validationHORSE,
  validationPAWN
} from './elements.figure-validations';
import { Coords } from '../../interfaces/types';

const {
  KING, HORSE, PAWN, ROOK, QUEEN, BISHOP
} = ChessFigures;

const { BLACK, WHITE } = GridColor;

export const generateFigures = (
  grid: (IFigure | 0)[][]
) => grid
  .map((col, y) => col
    .map(
      (row, x) => typeof row !== 'number' && {
        color: row.color,
        coords: [x, y] as Coords,
        key: `${JSON.stringify(row)}-${x}-${y}`,
        name: ChessFigures[row.type]
      }
    ))
  .reduce((summ, current) => [...summ, ...current])
  .filter((row) => typeof row !== 'boolean');

export const generateSquares = (grid: (IFigure | 0)[][]) => {
  let isBLack = false;
  const gridRender: {
    key:string, color: GridColor, coords: Coords, chessMark:string }[] = [];
  for (let y = 0; y < grid.length; y++) {
    isBLack = !isBLack;
    for (let x = 0; x < grid.length; x++) {
      isBLack = !isBLack;
      gridRender.push({
        key: `${isBLack ? BLACK : WHITE}${x}-${y}`,
        color: isBLack ? BLACK : WHITE,
        coords: [x, y] as Coords,
        chessMark: `${chessMark[x]}-${y}`
      });
    }
  }
  return gridRender;
};

export const generateMoves = (
  grid: (IFigure | 0)[][],
  figure: IChosenFigure
): { key: string; coords: Coords }[] => {
  let squareCoords: { x: number; y: number }[] = [];
  if (
    figure.type === BISHOP
    || figure.type === KING
    || figure.type === ROOK
    || figure.type === QUEEN
  ) {
    squareCoords = squareCoords.concat(validationBKRQ({ figure, grid }));
  }
  if (figure.type === HORSE) {
    squareCoords = squareCoords.concat(validationHORSE({ figure, grid }));
  }
  if (figure.type === PAWN) {
    squareCoords = squareCoords.concat(validationPAWN({ figure, grid }));
  }
  return squareCoords.map((el) => ({
    key: `move-${el.x}-${el.y}`,
    coords: [el.x, el.y] as Coords
  }));
};
