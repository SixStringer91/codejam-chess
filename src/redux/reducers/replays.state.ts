import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IReplayMember, IReplaysReducer } from '../../interfaces/interfaces';
import { getReplaysThunk } from '../thunks/grid.thunks';

import { FigureColor } from '../../enums/enums';

const initialState: IReplaysReducer = {
  replays: [],
  currentReplay: null,
  winner: null,
  speed: 1
};

export const getReplays = createAsyncThunk(
  'replays-state/get',
  getReplaysThunk
);

const replaysSlice = createSlice({
  name: 'replays-state',
  initialState,
  reducers: {
    setReplaySpeed: (state, action) => {
      state.speed = action.payload;
    },
    setCurrentReplay: (state, action) => {
      state.currentReplay = JSON.parse(action.payload);
    },
    removeReplayFirstElement: (state, action) => {
      const color = action.payload as FigureColor;
      const replay = state.currentReplay![color] as IReplayMember;
      replay.moves.shift();
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getReplays.fulfilled, (state, action) => {
      try {
        state.replays = [...action.payload];
      } catch {
        console.error(action);
      }
    });
  }
});

export const {
  setCurrentReplay,
  removeReplayFirstElement,
  setReplaySpeed
} = replaysSlice.actions;
export default replaysSlice.reducer;
