import {AxiosError, AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, State} from '../types/state';
import {AuthData} from '../types/auth-data';
import {APIRoute, AppRoute, DEFAULT_LIMIT, HttpCode} from '../constants';
import {saveToken, dropToken} from '../services/token';
import {redirectToRoute} from './action';
import { User, UserGeneral, FileType, UserFullInfo, UserRole, UserEdit } from '../types/user';
import { QuestionnaireUser } from '../types/questionnaire';
import { adaptAvatarToServer, adaptUserEditToServer, adaptUserToServer } from '../utils/adapters/adaptersToServer';
import { adaptUserToClient } from '../utils/adapters/adaptersToClient';
import { setAuthInfo, setUserFullInfo } from './user-process/user-process';
import { Query } from '../types/training';

export const Action = {
  CHEK_USER: 'user/checkAuthAction',
  CHEK_EMAIL: 'user/checkEmail',
  LOGIN_USER: 'user/login',
  REGISTER_USER: 'user/register',
  EDIT_USER: 'user/edit',
  FETCH_USER_OTHER: 'user/fetchUserOther',
  FETCH_USER: 'user/fetchUser',
  FETCH_USER_CATALOG: 'user/fetchUserCatalog',
  FETCH_COUNT_USERS: 'user/fetchCountUsers',
  CREATE_SUBSCRIBE:  'user/createSubscribe',
  DELETE_SUBSCRIBE:  'user/deleteSubscribe',
};

export const checkAuthAction = createAsyncThunk<User, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  Action.CHEK_USER,
  async (_arg, {dispatch, extra: api}) => {
    try {
      const {data} = await api.get<User>(APIRoute.CheckUser);
      dispatch(setAuthInfo({authInfo: data}));

      return data;

    } catch (error) {
      const axiosError = error as AxiosError;

      if (axiosError.response?.status === HttpCode.UNAUTHORIZED) {
        dropToken();
      }

      return Promise.reject(error);
    }
  },
);

export const loginUser = createAsyncThunk<UserFullInfo | null, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  Action.LOGIN_USER,
  async ({login: email, password}, {dispatch, extra: api}) => {

    const auth = await api.post<User>(APIRoute.Login, {email, password});
    saveToken(auth.data.accessToken);

    const {data} = await api.get<UserFullInfo>(APIRoute.CheckUser);
    dispatch(setAuthInfo({authInfo: {id: data.id, userName: data.userName, role: data.role, email: data.email , accessToken: auth.data.accessToken}}));
    dispatch(setUserFullInfo({userFullInfo: data}));
    if(data.role === UserRole.Coach) {
      dispatch(redirectToRoute(AppRoute.AccountCoach));
    }
    else {
      dispatch(redirectToRoute(AppRoute.Main));
    }
    return adaptUserToClient(data);
  },
);

export const checkEmail = createAsyncThunk<string, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  Action.CHEK_EMAIL,
  async ({login: email}, {dispatch, extra: api}) => {
    const {data} = await api.post<string>(APIRoute.CheckEmail, {email});
    if(data) {
      return data;
    }
    return 'false';
  },
);

export const registerUser = createAsyncThunk<void, UserGeneral & QuestionnaireUser & FileType, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
 }>(
   Action.REGISTER_USER,
   async (newUser: UserGeneral & QuestionnaireUser & FileType, { dispatch, extra: api }) => {
     const { data } = await api.post<{ id: string }>(APIRoute.Register, adaptUserToServer(newUser));

     const {data: {accessToken}} = await api.post<User>(APIRoute.Login, {email: newUser.email, password: newUser.password});
     saveToken(accessToken);
     if (data && newUser.avatarImg?.name) {
       const postAvatarApiRoute = `${APIRoute.Files}/avatar`;
       await api.post(postAvatarApiRoute, adaptAvatarToServer(newUser.avatarImg));
     }
     const userFullInfo = await api.get<UserFullInfo>(APIRoute.CheckUser);
     dispatch(setAuthInfo({authInfo: {id: data.id, userName: userFullInfo.data.userName, role: userFullInfo.data.role, email: userFullInfo.data.email , accessToken: accessToken}}));
     dispatch(setUserFullInfo({userFullInfo: userFullInfo.data}));
     dispatch(redirectToRoute(AppRoute.Main));
   });

