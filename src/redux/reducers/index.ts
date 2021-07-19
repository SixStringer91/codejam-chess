import { combineReducers } from 'redux';
import userGrid from './grid.state';
import websockets from './network.state';
import popup from './popup.state';

export const rootReducer = combineReducers({ userGrid, popup, websockets });

export type RootState = ReturnType<typeof rootReducer>
