import {store} from '../store/index';
import {AuthorizationStatus, FormRegistration} from '../constants';
import {User, UserRegister} from './user';

export type UserProcess = {
  authorizationStatus: AuthorizationStatus;
  authInfo: User | null;
  hasErrorLogin: boolean;
  userData: UserRegister;
  formRegistrType: FormRegistration;
  existsEmail: boolean;
};


export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
