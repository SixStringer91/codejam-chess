import { ChessFigures, FigureColor } from '../../enums/enums';
import {
  IChosenFigure,
  IFigure,
  IFigureProps
} from '../../interfaces/interfaces';
import { generateMoves } from './elements.component-generators';

const { BLACK, WHITE } = FigureColor;

const dangerCoords = (
  grid: (IFigure | 0)[][],
  king: string,
  figures: IFigureProps[],
  color: FigureColor
) => {
  const generated = figures.map((figure) => ({
    position: figure.coords,
    type: figure.name,
    squares: [
      ...generateMoves(grid, {
        position: figure.coords,
        type: figure.name,
        color: color === BLACK
          ? WHITE : BLACK
      } as IChosenFigure)
    ]
  }));
  const danger = [];
  for (let i = 0; i < generated.length; i++) {
    const figureCoord = generated[i]!.position;
    const moveSquares = generated[i]!.squares;
    for (let q = 0; q < moveSquares.length; q++) {
      const currentCoord = JSON.stringify(moveSquares[q]!.coords);
      if (currentCoord === king) {
        danger.push(figureCoord);
      }
    }
  }
  return danger;
};

export const figureController = (
  grid: (IFigure | 0)[][],
  figureProps: IFigureProps[],
  color: FigureColor
) => {
  const black: IFigureProps[] = [];
  let king:string = '';

  figureProps.forEach((figure) => {
    const isKing = figure.color === color
    && figure.name === ChessFigures.KING;
    if (figure.color !== color) {
      black.push(figure);
    }
    if (isKing) {
      king = JSON.stringify([...figure.coords]);
    }
  });
  return dangerCoords(grid, king, black, color);
};
