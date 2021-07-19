import { createSlice } from '@reduxjs/toolkit';
import { FigureColor, GameModes } from '../../enums/enums';
import { IWebsocketState } from '../../interfaces/interfaces';

const initialState: IWebsocketState = {
  gameCycle: false,
  player: 'Player 1',
  enemy: 'Player 2',
  mode: GameModes.LOCAL_PVP,
  connected: false,
  readyState: false,
  socket: null,
  opponentConnected: false,
  playerColor: FigureColor.WHITE
};

const websocketsSlice = createSlice({
  name: 'popups',
  initialState,
  reducers: {
    setGameCycle: (state) => {
      state.gameCycle = !state.gameCycle;
    },
    setPlayerName: (state, action) => {
      state.player = action.payload ? action.payload : state.player;
    },
    setOpponentName: (state, action) => {
      state.enemy = action.payload;
    },
    setGameMode: (state, action) => {
      state.mode = action.payload;
    },
    setReadyState: (state, action) => {
      state.readyState = action.payload;
    },
    setConnection: (state, action) => {
      if (action.payload) {
        state.connected = true;
        state.socket = action.payload;
      } else {
        state.connected = false;
        state.socket = null;
      }
    },
    setOpponentConnection: (state, action) => {
      state.opponentConnected = action.payload;
      state.readyState = true;
      state.playerColor = action.payload.your_color;
      state.enemy = action.payload.enemy_name;
      state.gameCycle = true;
    }
  }
});
export const {
  setGameCycle,
  setConnection,
  setOpponentConnection,
  setReadyState,
  setGameMode,
  setPlayerName,
  setOpponentName
} = websocketsSlice.actions;
export default websocketsSlice.reducer;
