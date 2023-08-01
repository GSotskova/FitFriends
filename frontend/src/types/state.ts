import {store} from '../store/index';
import {AuthorizationStatus, FormRegistration} from '../constants';
import {User, UserFullInfo, UserGeneral, Friend} from './user';
import { Comment, Training } from './training';
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
  isUserCatalogLoading: boolean;
  isAuthInfoLoading: boolean;
  hasErrorPostCertificate: boolean;
  users: UserFullInfo[];
};

export type TrainingData = {
  trainings: Training[];
  userTrainings: Training[];
  isTrainingsDataLoading: boolean;
  hasError: boolean;
  isTrainingLoading: boolean;
  training: Training | null;
  hasErrorPost: boolean;
};

export type CommentData = {
  comments: Comment[];
  isCommentsDataLoading: boolean;
  hasError: boolean;
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
  isOrdersUserDataLoading: boolean;
  hasError: boolean;
  hasErrorPost: boolean;
};

export type RequestData = {
  hasErrorPost: boolean;
};


export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
