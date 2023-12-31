import {Action} from 'redux';
import thunk, {ThunkDispatch} from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {createAPI} from '../services/api';
import {deleteCoachFriend} from './api-actions-coach';
import {APIRoute} from '../constants';
import {State} from '../types/state';
import { makeFakeFriend } from '../utils/mocks';

describe('Async actions', () => {
  const api = createAPI();
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
      State,
      Action<string>,
      ThunkDispatch<State, typeof api, Action>
    >(middlewares);

  it('should dispatch deleteCoachFriend', async () => {
    const fakeFriend = makeFakeFriend();
    const store = mockStore();
    mockAPI
      .onPost(`${APIRoute.Coach}/friends/delete/${fakeFriend.id}`)
      .reply(200, fakeFriend);

    await store.dispatch(deleteCoachFriend(fakeFriend.id));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      deleteCoachFriend.pending.type,
      deleteCoachFriend.fulfilled.type
    ]);
  });

});
