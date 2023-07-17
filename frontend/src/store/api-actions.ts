import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, State} from '../types/state.js';
import {AuthData} from '../types/auth-data';
import {APIRoute, AppRoute} from '../constants';
import {saveToken, dropToken} from '../services/token';
import {redirectToRoute} from './action';
import {loadAuthInfo} from '../store/user-process/user-process';
import { User, UserGeneral, FileType } from '../types/user';
import { QuestionnaireCoach } from '../types/questionnaire';
import { adaptAvatarToServer, adaptCertificateToServer, adaptCoachToServer } from '../utils/adapters/adaptersToServer';


export const checkAuthAction = createAsyncThunk<User, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.get<User>(APIRoute.Login);
    return data;
  },
);


export const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/login',
  async ({login: email, password}, {dispatch, extra: api}) => {
    const {data: {accessToken}} = await api.post<User>(APIRoute.Login, {email, password});
    saveToken(accessToken);
    const {data} = await api.get<User>(APIRoute.Login);
    dispatch(loadAuthInfo({authInfo: data}));
    dispatch(redirectToRoute(AppRoute.Intro));
  },
);

export const checkEmail = createAsyncThunk<string, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/checkEmail',
  async ({login: email}, {dispatch, extra: api}) => {
    const {data} = await api.post<string>(APIRoute.CheckEmail, {email});
    if(data) {
      return data;
    }
    return 'false';
  },
);


export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/logout',
  async (_arg, {dispatch, extra: api}) => {
    await api.delete(APIRoute.Logout);
    dropToken();
  },
);

export const registerCoach = createAsyncThunk<void, UserGeneral & QuestionnaireCoach & FileType, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
 }>(
   'coach/register',
   async (newCoach: UserGeneral & QuestionnaireCoach & FileType, { dispatch, extra: api }) => {
     const { data } = await api.post<{ id: string }>(APIRoute.Register, adaptCoachToServer(newCoach));

     const {data: {accessToken}} = await api.post<User>(APIRoute.Login, {email: newCoach.email, password: newCoach.password});
     saveToken(accessToken);
     if (data && newCoach.avatarImg?.name && newCoach.fileCertificate?.name) {
       const postAvatarApiRoute = `${APIRoute.Files}/avatar`;
       await api.post(postAvatarApiRoute, adaptAvatarToServer(newCoach.avatarImg));

       const postCertificateApiRoute = `${APIRoute.Files}/coach/certificate`;
       await api.post(postCertificateApiRoute, adaptCertificateToServer(newCoach.fileCertificate));
     }
     dispatch(redirectToRoute(AppRoute.Intro));
   });


