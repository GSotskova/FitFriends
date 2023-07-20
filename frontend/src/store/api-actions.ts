import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, State} from '../types/state';
import {AuthData} from '../types/auth-data';
import {APIRoute, AppRoute} from '../constants';
import {saveToken, dropToken} from '../services/token';
import {redirectToRoute} from './action';
import { User, UserGeneral, FileType, UserFullInfo, UserRole, UserEdit } from '../types/user';
import { QuestionnaireCoach, QuestionnaireUser } from '../types/questionnaire';
import { adaptAvatarToServer, adaptCertificateToServer, adaptCoachToServer, adaptUserEditToServer, adaptUserToServer } from '../utils/adapters/adaptersToServer';
import { adaptUserToClient } from '../utils/adapters/adaptersToClient';
import { setUserFullInfo } from './user-process/user-process';
import { NewTraining, Training } from '../types/training';


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


export const loginUser = createAsyncThunk<UserFullInfo | null, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/login',
  async ({login: email, password}, {dispatch, extra: api}) => {
    const {data: {accessToken}} = await api.post<User>(APIRoute.Login, {email, password});
    saveToken(accessToken);

    const {data} = await api.get<UserFullInfo>(APIRoute.CheckUser);

    dispatch(setUserFullInfo({userFullInfo: data}));
    if(data.role === UserRole.Coach)
    {
      dispatch(redirectToRoute(AppRoute.AccountCoach));
    }
    else
    {
      dispatch(redirectToRoute(AppRoute.Intro));
    }
    return adaptUserToClient(data);
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


export const registerUser = createAsyncThunk<void, UserGeneral & QuestionnaireUser & FileType, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
 }>(
   'user/register',
   async (newUser: UserGeneral & QuestionnaireUser & FileType, { dispatch, extra: api }) => {
     const { data } = await api.post<{ id: string }>(APIRoute.Register, adaptUserToServer(newUser));

     const {data: {accessToken}} = await api.post<User>(APIRoute.Login, {email: newUser.email, password: newUser.password});
     saveToken(accessToken);
     if (data && newUser.avatarImg?.name) {
       const postAvatarApiRoute = `${APIRoute.Files}/avatar`;
       await api.post(postAvatarApiRoute, adaptAvatarToServer(newUser.avatarImg));
     }
     dispatch(redirectToRoute(AppRoute.Intro));
   });

export const editUser = createAsyncThunk<UserFullInfo, UserEdit & FileType, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
   }>(
     'user/edit',
     async (updUser: UserEdit & FileType, { dispatch, extra: api }) => {
       const { data } = await api.post<UserFullInfo>(`${APIRoute.Users}/edit`, adaptUserEditToServer(updUser));
       if (data && updUser.avatarImg?.name) {
         const postAvatarApiRoute = `${APIRoute.Files}/avatar`;
         await api.post(postAvatarApiRoute, adaptAvatarToServer(updUser.avatarImg));
       }
       return adaptUserToClient(data);
     });


export const fetchUser = createAsyncThunk<UserFullInfo, undefined, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance; }>(
      'user/fetchUser',
      async (id, {dispatch, extra: api}) => {

        try {
          const {data} = await api.get<UserFullInfo>(APIRoute.CheckUser);
          if(data.role === UserRole.Coach)
          {
            dispatch(redirectToRoute(AppRoute.AccountCoach));
          }
          else
          {
            dispatch(redirectToRoute(AppRoute.Intro)); /////////!!!!!!!!!!!!!!!!!!!!!!!
          }
          return adaptUserToClient(data);

        } catch (error) {

          return Promise.reject(error);
        }
      });

export const fetchCoachTrainings = createAsyncThunk<Training[], undefined, {
        dispatch: AppDispatch;
        state: State;
        extra: AxiosInstance; }>(
          'training/fetchCoachTrainings',
          async (_arg, {dispatch, extra: api}) => {
            console.log('fetchCoachTrainings');
            try {
              const {data} = await api.get<Training[]>(`${APIRoute.CoachTraining}/show/list`);
              console.log('fetchCoachTrainings', data);
              return data;
            } catch (error) {
              return Promise.reject(error);
            }
          });

export const fetchCoachTraining = createAsyncThunk<Training, Training['id'], {
        dispatch: AppDispatch;
        state: State;
        extra: AxiosInstance; }>(
          'training/fetchCoachTraining',
          async (id, {dispatch, extra: api}) => {
            try {
              const {data} = await api.get<Training>(`${APIRoute.CoachTraining}/${id}`);
              return data;
            } catch (error) {
              return Promise.reject(error);
            }
          });

export const postTraining = createAsyncThunk<Training, NewTraining, {
            dispatch: AppDispatch;
            state: State;
            extra: AxiosInstance;
           }>(
             'training/postTraining',
             async (newtraining, { dispatch, extra: api }) => {
               console.log('postTraining', newtraining);
               const { data } = await api.post<Training>(`${APIRoute.CoachTraining}/create`, newtraining);
               // dispatch(redirectToRoute(`${AppRoute.Products}/${data.id}`));

               /* if (data) {

                 const postImageApiRoute = `${APIRoute.Products}/${data.id}/photo`;
                 await api.post(postImageApiRoute, adaptPhotoToServer(newProduct.photo), {
                   headers: { 'Content-Type': 'multipart/form-data boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW' },
                 });

               }*/

               return data;
             });

export const editTraining = createAsyncThunk<Training, Training, {
          dispatch: AppDispatch;
          state: State;
          extra: AxiosInstance;
         }>(
           'training/editTraining',
           async (training, { dispatch, extra: api }) => {

             /*  const postImageAPIRoute = `${APIRoute.Products}/${product.id}/photo`;
             await api.post(postImageAPIRoute, adaptPhotoToServer(product.photo), {
               headers: { 'Content-Type': 'multipart/form-data boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW' },
             });*/


             const { data } = await api.patch<Training>(`${APIRoute.CoachTraining}/edit/${training.id}`, training);

             //   dispatch(redirectToRoute(`${AppRoute.Products}/${data.id}`));
             return data;
           });
