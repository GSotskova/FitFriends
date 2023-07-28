import {AxiosError, AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, State} from '../types/state';
import {AuthData} from '../types/auth-data';
import {APIRoute, AppRoute, HttpCode} from '../constants';
import {saveToken, dropToken} from '../services/token';
import {redirectToRoute} from './action';
import { User, UserGeneral, FileType, UserFullInfo, UserRole, UserEdit, Friend } from '../types/user';
import { QuestionnaireCoach, QuestionnaireUser } from '../types/questionnaire';
import { adaptAvatarToServer, adaptCertificateToServer, adaptCoachToServer, adaptUserEditToServer, adaptUserToServer, adaptVideoToServer } from '../utils/adapters/adaptersToServer';
import { adaptUserToClient } from '../utils/adapters/adaptersToClient';
import { setUserFullInfo } from './user-process/user-process';
import { NewTraining, Query, StatusRequest, Training } from '../types/training';
import { NewOrder, Order } from '../types/order';

export const Action = {
  CHEK_USER: 'user/checkAuthAction',
  CHEK_EMAIL: 'user/checkEmail',
  LOGIN_USER: 'user/login',
  REGISTER_COACH: 'coach/register',
  REGISTER_USER: 'user/register',
  UPD_CERTIFICATE: 'coach/updateCertificate',
  POST_CERTIFICATE: 'coach/postCertificate',
  DELETE_CERTIFICATE: 'coach/deleteCertificate',
  EDIT_USER: 'user/edit',
  FETCH_USER: 'user/fetchUser',
  FETCH_COACH_TRAININGS: 'training/fetchCoachTrainings',
  FETCH_COACH_TRAINING:  'training/fetchCoachTraining',
  POST_TRAINING:  'training/postTraining',
  EDIT_TRAINING:  'training/editTraining',
  FETCH_COACH_FRIENDS:  'coach/fetchCoachFriends',
  DELETE_FRIEND:  'coach/deleteFriend',
  POST_FRIEND:  'user/postFriend',
  FETCH_COACH_ORDERS:  'coach/fetchCoachOrders',
  POST_ORDER:  'user/postOrder',
  ACCEPT_REQUEST:  'coach/acceptRequest',
  REJECT_REQUEST:  'coach/deleteRequest',
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
  Action.CHEK_EMAIL,
  async ({login: email}, {dispatch, extra: api}) => {
    const {data} = await api.post<string>(APIRoute.CheckEmail, {email});
    if(data) {
      return data;
    }
    return 'false';
  },
);


export const registerCoach = createAsyncThunk<void, UserGeneral & QuestionnaireCoach & FileType, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
 }>(
   Action.REGISTER_COACH,
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

export const updateCertificate = createAsyncThunk<void, FileType, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
   }>(
     Action.UPD_CERTIFICATE,
     async ({certificateId, fileCertificate }, { dispatch, extra: api }) => {
       if (fileCertificate) {
         const postCertificateApiRoute = `${APIRoute.Files}/coach/certificate/update`;
         await api.post(postCertificateApiRoute, adaptCertificateToServer(fileCertificate, certificateId));
       }

     });

export const postCertificate = createAsyncThunk<void, FileType, {
      dispatch: AppDispatch;
      state: State;
      extra: AxiosInstance;
     }>(
       Action.POST_CERTIFICATE,
       async (newCertificate: FileType, { dispatch, extra: api }) => {
         if (newCertificate.fileCertificate) {
           const postCertificateApiRoute = `${APIRoute.Files}/coach/certificate`;
           await api.post(postCertificateApiRoute, adaptCertificateToServer(newCertificate.fileCertificate));
           dispatch(fetchUser());
           dispatch(redirectToRoute(AppRoute.AccountCoach));
         }

       });

export const deleteCertificate = createAsyncThunk<void, string, {
        dispatch: AppDispatch;
        state: State;
        extra: AxiosInstance;
       }>(
         Action.DELETE_CERTIFICATE,
         async (certificateId, { dispatch, extra: api }) => {
           await api.delete(`${APIRoute.Coach}/certificate/delete/${certificateId}`);
           dispatch(fetchUser());
           dispatch(redirectToRoute(AppRoute.AccountCoach));
         });

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
     dispatch(redirectToRoute(AppRoute.Intro));
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


