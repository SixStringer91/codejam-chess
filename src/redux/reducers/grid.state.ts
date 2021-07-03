import { createSlice } from '@reduxjs/toolkit';

interface IUserGridState {
  chosenFigure: {
    type: string,
    position: [x:number, y:number]
  } | null
}

const initialState:IUserGridState = {
  chosenFigure: null
};

const userGridSlice = createSlice({
  name: 'grid-state',
  initialState,
  reducers: {
    setChosenFigure: (state, action) => {
      state.chosenFigure = {
        ...action.payload,
        position: [...action.payload.position]
      };
    }
  }
});
export const {
  setChosenFigure
} = userGridSlice.actions;
export default userGridSlice.reducer;
