import {store} from '../store/index';
import {AuthorizationStatus, FormRegistration} from '../constants';
import {User, UserFullInfo, UserGeneral} from './user';
import { Training } from './training';

export type UserProcess = {
  authorizationStatus: AuthorizationStatus;
  authInfo: User | null;
  hasErrorLogin: boolean;
  userData: UserGeneral | null;
  userFullInfo: UserFullInfo;
  formRegistrType: FormRegistration;
  existsEmail: boolean;
  isUserLoading: boolean;
};

export type TrainingData = {
  trainings: Training[];
  isTrainingsDataLoading: boolean;
  hasError: boolean;
  isTrainingLoading: boolean;
  training: Training | null;
  hasErrorPost: boolean;
};


export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
