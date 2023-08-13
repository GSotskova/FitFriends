import {notifyData} from './notify-data';
import {NotifyData} from '../../types/state';
import {fetchNotify, deleteNotify} from '../api-actions-request';
import {makeFakeNotify} from '../../utils/mocks';

describe('Reducer: notify', () => {
  let state: NotifyData;

  beforeEach(() => {
    state = {
      notifications: [],
      hasErrorDeleteNotify: false,
      isNotifyLoad: false,
      isNotifyLoadDelete: false
    };
  });

  it('without additional parameters should return initial state', () => {
    expect(notifyData.reducer(undefined, {type: 'UNKNOWN_ACTION'}))
      .toEqual({notifications: [], hasErrorDeleteNotify: false,
        isNotifyLoad: false, isNotifyLoadDelete: false});
  });

  describe('fetchNotify test', () => {
    it('fetchNotify fulfilled test', () => {
      const fakeNotifys = Array.from({length: 5}, () => makeFakeNotify());
      expect(notifyData.reducer(state, { type: fetchNotify.fulfilled, payload: fakeNotifys}))
        .toEqual({notifications: fakeNotifys, hasErrorDeleteNotify: false,
          isNotifyLoad: false, isNotifyLoadDelete: false});
    });
    it('fetchNotify rejected test', () => {
      expect(notifyData.reducer(state, { type: fetchNotify.rejected.type }))
        .toEqual({notifications: [], hasErrorDeleteNotify: false,
          isNotifyLoad: false, isNotifyLoadDelete: false});
    });
  });

  describe('deleteNotify test', () => {
    it('deleteNotify fulfilled test', () => {
      const fakeNotifications = Array.from({length: 5}, () => makeFakeNotify());
      const fakeNotify = makeFakeNotify();
      const updNotifications = fakeNotifications.filter((friend) => friend.id !== fakeNotify.id);
      expect(notifyData.reducer({...state, notifications: fakeNotifications} , {type: deleteNotify.fulfilled, payload: fakeNotify}))
        .toEqual({notifications: updNotifications, hasErrorDeleteNotify: false,
          isNotifyLoad: false, isNotifyLoadDelete: false});
    });
    it('deleteNotify rejected test', () => {
      expect(notifyData.reducer(state, { type: deleteNotify.rejected.type }))
        .toEqual({notifications: [], hasErrorDeleteNotify: true,
          isNotifyLoad: false, isNotifyLoadDelete: false});
    });
  });
});
