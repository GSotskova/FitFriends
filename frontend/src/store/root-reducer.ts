import {combineReducers} from '@reduxjs/toolkit';
import {NameSpace} from '../constants';
import {userProcess} from './user-process/user-process';
import { trainingsData } from './trainings-data/trainings-data';
import { friendsData } from './friends-data/friends-data';
import { ordersData } from './orders-data/orders-data';
import { requestData } from './request-data/request-data';


export const rootReducer = combineReducers({
  [NameSpace.User]: userProcess.reducer,
  [NameSpace.DataTraining]: trainingsData.reducer,
  [NameSpace.DataTrainings]: trainingsData.reducer,
  [NameSpace.DataFriends]: friendsData.reducer,
  [NameSpace.DataOrders]: ordersData.reducer,
  [NameSpace.DataRequest]: requestData.reducer
});
