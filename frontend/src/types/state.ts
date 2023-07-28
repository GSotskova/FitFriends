import {store} from '../store/index';
import {AuthorizationStatus, FormRegistration} from '../constants';
import {User, UserFullInfo, UserGeneral, Friend} from './user';
import { Training } from './training';
import { Order } from './order';

export type UserProcess = {
  authorizationStatus: AuthorizationStatus;
  authInfo: User | null;
  hasErrorLogin: boolean;
  userData: UserGeneral | null;
  userFullInfo: UserFullInfo;
  formRegistrType: FormRegistration;
  existsEmail: boolean;
  isUserLoading: boolean;
  hasErrorPostCertificate: boolean;
};

export type TrainingData = {
  trainings: Training[];
  isTrainingsDataLoading: boolean;
  hasError: boolean;
  isTrainingLoading: boolean;
  training: Training | null;
  hasErrorPost: boolean;
};

export type FriendData = {
  friends: Friend[];
  isFriendsDataLoading: boolean;
  hasError: boolean;
  hasErrorPost: boolean;
};

export type OrderData = {
  orders: Order[];
  isOrdersDataLoading: boolean;
  hasError: boolean;
  hasErrorPost: boolean;
};

export type RequestData = {
  hasErrorPost: boolean;
};


export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