export const editUser = createAsyncThunk<UserFullInfo, UserEdit & FileType, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
   }>(
     Action.EDIT_USER,
     async (updUser: UserEdit & FileType, { dispatch, extra: api }) => {
       const { data } = await api.post<UserFullInfo>(`${APIRoute.Users}/edit`, adaptUserEditToServer(updUser));
       if (data && updUser.avatarImg?.name) {
         const postAvatarApiRoute = `${APIRoute.Files}/avatar`;
         await api.post(postAvatarApiRoute, adaptAvatarToServer(updUser.avatarImg));
       }
       dispatch(fetchUser());
       return adaptUserToClient(data);
     });

export const fetchUserOther = createAsyncThunk<UserFullInfo, string, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
   }>(
     Action.FETCH_USER_OTHER,
     async (id, { dispatch, extra: api }) => {
       const { data } = await api.get<UserFullInfo>(`${APIRoute.Users}/${id}`);
       return adaptUserToClient(data);
     });


export const fetchUser = createAsyncThunk<UserFullInfo, undefined, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance; }>(
      Action.FETCH_USER,
      async (id, {dispatch, extra: api}) => {
        try {
          const {data} = await api.get<UserFullInfo>(APIRoute.CheckUser);
          return adaptUserToClient(data);

        } catch (error) {

          return Promise.reject(error);
        }
      });

export const fetchCountUsers = createAsyncThunk<number, undefined, {
        dispatch: AppDispatch;
        state: State;
        extra: AxiosInstance; }>(
          Action.FETCH_COUNT_USERS,
          async (_arg, {dispatch, extra: api}) => {
            try {
              const {data} = await api.get<number>(`${APIRoute.Users}/get/count`);
              return data;

            } catch (error) {

              return Promise.reject(error);
            }
          });

export const fetchUserCatalog = createAsyncThunk<UserFullInfo[], Query | undefined, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance; }>(
      Action.FETCH_USER_CATALOG,
      async (query, {extra: api}) => {
        try {
          const limit = query && query.limit ? `limit=${query.limit}&` : `limit=${DEFAULT_LIMIT}&`;
          const page = query && query.page ? `page=${query.page}&` : 'page=1&';
          const userRoleQuery = query && query.userRole ? `userRole=${query.userRole}&` : '';
          const locationQuery = query && query.location ? `location=${query.location.join(',')}&` : '';
          const levelTrainingQuery = query && query.levelTraining ? `levelTraining=${query.levelTraining}&` : '';
          const trainingTypeQuery = query && query.trainingType ? `trainingType=${query.trainingType.join(',').trim()}` : '';
          const {data} = await api.get<UserFullInfo[]>(`${APIRoute.Users}?${limit}${page}${userRoleQuery}${levelTrainingQuery}${locationQuery}${trainingTypeQuery}`);
          return data;

        } catch (error) {

          return Promise.reject(error);
        }
      });

export const createSubscribe = createAsyncThunk<void, string, {
                  dispatch: AppDispatch;
                  state: State;
                  extra: AxiosInstance; }>(
                    Action.CREATE_SUBSCRIBE,
                    async (coachId, {extra: api}) => {
                      try {
                        await api.post(`${APIRoute.User}/subscription/create`,{'coachId': coachId} );
                      } catch (error) {
                        return Promise.reject(error);
                      }
                    });

export const deleteSubscribe = createAsyncThunk<void, string, {
                  dispatch: AppDispatch;
                  state: State;
                  extra: AxiosInstance; }>(
                    Action.DELETE_SUBSCRIBE,
                    async (coachId, {extra: api}) => {
                      try {
                        await api.delete(`${APIRoute.User}/subscription/delete`,{data: {'coachId': coachId}});
                      } catch (error) {
                        return Promise.reject(error);
                      }
                    });

