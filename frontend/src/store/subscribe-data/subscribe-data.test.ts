import {subscribeData} from './subscribe-data';
import {SubscribeData} from '../../types/state';
import {deleteSubscribe, createSubscribe} from '../api-actions-user';

describe('Reducer: subscribe', () => {
  let state: SubscribeData;

  beforeEach(() => {
    state = {
      hasErrorPost: false,
      hasErrorDelete: false,
      isSubscrLoadPost: false,
      isSubscrLoadDelete: false
    };
  });

  it('without additional parameters should return initial state', () => {
    expect(subscribeData.reducer(undefined, {type: 'UNKNOWN_ACTION'}))
      .toEqual({hasErrorPost: false, hasErrorDelete: false,
        isSubscrLoadPost: false, isSubscrLoadDelete: false});
  });

  describe('deleteSubscribe test', () => {
    it('deleteSubscribe fulfilled test', () => {
      expect(subscribeData.reducer(state , {type: deleteSubscribe.fulfilled.type}))
        .toEqual({hasErrorPost: false, hasErrorDelete: false,
          isSubscrLoadPost: false, isSubscrLoadDelete: false});
    });
    it('deleteSubscribe rejected test', () => {
      expect(subscribeData.reducer(state, { type: deleteSubscribe.rejected.type }))
        .toEqual({hasErrorPost: false, hasErrorDelete: true,
          isSubscrLoadPost: false, isSubscrLoadDelete: false});
    });
  });

  describe('createSubscribe test', () => {
    it('createSubscribe fulfilled test', () => {
      expect(subscribeData.reducer(state , {type: createSubscribe.fulfilled}))
        .toEqual({hasErrorPost: false, hasErrorDelete: false,
          isSubscrLoadPost: false, isSubscrLoadDelete: false});
    });
    it('createSubscribe rejected test', () => {
      expect(subscribeData.reducer(state, { type: createSubscribe.rejected.type }))
        .toEqual({hasErrorPost: true, hasErrorDelete: false,
          isSubscrLoadPost: false, isSubscrLoadDelete: false});
    });
  });
});
