import {
  FigureColor,
  ChessFigures
} from '../enums/enums';

export interface IFigure {
  color: FigureColor;
  figure: ChessFigures;
}

export interface IDefeatedFigure extends IFigure {
  coords: [x:number, y:number]
}

export interface IChosenFigure {
  chosenFigure:{
    type: string,
    position: [x:number, y:number]} | null
}

export interface IUserGridState extends IChosenFigure {
  currentMover: FigureColor.BLACK|FigureColor.WHITE,
  gameStats: {from:number[], to:string}[],
  defeatedFigures: {
    [FigureColor.BLACK] :IDefeatedFigure [],
    [FigureColor.WHITE] :IDefeatedFigure []
  },
  grid: (IFigure|0)[][]
}
