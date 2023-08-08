import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, State} from '../types/state';
import {APIRoute} from '../constants';
import { StatusRequest, TrainingRequest } from '../types/training';
import { Notify } from '../types/notify';
import { fetchCoachFriends } from './api-actions-friends';

export const Action = {
  CREATE_REQUEST:  'request/createRequest',
  ACCEPT_REQUEST:  'request/acceptRequest',
  REJECT_REQUEST:  'request/deleteRequest',
  FETCH_NOTIFY:  'notify/fetchNotify',
  DELETE_NOTIFY:  'notify/deleteNotify',
};

export const createRequest = createAsyncThunk<void, TrainingRequest, {
                dispatch: AppDispatch;
                state: State;
                extra: AxiosInstance; }>(
                  Action.CREATE_REQUEST,
                  async (trainingRequest, {dispatch, extra: api}) => {
                    try {
                      await api.post(`${APIRoute.User}/request/training/create`,trainingRequest);
                      dispatch(fetchCoachFriends());
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


export const fetchNotify = createAsyncThunk<Notify[], undefined, {
         dispatch: AppDispatch;
         state: State;
         extra: AxiosInstance; }>(
           Action.FETCH_NOTIFY,
           async (_arg, {extra: api}) => {
             try {
               const {data} = await api.get<Notify[]>(`${APIRoute.Users}/notify/show`);
               return data;
             } catch (error) {
               return Promise.reject(error);
             }
           });

export const deleteNotify = createAsyncThunk<void, string, {
            dispatch: AppDispatch;
            state: State;
            extra: AxiosInstance; }>(
              Action.DELETE_NOTIFY,
              async (id, {extra: api}) => {
                try {
                  await api.delete(`${APIRoute.Users}/notify/delete/${id}`);

                } catch (error) {
                  return Promise.reject(error);
                }
              });
