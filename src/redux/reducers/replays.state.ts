import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getReplaysThunk } from '../thunks/grid.thunks';
import { IReplaysReducer } from '../../interfaces/interfaces';

const initialState: IReplaysReducer = {
  replays: []
};

export const getReplays = createAsyncThunk(
  'replays-state/get', getReplaysThunk
);

const popupSlice = createSlice({
  name: 'replays-state',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(getReplays.fulfilled, (state, action) => {
      console.log(action.payload);
      state.replays = [...action.payload];
    });
  }
});
export default popupSlice.reducer;
