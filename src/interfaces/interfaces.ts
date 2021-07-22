import { Coords } from './types';
import {
  GameModes,
  FigureColor,
  ChessFigures,
  PopupMode,
  Members
} from '../enums/enums';
import { ReplaysMove } from '../components/replay/move.model';

export interface IFigure {
  color: FigureColor;
  type: ChessFigures;
}

export interface IDefeatedFigure extends IFigure {
  position: Coords;
  time: number;
}

export interface IMoves extends IDefeatedFigure {
  prevPosition: Coords
}

export interface IChosenFigure extends IFigure {
  position: Coords;
}

export interface IFigureProps{
  coords:Coords,
  name:string,
  color: string
}

export interface ISquareProps {
  coords: Coords;
  chessMark: string;
  color: string;
}

export interface IMoveSquareProps {
  coords: Coords;
}

export interface IMove {
  [FigureColor.BLACK] :IMoves [],
  [FigureColor.WHITE] :IMoves []
}

export interface IUserGridState{
  winner: FigureColor | null,
  time:number,
  chosenFigure: IChosenFigure | null,
  currentMover: FigureColor.BLACK|FigureColor.WHITE,
  gameStats: {from:number[], to:string}[],
  defeatedFigures: {
    [FigureColor.BLACK] :IDefeatedFigure [],
    [FigureColor.WHITE] :IDefeatedFigure []
  },
  moves: IMove,
  grid: (IFigure|0)[][]
}

export interface IPopups {
  isOpen: boolean;
  playerNameInput: string;
  mode: PopupMode | null;
}

export interface IWebsocketState {
  gameCycle: boolean,
  [Members.PLAYER]: string,
  [Members.OPPONENT]: string,
  mode: GameModes;
  connected: boolean;
  readyState: boolean;
  opponentConnected: boolean;
  socket: null | WebSocket;
  playerColor: FigureColor;
}

export interface IValidationProps {
  figure: IChosenFigure;
  grid: (IFigure|0)[][];
}

export interface IReplayMember {
  name: string;
  moves: ReplaysMove [];
}

export interface IReplay {
  [FigureColor.BLACK]:IReplayMember

  [FigureColor.WHITE]:IReplayMember
}

export interface IReplayRes extends IReplay {
  _id:string;
  _v:0;
}

export interface IReplaysReducer {
  replays: IReplayRes[];
  currentReplay: null | IReplayRes;
  winner: null | FigureColor;
  speed: 0|1|2|3
}
