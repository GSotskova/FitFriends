/* eslint-disable no-console */
import {AxiosError, AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, State} from '../types/state';
import {AuthData} from '../types/auth-data';
import {APIRoute, AppRoute, HttpCode, MAX_CALORIES_VALUE} from '../constants';
import {saveToken, dropToken} from '../services/token';
import {redirectToRoute} from './action';
import { User, UserGeneral, FileType, UserFullInfo, UserRole, UserEdit, Friend } from '../types/user';
import { QuestionnaireCoach, QuestionnaireUser } from '../types/questionnaire';
import { adaptAvatarToServer, adaptCertificateToServer, adaptCoachToServer, adaptUserEditToServer, adaptUserToServer, adaptVideoToServer } from '../utils/adapters/adaptersToServer';
import { adaptUserToClient } from '../utils/adapters/adaptersToClient';
import { setAuthInfo, setUserFullInfo } from './user-process/user-process';
import { Comment, NewComment, NewTraining, Query, StatusRequest, Training } from '../types/training';
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
  FETCH_USER_CATALOG: 'user/fetchUserCatalog',
  FETCH_COACH_TRAININGS: 'training/fetchCoachTrainings',
  FETCH_COACH_TRAINING:  'training/fetchCoachTraining',
  POST_TRAINING:  'training/postTraining',
  EDIT_TRAINING:  'training/editTraining',
  FETCH_COACH_FRIENDS:  'coach/fetchCoachFriends',
  FETCH_USER_FRIENDS:  'user/fetchUserFriends',
  DELETE_FRIEND:  'coach/deleteFriend',
  POST_FRIEND:  'user/postFriend',
  FETCH_COACH_ORDERS:  'coach/fetchCoachOrders',
  POST_ORDER:  'user/postOrder',
  ACCEPT_REQUEST:  'coach/acceptRequest',
  REJECT_REQUEST:  'coach/deleteRequest',
  FETCH_USER_TRAININGS: 'training/fetchUserTrainings',
  FETCH_CATALOG_TRAININGS: 'training/fetchCatalogTrainings',
  FETCH_COMMENTS: 'comment/fetchComments',
  POST_COMMENT:  'comment/postComment',
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
      // eslint-disable-next-line no-console
      console.log('checkAuthAction', data);
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
    if(data.role === UserRole.Coach)
    {
      dispatch(redirectToRoute(AppRoute.AccountCoach));
    }
    else
    {
      // eslint-disable-next-line no-console
      console.log('loginUser', data.role);
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


export const fetchUser = createAsyncThunk<UserFullInfo, undefined, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance; }>(
      Action.FETCH_USER,
      async (id, {dispatch, extra: api}) => {
        // eslint-disable-next-line no-console
        console.log('fetchUser');
        try {
          const {data} = await api.get<UserFullInfo>(APIRoute.CheckUser);
          return adaptUserToClient(data);

        } catch (error) {

          return Promise.reject(error);
        }
      });

