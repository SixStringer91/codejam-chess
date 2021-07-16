import { createSlice } from '@reduxjs/toolkit';
import {
  ChessIDBlack,
  ChessIDWhite,
  FigureColor,
  GameModes
} from '../../enums/enums';
import { IFigure, IUserGridState } from '../../interfaces/interfaces';

const {
  B, H, K, Q, R, P
} = ChessIDBlack;
const {
  b, h, k, q, r, p
} = ChessIDWhite;

const initialState:IUserGridState = {
  gameCycle: false,
  gameMode: GameModes.NETWORK_PVP,
  time: 60 * 60,
  chosenFigure: null,
  currentMover: FigureColor.WHITE,
  gameStats: [],
  defeatedFigures: {
    [FigureColor.BLACK]: [],
    [FigureColor.WHITE]: []
  },
  moves: {
    [FigureColor.BLACK]: [],
    [FigureColor.WHITE]: []
  },
  grid: [
    [R, H, B, Q, K, B, H, R],
    [P, P, P, P, P, P, P, P],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [p, p, p, p, p, p, p, p],
    [r, h, b, q, k, b, h, r]
  ]
};

const userGridSlice = createSlice({
  name: 'grid-state',
  initialState,
  reducers: {
    setGameCycle: (state) => {
      state.gameCycle = !state.gameCycle;
    },
    setGameMode: (state, action) => {
      state.gameMode = action.payload;
    },
    setTime: (state, action) => {
      state.time = action.payload;
    },
    setChosenFigure: (state, action) => {
      if (action.payload.color === state.currentMover) {
        state.chosenFigure = {
          ...action.payload,
          position: [...action.payload.position]
        };
      }
    },
    figureMove: (state, action) => {
      const {
        grid, chosenFigure, defeatedFigures, time
      } = state;
      const { WHITE, BLACK } = FigureColor;
      if (chosenFigure) {
        const [fx, fy] = chosenFigure.position;
        const [dx, dy] = action.payload;
        const figure = <IFigure>grid[fy]![fx];
        const beatedFigure = <IFigure>grid[dy]![dx];
        grid[dy]![dx] = figure;
        grid[fy]![fx] = 0;
        if (beatedFigure) {
          state.defeatedFigures[figure.color] = [
            ...defeatedFigures[figure.color],
            { ...beatedFigure, position: [dx, dy], time: Date.now() }];
        }
        state.grid = grid.map((row) => row.map((col) => col));
        state.chosenFigure = null;
        state.currentMover = figure.color === WHITE ? BLACK : WHITE;
        state.moves[chosenFigure.color] = [
          ...state.moves[chosenFigure.color], {
            prevPosition: [fx, fy],
            position: [dx, dy],
            color: figure.color,
            time: 60 * 60 - time,
            type: figure.type
          }
        ];
      }
    }
  }
});
export const {
  setChosenFigure,
  figureMove,
  setTime,
  setGameMode,
  setGameCycle
} = userGridSlice.actions;
export default userGridSlice.reducer;
