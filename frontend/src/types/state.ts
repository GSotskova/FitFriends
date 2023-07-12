import {store} from '../store/index';
import {AuthorizationStatus} from '../constants';
import {User, UserRegister} from './user';

export type UserProcess = {
  authorizationStatus: AuthorizationStatus;
  authInfo: User | null;
  hasErrorLogin: boolean;
  userData: UserRegister;
};


export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