export const fetchUser = createAsyncThunk<UserFullInfo, undefined, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance; }>(
      Action.FETCH_USER,
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

export const fetchCoachTrainings = createAsyncThunk<Training[], Query | undefined, {
        dispatch: AppDispatch;
        state: State;
        extra: AxiosInstance; }>(
          Action.FETCH_COACH_TRAININGS,
          async (query, {dispatch, extra: api}) => {
            try {
              const priceQuery = query && query.price ? `price=${query.price[0]},${query.price[1]}` : '';
              const caloriesQuery = query && query.caloriesReset ? `&caloriesReset=${query.caloriesReset[0]},${query.caloriesReset[1]}` : '';
              const trainingTimeQuery = query && query.trainingTime ? `&trainingTime=${query.trainingTime.join(',').trim()}` : '';
              const rating = query && query.rating ? `&rating=${query.rating[0]},${query.rating[1]}` : '';

              const {data} = await api.get<Training[]>(`${APIRoute.CoachTraining}/show/list?${priceQuery}${caloriesQuery}${trainingTimeQuery}${rating}`);
              return data;
            } catch (error) {
              return Promise.reject(error);
            }
          });

export const fetchCoachTraining = createAsyncThunk<Training, Training['id'], {
        dispatch: AppDispatch;
        state: State;
        extra: AxiosInstance; }>(
          Action.FETCH_COACH_TRAINING,
          async (id, {dispatch, extra: api}) => {
            try {
              const {data} = await api.get<Training>(`${APIRoute.CoachTraining}/${id}`);
              return data;
            } catch (error) {
              return Promise.reject(error);
            }
          });

export const postTraining = createAsyncThunk<Training, NewTraining & FileType, {
            dispatch: AppDispatch;
            state: State;
            extra: AxiosInstance;
           }>(
             Action.POST_TRAINING,
             async (newtraining: NewTraining & FileType, { dispatch, extra: api }) => {
               const { data } = await api.post<Training>(`${APIRoute.CoachTraining}/create`, newtraining);

               if (data && newtraining.fileVideoTraning?.name) {
                 const postCertificateApiRoute = `${APIRoute.Files}/video/training/${data.id}`;
                 await api.post(postCertificateApiRoute, adaptVideoToServer(newtraining.fileVideoTraning));
               }
               dispatch(redirectToRoute(`${AppRoute.AccountCoach}/trainings`));

               return data;
             });

export const editTraining = createAsyncThunk<Training, Training, {
          dispatch: AppDispatch;
          state: State;
          extra: AxiosInstance;
         }>(
           Action.EDIT_TRAINING,
           async (training, { dispatch, extra: api }) => {

             /*  const postImageAPIRoute = `${APIRoute.Products}/${product.id}/photo`;
             await api.post(postImageAPIRoute, adaptPhotoToServer(product.photo), {
               headers: { 'Content-Type': 'multipart/form-data boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW' },
             });*/

             const { data } = await api.patch<Training>(`${APIRoute.CoachTraining}/edit/${training.id}`, training);
             return data;
           });

export const fetchCoachFriends = createAsyncThunk<Friend[], undefined, {
            dispatch: AppDispatch;
            state: State;
            extra: AxiosInstance; }>(
              Action.FETCH_COACH_FRIENDS,
              async (_arg, {dispatch, extra: api}) => {
                try {
                  const {data} = await api.get<Friend[]>(`${APIRoute.Coach}/friends/show`);
                  return data;
                } catch (error) {
                  return Promise.reject(error);
                }
              });

export const deleteFriend = createAsyncThunk<Friend, Friend['id'], {
              dispatch: AppDispatch;
              state: State;
              extra: AxiosInstance; }>(
                Action.DELETE_FRIEND,
                async (id, {dispatch, extra: api}) => {
                  try {
                    const {data} = await api.post<Friend>(`${APIRoute.Coach}/friends/delete/${id}`);
                    return data;
                  } catch (error) {
                    return Promise.reject(error);
                  }
                });

export const postFriend = createAsyncThunk<Friend, UserFullInfo['id'], {
              dispatch: AppDispatch;
              state: State;
              extra: AxiosInstance; }>(
                Action.POST_FRIEND,
                async (id, {dispatch, extra: api}) => {
                  try {
                    const {data} = await api.post<Friend>(`${APIRoute.User}/friends/add/${id}`);
                    return data;
                  } catch (error) {
                    return Promise.reject(error);
                  }
                });

export const fetchCoachOrders = createAsyncThunk<Order[], string | undefined, {
              dispatch: AppDispatch;
              state: State;
              extra: AxiosInstance; }>(
                Action.FETCH_COACH_ORDERS,
                async (sortData, {dispatch, extra: api}) => {
                  try {
                    const sort = sortData ? sortData : ' ';
                    console.log(sort);
                    const {data} = await api.get<Order[]>(`${APIRoute.Coach}/orders?${sort}`);
                    return data;
                  } catch (error) {
                    return Promise.reject(error);
                  }
                });

export const postOrder = createAsyncThunk<Order, NewOrder, {
                dispatch: AppDispatch;
                state: State;
                extra: AxiosInstance; }>(
                  Action.POST_ORDER,
                  async (newOrder, {dispatch, extra: api}) => {
                    try {
                      const {data} = await api.post<Order>(`${APIRoute.User}/orders/create`, newOrder);
                      return data;
                    } catch (error) {
                      return Promise.reject(error);
                    }
                  });

export const acceptRequest = createAsyncThunk<void, string, {
                dispatch: AppDispatch;
                state: State;
                extra: AxiosInstance; }>(
                  Action.ACCEPT_REQUEST,
                  async (requestId, {dispatch, extra: api}) => {
                    try {
                      await api.post(`${APIRoute.Coach}/request/update/${requestId}`,
                        {
                          'statusRequest': StatusRequest.Accepted
                        });
                      dispatch(fetchCoachFriends());
                    } catch (error) {
                      return Promise.reject(error);
                    }
                  });

export const deleteRequest = createAsyncThunk<void, string, {
                dispatch: AppDispatch;
                state: State;
                extra: AxiosInstance; }>(
                  Action.REJECT_REQUEST,
                  async (requestId, {dispatch, extra: api}) => {
                    try {
                      await api.post(`${APIRoute.Coach}/request/update/${requestId}`,
                        {
                          'statusRequest': StatusRequest.Rejected
                        });
                      dispatch(fetchCoachFriends());
                    } catch (error) {
                      return Promise.reject(error);
                    }
                  });
