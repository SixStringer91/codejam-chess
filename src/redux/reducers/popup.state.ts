import { createSlice } from '@reduxjs/toolkit';
import { PopupMode } from '../../enums/enums';
import { IPopups } from '../../interfaces/interfaces';

const initialState: IPopups = {
  isOpen: false,
  playerNameInput: '',
  mode: PopupMode.EDIT_NAME,
  replay: null
};

const popupSlice = createSlice({
  name: 'popup-state',
  initialState,
  reducers: {
    setPopup: (state, action) => {
      state.mode = action.payload.mode;
      state.isOpen = action.payload.isOpen;
      if ('replay' in action.payload) {
        state.replay = action.payload.replay;
      }
    },
    setPlayerInput: (state, action) => {
      state.playerNameInput = action.payload;
    }
  }
});
export const { setPopup, setPlayerInput } = popupSlice.actions;
export default popupSlice.reducer;
