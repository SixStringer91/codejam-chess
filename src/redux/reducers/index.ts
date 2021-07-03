import { combineReducers } from 'redux';
import settings from './settings';
import userGrid from './grid.state';

export const rootReducer = combineReducers({ settings, userGrid });

export type RootState = ReturnType<typeof rootReducer>
