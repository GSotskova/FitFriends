import {Action} from 'redux';
import thunk, {ThunkDispatch} from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {createAPI} from '../services/api';
import {APIRoute} from '../constants';
import {State} from '../types/state';
import { makeFakeOrder} from '../utils/mocks';
import { UserRole } from '../types/user';
import { fetchCountOrders } from './api-actions-order';

describe('Async actions', () => {
  const api = createAPI();
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
      State,
      Action<string>,
      ThunkDispatch<State, typeof api, Action>
    >(middlewares);

  it('should dispatch fetchCountOrders', async () => {
    const makeFakeOrders = Array.from({length: 5}, () => makeFakeOrder());
    mockAPI
      .onGet(`${APIRoute.Coach}/orders/count`)
      .reply(200, makeFakeOrders);

    const store = mockStore();

    await store.dispatch(fetchCountOrders(UserRole.Coach));
    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchCountOrders.pending.type,
      fetchCountOrders.fulfilled.type
    ]);
  });
});
