import {
  FigureColor,
  ChessFigures
} from '../enums/enums';

export interface IFigure {
  color: FigureColor;
  type: ChessFigures;
}

export interface IDefeatedFigure extends IFigure {
  position: [x:number, y:number];
  time: number;
}

export interface IMoves extends IDefeatedFigure {
  prevPosition: [x:number, y:number]
}

export interface IChosenFigure extends IFigure {
  position: [x:number, y:number];
}

export interface IFigureProps{
  coords:[x:number, y:number],
  name:string,
  color: string
}

export interface ISquareProps {
  coords: [x:number, y:number];
  chessMark: string;
  color: string;
}

export interface IMoveSquareProps {
  coords: [x:number, y:number];
}

export interface IUserGridState{
  time:number,
  chosenFigure: IChosenFigure | null,
  currentMover: FigureColor.BLACK|FigureColor.WHITE,
  gameStats: {from:number[], to:string}[],
  defeatedFigures: {
    [FigureColor.BLACK] :IDefeatedFigure [],
    [FigureColor.WHITE] :IDefeatedFigure []
  },
  moves: {
    [FigureColor.BLACK] :IMoves [],
    [FigureColor.WHITE] :IMoves []
  },
  grid: (IFigure|0)[][]
}
