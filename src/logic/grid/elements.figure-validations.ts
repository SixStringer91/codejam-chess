import { FigureColor } from '../../enums/enums';
import {
  IChosenFigure,
  IValidationProps
} from '../../interfaces/interfaces';
import { squareDir } from '../../utils/square_directions';
import { figures } from './elements.figure-rules';

export const squareCheck = (
  square: { x: number; y: number },
  figure: IChosenFigure
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

export const validationBKRQ = ({ figure, grid }: IValidationProps) => {
  const figureDir = {
    x: figure.position[0],
    y: figure.position[1]
  };
  const coordsArray = [];
  for (let i = 0; i < grid.length; i++) {
    let x = figureDir.x + squareDir[i]!.x;
    let y = figureDir.y + squareDir[i]!.y;
    while (x < 8 && x > -1 && y < grid.length && y > -1) {
      const currentSquare = grid[y]![x];
      if (currentSquare !== 0 && currentSquare!.color === figure.color) {
        break;
      }
      if (squareCheck({ x, y }, figure)) {
        coordsArray.push({ x, y });
      }
      if (currentSquare && currentSquare!.color !== figure.color) {
        break;
      }
      x += squareDir[i]!.x;
      y += squareDir[i]!.y;
    }
  }
  return coordsArray;
};

export const validationHORSE = ({ figure, grid }: IValidationProps) => {
  const coordsArray = [];
  for (let y = 0; y < 8; y++) {
    for (let x = 0; x < 8; x++) {
      const currentSquare = grid[y]![x];
      const check = squareCheck({ x, y }, figure)
        && (!currentSquare || currentSquare.color !== figure.color);
      if (check) {
        coordsArray.push({ x, y });
      }
    }
  }
  return coordsArray;
};

export const validationPAWN = ({ figure, grid }:IValidationProps) => {
  const figureDir = {
    x: figure.position[0],
    y: figure.position[1]
  };
  const coordsArray = [];
  for (let i = 0; i < 8; i++) {
    let x = figureDir.x + squareDir[i]!.x;
    let y = figureDir.y + squareDir[i]!.y;
    while (x < 8 && x >= 0 && y < 8 && y >= 0) {
      const currentSquare = grid[y]![x];
      if (squareCheck({ x, y }, figure) && !currentSquare) {
        const [fx, fy] = figure.position;
        const posWhite = grid[fy - 1]![fx] === 0;
        const posBlack = grid[fy + 1]![fx] === 0;
        if ((figure.color === FigureColor.WHITE && posWhite)
          || (figure.color === FigureColor.BLACK && posBlack)) {
          coordsArray.push({ x, y });
        }
      }
      if (figure.color === FigureColor.WHITE) {
        if (currentSquare !== 0) {
          if (Math.abs(figureDir.x - x) === 1
          && figureDir.y - y === 1
          && currentSquare!.color !== figure.color
          ) {
            coordsArray.push({ x, y });
          }
        }
      }
      if (figure.color === FigureColor.BLACK) {
        if (currentSquare) {
          if (Math.abs(figureDir.x - x) === 1
          && y - figureDir.y === 1
          && currentSquare.color !== figure.color
          ) {
            coordsArray.push({ x, y });
          }
        }
      }
      x += squareDir[i]!.x;
      y += squareDir[i]!.y;
    }
  }
  return coordsArray;
};
