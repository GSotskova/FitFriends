import {combineReducers} from '@reduxjs/toolkit';
import {NameSpace} from '../constants';
import {userProcess} from './user-process/user-process';
import { trainingsData } from './trainings-data/trainings-data';


export const rootReducer = combineReducers({
  [NameSpace.User]: userProcess.reducer,
  [NameSpace.DataTraining]: trainingsData.reducer,
  [NameSpace.DataTrainings]: trainingsData.reducer
});
