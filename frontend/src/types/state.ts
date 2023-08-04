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
  userOther: UserFullInfo | null;
  isUserOtherLoading: boolean;
  countUsers: number;
};

export type TrainingData = {
  trainings: Training[];
  countAllTrainings: number;
  isLoadingCountAllTrainings: boolean;
  userTrainings: Training[];
  isTrainingsDataLoading: boolean;
  hasError: boolean;
  isTrainingLoading: boolean;
  training: Training | null;
  hasErrorPost: boolean;
  coachTrainings: Training[];
  isCoachTrainingsLoading: boolean;
  isLoadingPostTraining: boolean;
};

export type CommentData = {
  comments: Comment[];
  isCommentsDataLoading: boolean;
  hasError: boolean;
  hasErrorPostComment: boolean;
};

export type FriendData = {
  friends: Friend[];
  countFiends: number;
  isCountDataLoading: boolean;
  isFriendsDataLoading: boolean;
  hasError: boolean;
  hasErrorPost: boolean;
  isFriendLoadDelete: boolean;
  isFriendLoadPost: boolean;
};

export type OrderData = {
  orders: Order[];
  isOrdersDataLoading: boolean;
  isOrdersUserDataLoading: boolean;
  hasError: boolean;
  hasErrorPost: boolean;
  isPostLoading: boolean;
  hasErrorReduce: boolean;
  order: Order | null;
  isOrderDataLoading: boolean;
  countOrders: number;
};

export type RequestData = {
  hasErrorPost: boolean;
  hasErrorDelete: boolean;
  isLoadPost: boolean;
  isLoadDelete: boolean;
};

export type SubscribeData = {
  hasErrorPost: boolean;
  hasErrorDelete: boolean;
  isSubscrLoadPost: boolean;
  isSubscrLoadDelete: boolean;
};


export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
