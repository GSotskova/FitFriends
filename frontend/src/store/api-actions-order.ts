import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, State} from '../types/state';
import {APIRoute, ORDERS_LIMIT} from '../constants';
import { UserRole } from '../types/user';
import {Query} from '../types/training';
import { NewOrder, Order } from '../types/order';

export const Action = {
  FETCH_COUNT_ORDERS:  'order/fetchCountOrders',
  FETCH_COACH_ORDERS:  'order/fetchCoachOrders',
  FETCH_USER_ORDERS:  'order/fetchUserOrders',
  FETCH_USER_ORDER:  'order/fetchUserOrder',
  POST_ORDER:  'order/postOrder',
  REDUCE_ORDER:  'order/reduceOrder'
};


export const fetchCountOrders = createAsyncThunk<number, UserRole, {
                  dispatch: AppDispatch;
                  state: State;
                  extra: AxiosInstance; }>(
                    Action.FETCH_COUNT_ORDERS,
                    async (role, {extra: api}) => {
                      try {
                        if (role === UserRole.Coach) {
                          const {data} = await api.get<number>(`${APIRoute.Coach}/orders/count`);
                          return data;
                        }
                        const {data} = await api.get<number>(`${APIRoute.User}/orders/count`);
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
                async (sortData, {extra: api}) => {
                  try {
                    const sort = sortData ? sortData : `limit=${ORDERS_LIMIT}&page=1`;
                    const {data} = await api.get<Order[]>(`${APIRoute.Coach}/orders?${sort}`);
                    return data;
                  } catch (error) {
                    return Promise.reject(error);
                  }
                });


export const fetchUserOrders = createAsyncThunk<Order[], Query | undefined, {
                  dispatch: AppDispatch;
                  state: State;
                  extra: AxiosInstance; }>(
                    Action.FETCH_USER_ORDERS,
                    async (query, {extra: api}) => {
                      try {
                        const limit = query && query.limit ? `limit=${query.limit}&` : `limit=${ORDERS_LIMIT}`;
                        const page = query && query.page ? `page=${query.page}&` : 'page=1';
                        const isDone = query && query.isDone ? `isDone=${query.isDone}` : '';
                        const {data} = await api.get<Order[]>(`${APIRoute.User}/orders?${limit}${page}${isDone}`);
                        return data;
                      } catch (error) {
                        return Promise.reject(error);
                      }
                    });

export const fetchUserOrder = createAsyncThunk<Order, string, {
                  dispatch: AppDispatch;
                  state: State;
                  extra: AxiosInstance; }>(
                    Action.FETCH_USER_ORDER,
                    async (id, {extra: api}) => {
                      try {
                        const {data} = await api.get<Order>(`${APIRoute.User}/order/${id}`);
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
                  async (newOrder, {extra: api}) => {
                    try {
                      const {data} = await api.post<Order>(`${APIRoute.User}/orders/create`, newOrder);
                      return data;
                    } catch (error) {
                      return Promise.reject(error);
                    }
                  });

export const reduceOrder = createAsyncThunk<Order, string, {
                dispatch: AppDispatch;
                state: State;
                extra: AxiosInstance; }>(
                  Action.REDUCE_ORDER,
                  async (id, {extra: api}) => {
                    try {
                      const {data} = await api.post<Order>(`${APIRoute.User}/orders/reduce/${id}`);
                      return data;
                    } catch (error) {
                      return Promise.reject(error);
                    }
                  });
