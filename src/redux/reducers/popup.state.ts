import { createSlice } from '@reduxjs/toolkit';
import { PopupMode } from '../../enums/enums';
import { IPopups } from '../../interfaces/interfaces';

const initialState: IPopups = {
  isOpen: false,
  playerNameInput: '',
  mode: PopupMode.EDIT_NAME
};

const popupSlice = createSlice({
  name: 'popups',
  initialState,
  reducers: {
    setPopup: (state, action) => {
      state.mode = action.payload.mode;
      state.isOpen = action.payload.isOpen;
    },
    setPlayerInput: (state, action) => {
      state.playerNameInput = action.payload;
    }
  }
});
export const { setPopup, setPlayerInput } = popupSlice.actions;
export default popupSlice.reducer;
