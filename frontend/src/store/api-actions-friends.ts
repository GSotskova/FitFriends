import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, State} from '../types/state';
import {APIRoute, DEFAULT_LIMIT} from '../constants';
import { UserFullInfo, UserRole, Friend } from '../types/user';
import { Query } from '../types/training';

export const Action = {
  FETCH_COACH_FRIENDS:  'friends/fetchCoachFriends',
  FETCH_COUNT_USER_FRIENDS:  'friends/fetchCountFriends',
  FETCH_USER_FRIENDS:  'friends/fetchUserFriends',
  DELETE_USER_FRIEND:  'friends/deleteFriend',
  DELETE_COACH_FRIEND:  'friends/deleteCoachFriend',
  POST_FRIEND:  'friends/postFriend'
};


export const fetchCoachFriends = createAsyncThunk<Friend[], Query | undefined, {
            dispatch: AppDispatch;
            state: State;
            extra: AxiosInstance; }>(
              Action.FETCH_COACH_FRIENDS,
              async (query, {extra: api}) => {
                try {
                  const limit = query && query.limit ? `limit=${query.limit}&` : `limit=${DEFAULT_LIMIT}&`;
                  const page = query && query.page ? `page=${query.page}&` : 'page=1';
                  const {data} = await api.get<Friend[]>(`${APIRoute.Coach}/friends/show?${limit}${page}`);
                  return data;
                } catch (error) {
                  return Promise.reject(error);
                }
              });

export const fetchCountFriends = createAsyncThunk<number, UserRole, {
                dispatch: AppDispatch;
                state: State;
                extra: AxiosInstance; }>(
                  Action.FETCH_COUNT_USER_FRIENDS,
                  async (role, {extra: api}) => {
                    try {
                      if (role === UserRole.User) {
                        const {data} = await api.get<number>(`${APIRoute.User}/friends/count`);
                        return data;
                      }
                      const {data} = await api.get<number>(`${APIRoute.Coach}/friends/count`);
                      return data;

                    } catch (error) {
                      return Promise.reject(error);
                    }
                  });

export const fetchUserFriends = createAsyncThunk<Friend[], Query | undefined, {
                dispatch: AppDispatch;
                state: State;
                extra: AxiosInstance; }>(
                  Action.FETCH_USER_FRIENDS,
                  async (query, {extra: api}) => {
                    try {
                      const limit = query && query.limit ? `limit=${query.limit}&` : `limit=${DEFAULT_LIMIT}&`;
                      const page = query && query.page ? `page=${query.page}&` : 'page=1';
                      const {data} = await api.get<Friend[]>(`${APIRoute.User}/friends/show?${limit}${page}`);
                      return data;
                    } catch (error) {
                      return Promise.reject(error);
                    }
                  });

export const deleteFriend = createAsyncThunk<Friend, string, {
              dispatch: AppDispatch;
              state: State;
              extra: AxiosInstance; }>(
                Action.DELETE_USER_FRIEND,
                async (id, {extra: api}) => {
                  try {
                    const {data} = await api.post<Friend>(`${APIRoute.User}/friends/delete/${id}`);
                    return data;
                  } catch (error) {
                    return Promise.reject(error);
                  }
                });

export const deleteCoachFriend = createAsyncThunk<Friend, string, {
                  dispatch: AppDispatch;
                  state: State;
                  extra: AxiosInstance; }>(
                    Action.DELETE_COACH_FRIEND,
                    async (id, {extra: api}) => {
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
                async (id, {extra: api}) => {
                  try {
                    const {data} = await api.post<Friend>(`${APIRoute.User}/friends/add/${id}`);
                    return data;
                  } catch (error) {
                    return Promise.reject(error);
                  }
                });

