import { createSlice } from '@reduxjs/toolkit';
import { Members, FigureColor, GameModes } from '../../enums/enums';

import { IWebsocketState } from '../../interfaces/interfaces';

const { PLAYER, OPPONENT } = Members;

const initialState: IWebsocketState = {
  gameCycle: false,
  [PLAYER]: 'Player 1',
  [OPPONENT]: 'Player 2',
  mode: GameModes.LOCAL_PVP,
  connected: false,
  readyState: false,
  socket: null,
  opponentConnected: false,
  playerColor: FigureColor.WHITE
};

const websocketsSlice = createSlice({
  name: 'websockets-state',
  initialState,
  reducers: {
    setGameCycle: (state) => {
      state.gameCycle = !state.gameCycle;
    },
    setPlayerName: (state, action) => {
      state[PLAYER] = action.payload ? action.payload : state[PLAYER];
    },
    setOpponentName: (state, action) => {
      state[OPPONENT] = action.payload;
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
        state.opponentConnected = false;
        state.readyState = false;
        state.playerColor = FigureColor.WHITE;
        state[OPPONENT] = 'Player 2';
        state.gameCycle = false;
        state.mode = GameModes.LOCAL_PVP;
      }
    },
    setOpponentConnection: (state, action) => {
      state.opponentConnected = action.payload;
      state.readyState = true;
      state.playerColor = action.payload.your_color;
      state[OPPONENT] = action.payload.enemy_name;
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
