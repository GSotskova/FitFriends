import {Action} from 'redux';
import thunk, {ThunkDispatch} from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {createAPI} from '../services/api';
import {APIRoute} from '../constants';
import {State} from '../types/state';
import { makeFakeNotify} from '../utils/mocks';
import { fetchNotify } from './api-actions-request';

describe('Async actions', () => {
  const api = createAPI();
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
      State,
      Action<string>,
      ThunkDispatch<State, typeof api, Action>
    >(middlewares);

  it('should dispatch fetchNotify', async () => {
    const makeFakeNotifys = Array.from({length: 5}, () => makeFakeNotify());
    mockAPI
      .onGet(`${APIRoute.Users}/notify/show`)
      .reply(200, makeFakeNotifys);

    const store = mockStore();

    await store.dispatch(fetchNotify());
    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchNotify.pending.type,
      fetchNotify.fulfilled.type
    ]);
  });
});
