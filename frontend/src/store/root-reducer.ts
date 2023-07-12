import {combineReducers} from '@reduxjs/toolkit';
import {NameSpace} from '../constants';
import {userProcess} from './user-process/user-process';


export const rootReducer = combineReducers({
  [NameSpace.User]: userProcess.reducer
});
