import { combineReducers } from 'redux';
import userGrid from './grid.state';
import websockets from './network.state';
import popup from './popup.state';
import replays from './replays.state';

export const rootReducer = combineReducers({
  userGrid, popup, websockets, replays
});

export type RootState = ReturnType<typeof rootReducer>
