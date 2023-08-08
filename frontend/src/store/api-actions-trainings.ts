import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, State} from '../types/state';
import {APIRoute, AppRoute, COUNT_TRAINING_FOR_SEND, DEFAULT_LIMIT, MAX_CALORIES_VALUE} from '../constants';
import {redirectToRoute} from './action';
import { FileType, UserFullInfo, UserRole } from '../types/user';
import { adaptVideoToServer } from '../utils/adapters/adaptersToServer';
import { Comment, NewComment, NewTraining, Query, TotalTrainInfo, Training } from '../types/training';


export const Action = {
  FETCH_COACH_TRAININGS: 'training/fetchCoachTrainings',
  FETCH_COACH_OTHER_TRAININGS: 'training/fetchCoachOtherTrainings',
  FETCH_COACH_TRAINING:  'training/fetchCoachTraining',
  POST_TRAINING:  'training/postTraining',
  EDIT_TRAINING:  'training/editTraining',
  FETCH_USER_TRAININGS: 'training/fetchUserTrainings',
  FETCH_CATALOG_TRAININGS: 'training/fetchCatalogTrainings',
  FETCH_COUNT_TRAININGS: 'training/fetchCountTrainings',
  FETCH_COMMENTS: 'comment/fetchComments',
  POST_COMMENT:  'comment/postComment',
};

export const fetchCoachTrainings = createAsyncThunk<Training[], Query | undefined, {
        dispatch: AppDispatch;
        state: State;
        extra: AxiosInstance; }>(
          Action.FETCH_COACH_TRAININGS,
          async (query, {dispatch, extra: api}) => {
            try {
              const limit = query && query.limit ? `limit=${query.limit}&` : `limit=${DEFAULT_LIMIT}&`;
              const page = query && query.page ? `page=${query.page}&` : 'page=1&';
              const priceQuery = query && query.price ? `price=${query.price[0]},${query.price[1]}&` : '';
              const caloriesQuery = query && query.caloriesReset ? `caloriesReset=${query.caloriesReset[0]},${query.caloriesReset[1]}&` : '';
              const trainingTimeQuery = query && query.trainingTime ? `trainingTime=${query.trainingTime.join(',').trim()}&` : '';
              const rating = query && query.rating ? `rating=${query.rating[0]},${query.rating[1]}&` : '';

              const {data} = await api.get<Training[]>(
                `${APIRoute.CoachTraining}/show/list?${limit}${page}${priceQuery}${caloriesQuery}${trainingTimeQuery}${rating}`);
              return data;
            } catch (error) {
              return Promise.reject(error);
            }
          });

export const fetchCoachOtherTrainings = createAsyncThunk<Training[], string, {
            dispatch: AppDispatch;
            state: State;
            extra: AxiosInstance; }>(
              Action.FETCH_COACH_OTHER_TRAININGS,
              async (id, {extra: api}) => {
                try {
                  const {data} = await api.get<Training[]>(`${APIRoute.Training}/coach/${id}`);
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
          async (id, {extra: api}) => {
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
              async (id, {extra: api}) => {
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
                async (newComment, {extra: api}) => {
                  try {
                    const {message, ratingTraining, userId, trainingId } = newComment;
                    const {data} = await api.post<Comment>(`${APIRoute.Training}/comments/create/${trainingId}`, {message, ratingTraining, userId});
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
               try {
                 const { data } = await api.post<Training>(`${APIRoute.CoachTraining}/create`, newtraining);
                 if (data && newtraining.fileVideoTraning?.name) {
                   const postCertificateApiRoute = `${APIRoute.Files}/video/training/${data.id}`;
                   await api.post(postCertificateApiRoute, adaptVideoToServer(newtraining.fileVideoTraning));
                 }
                 const countTrainInQueue = await api.get<number>(`${APIRoute.Coach}/notify/training/count`);

                 if (countTrainInQueue.data >= COUNT_TRAINING_FOR_SEND) {
                   await api.get<Training>(`${APIRoute.Coach}/notify/newtraining`);
                 }

                 dispatch(redirectToRoute(`${AppRoute.AccountCoach}/trainings`));

                 return data;
               } catch (error) {
                 return Promise.reject(error);
               }
             });

export const editTraining = createAsyncThunk<Training, Training, {
          dispatch: AppDispatch;
          state: State;
          extra: AxiosInstance;
         }>(
           Action.EDIT_TRAINING,
           async (training, { extra: api }) => {
             if (training.fileVideoTraning?.name) {
               const postVideoApiRoute = `${APIRoute.Files}/video/training/${training.id}`;
               await api.post(postVideoApiRoute, adaptVideoToServer(training.fileVideoTraning));
             }
             const { data } = await api.post<Training>(`${APIRoute.CoachTraining}/edit/${training.id}`, training);
             return data;
           });

export const fetchUserTrainings = createAsyncThunk<Training[], UserFullInfo, {
              dispatch: AppDispatch;
              state: State;
              extra: AxiosInstance; }>(
                Action.FETCH_USER_TRAININGS,
                async (userFullInfo, {dispatch, extra: api}) => {
                  try {
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
export const fetchCountTrainings = createAsyncThunk<TotalTrainInfo, UserRole, {
                  dispatch: AppDispatch;
                  state: State;
                  extra: AxiosInstance; }>(
                    Action.FETCH_COUNT_TRAININGS,
                    async (role, {dispatch, extra: api}) => {
                      try {
                        if (role === UserRole.User) {
                          const {data} = await api.get<TotalTrainInfo>(`${APIRoute.Training}/count`);
                          return data;
                        }
                        const {data} = await api.get<TotalTrainInfo>(`${APIRoute.CoachTraining}/show/count`);
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
                    const limit = query && query.limit ? `limit=${query.limit}&` : `limit=${DEFAULT_LIMIT}&`;
                    const page = query && query.page ? `page=${query.page}&` : 'page=1&';
                    const priceQuery = query && query.price ? `price=${query.price[0]},${query.price[1]}&` : '';
                    const caloriesQuery = query && query.caloriesReset ? `caloriesReset=${query.caloriesReset[0]},${query.caloriesReset[1]}&` : '';
                    const trainingTimeQuery = query && query.trainingTime ? `trainingTime=${query.trainingTime.join(',').trim()}&` : '';
                    const trainingTypeQuery = query && query.trainingType ? `trainingType=${query.trainingType.join(',').trim()}&` : '';
                    const rating = query && query.rating ? `rating=${query.rating[0]},${query.rating[1]}&` : '';
                    const sortPrice = query && query.sortPrice ? `sortPrice=${query.sortPrice}&` : '';
                    const {data} = await api.get<Training[]>(
                      `${APIRoute.Training}/catalog?${limit}${page}${priceQuery}${caloriesQuery}${trainingTimeQuery}${trainingTypeQuery}${rating}${sortPrice}`
                    );
                    return data;
                  } catch (error) {
                    return Promise.reject(error);
                  }
                });
