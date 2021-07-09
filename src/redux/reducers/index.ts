import { combineReducers } from 'redux';
import userGrid from './grid.state';

export const rootReducer = combineReducers({ userGrid });

export type RootState = ReturnType<typeof rootReducer>