export const fetchUserCatalog = createAsyncThunk<UserFullInfo[], Query | undefined, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance; }>(
      Action.FETCH_USER_CATALOG,
      async (query, {dispatch, extra: api}) => {
        try {
          const userRoleQuery = query && query.userRole ? `userRole=${query.userRole}&` : '';
          const locationQuery = query && query.location ? `location=${query.location.join(',')}&` : '';
          const levelTrainingQuery = query && query.levelTraining ? `levelTraining=${query.levelTraining}&` : '';
          const trainingTypeQuery = query && query.trainingType ? `trainingType=${query.trainingType.join(',').trim()}` : '';
          const {data} = await api.get<UserFullInfo[]>(`${APIRoute.Users}?${userRoleQuery}${levelTrainingQuery}${locationQuery}${trainingTypeQuery}`);
          return data;

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
              console.log('fetchCoachTrainings');
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

export const fetchCoachTraining = createAsyncThunk<Training, string, {
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

export const fetchComments = createAsyncThunk<Comment[], string, {
            dispatch: AppDispatch;
            state: State;
            extra: AxiosInstance; }>(
              Action.FETCH_COMMENTS,
              async (id, {dispatch, extra: api}) => {
                try {
                  const {data} = await api.get<Comment[]>(`${APIRoute.Training}/comments/${id}`);
                  return data;
                } catch (error) {
                  return Promise.reject(error);
                }
              });

export const postComment = createAsyncThunk<Comment, NewComment, {
              dispatch: AppDispatch;
              state: State;
              extra: AxiosInstance; }>(
                Action.POST_COMMENT,
                async (newComment, {dispatch, extra: api}) => {
                  try {
                    const {message, ratingTraining, userId, trainingId } = newComment;
                    const {data} = await api.post<Comment>(`${APIRoute.Training}/comments/${trainingId}`, {message, ratingTraining, userId});
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
             if (training.fileVideoTraning?.name) {
               const postVideoApiRoute = `${APIRoute.Files}/video/training/${training.id}`;
               await api.post(postVideoApiRoute, adaptVideoToServer(training.fileVideoTraning));
             }
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


export const fetchUserFriends = createAsyncThunk<Friend[], undefined, {
                dispatch: AppDispatch;
                state: State;
                extra: AxiosInstance; }>(
                  Action.FETCH_USER_FRIENDS,
                  async (_arg, {dispatch, extra: api}) => {
                    try {
                      const {data} = await api.get<Friend[]>(`${APIRoute.User}/friends/show`);
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
                      await api.post(`${APIRoute.Users}/request/update/${requestId}`,
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
                      await api.post(`${APIRoute.Users}/request/update/${requestId}`,
                        {
                          'statusRequest': StatusRequest.Rejected
                        });
                      dispatch(fetchCoachFriends());
                    } catch (error) {
                      return Promise.reject(error);
                    }
                  });

export const fetchUserTrainings = createAsyncThunk<Training[], UserFullInfo, {
              dispatch: AppDispatch;
              state: State;
              extra: AxiosInstance; }>(
                Action.FETCH_USER_TRAININGS,
                async (userFullInfo, {dispatch, extra: api}) => {
                  try {
                    // const userFullInfo = useAppSelector(getUserFullInfo);
                    console.log('fetchUserTrainings', userFullInfo);
                    const {trainingType, trainingTime, caloriesReset } = userFullInfo;
                    const caloriesQuery = `&caloriesReset=${caloriesReset},${MAX_CALORIES_VALUE}`;
                    const trainingTimeQuery = `&trainingTime=${trainingTime.trim()}`;
                    const trainingTypeQuery = `&trainingType=${trainingType.join(',')}`;
                    const {data} = await api.get<Training[]>(`${APIRoute.Training}/catalog?${caloriesQuery}${trainingTimeQuery}${trainingTypeQuery}`);
                    return data;
                  } catch (error) {
                    return Promise.reject(error);
                  }
                });

export const fetchCatalogTrainings = createAsyncThunk<Training[], Query | undefined, {
              dispatch: AppDispatch;
              state: State;
              extra: AxiosInstance; }>(
                Action.FETCH_CATALOG_TRAININGS,
                async (query, {dispatch, extra: api}) => {
                  try {
                    console.log('fetchCatalogTrainings');
                    const priceQuery = query && query.price ? `price=${query.price[0]},${query.price[1]}` : '';
                    const caloriesQuery = query && query.caloriesReset ? `&caloriesReset=${query.caloriesReset[0]},${query.caloriesReset[1]}` : '';
                    const trainingTimeQuery = query && query.trainingTime ? `&trainingTime=${query.trainingTime.join(',').trim()}` : '';
                    const trainingTypeQuery = query && query.trainingType ? `&trainingType=${query.trainingType.join(',').trim()}` : '';
                    const rating = query && query.rating ? `&rating=${query.rating[0]},${query.rating[1]}` : '';
                    const sortPrice = query && query.sortPrice ? `&sortPrice=${query.sortPrice}` : '';
                    const {data} = await api.get<Training[]>(
                      `${APIRoute.Training}/catalog?${priceQuery}${caloriesQuery}${trainingTimeQuery}${trainingTypeQuery}${rating}${sortPrice}`
                    );
                    return data;
                  } catch (error) {
                    return Promise.reject(error);
                  }
                });
