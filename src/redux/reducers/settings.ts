import { createSlice } from '@reduxjs/toolkit';

interface ISettingsState {
  isViewTranslate: boolean;
  isViewButtons: boolean;
  isMusicON: boolean;
  isSoundON: boolean;
  musicVolume: number;
  soundVolume: number;
}

const initialState:ISettingsState = {
  isViewTranslate: true,
  isViewButtons: true,
  isMusicON: true,
  isSoundON: true,
  musicVolume: 50,
  soundVolume: 50
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setIsTranslate: () => {
    }
  }
});

export default settingsSlice.reducer;
