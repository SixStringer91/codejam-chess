import { FigureColor, GridProps } from '../../enums/enums';
import { IChosenFigure, IValidationProps } from '../../interfaces/interfaces';
import { squareDir } from '../../utils/square_directions';
import { figures } from './elements.figure-rules';

const { GRID_LENGTH } = GridProps;
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
  for (let i = 0; i < GRID_LENGTH; i++) {
    let x = figureDir.x + squareDir[i]!.x;
    let y = figureDir.y + squareDir[i]!.y;
    while (x < GRID_LENGTH && x > -1 && y < GRID_LENGTH && y > -1) {
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
  for (let y = 0; y < GRID_LENGTH; y++) {
    for (let x = 0; x < GRID_LENGTH; x++) {
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

export const validationPAWN = ({ figure, grid }: IValidationProps) => {
  const figureDir = {
    x: figure.position[0],
    y: figure.position[1]
  };
  const coordsArray = [];
  for (let i = 0; i < 8; i++) {
    let x = figureDir.x + squareDir[i]!.x;
    let y = figureDir.y + squareDir[i]!.y;
    while (x < GRID_LENGTH && x >= 0 && y < GRID_LENGTH && y >= 0) {
      const currentSquare = grid[y]![x];
      if (squareCheck({ x, y }, figure) && !currentSquare) {
        const [fx, fy] = figure.position;
        const posWhite = grid[fy - 1]![fx] === 0;
        const posBlack = grid[fy + 1]![fx] === 0;
        if (
          (figure.color === FigureColor.WHITE && posWhite)
          || (figure.color === FigureColor.BLACK && posBlack)
        ) { coordsArray.push({ x, y }); }
      }
      if (currentSquare) {
        if (Math.abs(figureDir.x - x) === 1
            && (
              figure.color === FigureColor.WHITE
                ? figureDir.y - y === 1
                : y - figureDir.y === 1)
            && currentSquare.color !== figure.color
        ) { coordsArray.push({ x, y }); }
      }
      x += squareDir[i]!.x;
      y += squareDir[i]!.y;
    }
  }
  return coordsArray;
};
