import { combineReducers } from 'redux';
import userGrid from './grid.state';
import popup from './popup.state';

export const rootReducer = combineReducers({ userGrid, popup });

export type RootState = ReturnType<typeof rootReducer>
