import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit';
import {
  MagicNumbers, ChessIDBlack, ChessIDWhite, FigureColor
} from '../../enums/enums';

import { IFigure, IUserGridState } from '../../interfaces/interfaces';
import { saveReplayThunk } from '../thunks/grid.thunks';

const {
  B, H, K, Q, R, P
} = ChessIDBlack;
const {
  b, h, k, q, r, p
} = ChessIDWhite;

const initialState: IUserGridState = {
  winner: null,
  time: 60 * 60,
  resultTable: null,
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

export const saveReplay = createAsyncThunk('grid/save', saveReplayThunk);

const userGridSlice = createSlice({
  name: 'grid-state',
  initialState,
  reducers: {
    setTime: (state, action) => {
      state.time = action.payload;
    },
    setCurrentMover: (state, action) => {
      state.currentMover = action.payload;
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
      } = current(state);
      const { WHITE, BLACK } = FigureColor;
      if (chosenFigure) {
        const [fx, fy] = chosenFigure.position;
        const [dx, dy] = action.payload;
        if (grid[dy]![dx] === K || grid[dy]![dx] === k) {
          state.winner = chosenFigure.color;
        }
        const figure = <IFigure>grid[fy]![fx];
        const beatedFigure = <IFigure>grid[dy]![dx];
        state.grid[dy]![dx] = figure;
        state.grid[fy]![fx] = 0;
        if (beatedFigure) {
          state.defeatedFigures[figure.color] = [
            ...defeatedFigures[figure.color],
            { ...beatedFigure, position: [dx, dy], time: Date.now() }
          ];
        }
        // state.grid = grid.map((row) => row.map((col) => col));
        state.chosenFigure = null;
        state.currentMover = figure.color === WHITE ? BLACK : WHITE;
        state.moves[chosenFigure.color] = [
          ...state.moves[chosenFigure.color],
          {
            prevPosition: [fx, fy],
            position: [dx, dy],
            color: figure.color,
            time: 60 * 60 - time,
            type: figure.type
          }
        ];
      }
    },
    setWinnerNull: (state) => {
      state.winner = null;
    },
    setResultTable: (state, action) => {
      state.resultTable = {
        ...action.payload,
        _id: MagicNumbers.GRID_SIZE,
        _v: MagicNumbers.HOUR
      };
    },
    unsetResultTable: (state) => {
      state.resultTable = null;
    },
    gridReset: (state) => {
      state.winner = null;
      state.time = 60 * 60;
      state.chosenFigure = null;
      state.currentMover = FigureColor.WHITE;
      state.gameStats = [];
      state.defeatedFigures = {
        [FigureColor.BLACK]: [],
        [FigureColor.WHITE]: []
      };
      state.moves = {
        [FigureColor.BLACK]: [],
        [FigureColor.WHITE]: []
      };
      state.grid = [
        [R, H, B, Q, K, B, H, R],
        [P, P, P, P, P, P, P, P],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [p, p, p, p, p, p, p, p],
        [r, h, b, q, k, b, h, r]
      ];
    }
  },
  extraReducers: (builder) => {
    builder.addCase(saveReplay.fulfilled, (_state, action) => {
      console.log(action);
    });
  }
});
export const {
  setCurrentMover,
  setChosenFigure,
  figureMove,
  setTime,
  gridReset,
  setWinnerNull,
  setResultTable,
  unsetResultTable
} = userGridSlice.actions;
export default userGridSlice.reducer;
