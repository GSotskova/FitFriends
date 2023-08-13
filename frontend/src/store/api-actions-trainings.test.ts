import {Action} from 'redux';
import thunk, {ThunkDispatch} from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {createAPI} from '../services/api';
import {fetchCoachTrainings} from './api-actions-trainings';
import {APIRoute} from '../constants';
import {State} from '../types/state';
import { makeFakeTraining, makeFakeUser, makeFakeUserFullInfo } from '../utils/mocks';

describe('Async actions', () => {
  const api = createAPI();
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
      State,
      Action<string>,
      ThunkDispatch<State, typeof api, Action>
    >(middlewares);

  it('should dispatch Load_Users when GET /trainings', async () => {
    const makeFakeTrainings = Array.from({length: 5}, () => makeFakeTraining());
    mockAPI
      .onGet(APIRoute.CoachTraining)
      .reply(200, makeFakeTrainings);

    const store = mockStore();

    await store.dispatch(fetchCoachTrainings());
    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchCoachTrainings.pending.type,
      fetchCoachTrainings.fulfilled.type
    ]);
  });
});
