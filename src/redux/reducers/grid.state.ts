import { createSlice } from '@reduxjs/toolkit';
import { FigureColor } from '../../enums/enums';

interface IChosenFigure {
  chosenFigure:{
    type: string,
    position: [x:number, y:number]} | null
}

interface IUserGridState extends IChosenFigure {
  currentMover: FigureColor.BLACK|FigureColor.WHITE,
  gameStats: {from:number[], to:string}[],
  defeatedFigures: {
    black :string [],
    white :string []
  }
}

const initialState:IUserGridState = {
  chosenFigure: null,
  currentMover: FigureColor.WHITE,
  gameStats: [],
  defeatedFigures: {
    black: [],
    white: []
  }
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
