import {friendsData} from './friends-data';
import {FriendData} from '../../types/state';
import {fetchCoachFriends, postFriend, deleteFriend} from '../api-actions-friends';
import {makeFakeFriend} from '../../utils/mocks';

describe('Reducer: friends', () => {
  let state: FriendData;

  beforeEach(() => {
    state = {
      friends: [],
      countFiends: 0,
      isCountDataLoading: false,
      isFriendsDataLoading: false,
      hasError: false,
      hasErrorPost: false,
      isFriendLoadDelete: false,
      isFriendLoadPost: false
    };
  });

  it('without additional parameters should return initial state', () => {
    expect(friendsData.reducer(undefined, {type: 'UNKNOWN_ACTION'}))
      .toEqual({friends: [], countFiends: 0, isCountDataLoading: false,
        isFriendsDataLoading: false, hasError: false, hasErrorPost: false,
        isFriendLoadDelete: false, isFriendLoadPost: false});
  });

  describe('fetchCoachFriends test', () => {
    it('fetchCoachFriends fulfilled test', () => {
      const fakeFriends = Array.from({length: 5}, () => makeFakeFriend());
      expect(friendsData.reducer(state, { type: fetchCoachFriends.fulfilled, payload: fakeFriends}))
        .toEqual({friends:fakeFriends, countFiends: 0, isCountDataLoading: false,
          isFriendsDataLoading: false, hasError: false, hasErrorPost: false,
          isFriendLoadDelete: false, isFriendLoadPost: false});
    });
    it('fetchCoachFriends rejected test', () => {
      expect(friendsData.reducer(state, { type: fetchCoachFriends.rejected.type }))
        .toEqual({friends: [], countFiends: 0, isCountDataLoading: false,
          isFriendsDataLoading: false, hasError: true, hasErrorPost: false,
          isFriendLoadDelete: false, isFriendLoadPost: false});
    });
  });

  describe('postFriend test', () => {
    it('postFriend fulfilled test', () => {
      const fakeFriends = Array.from({length: 5}, () => makeFakeFriend());
      const fakeFriend = makeFakeFriend();
      expect(friendsData.reducer({...state, friends: fakeFriends} , {type: postFriend.fulfilled, payload: fakeFriend}))
        .toEqual({friends: [...fakeFriends, fakeFriend], countFiends: 0, isCountDataLoading: false,
          isFriendsDataLoading: false, hasError: false, hasErrorPost: false,
          isFriendLoadDelete: false, isFriendLoadPost: false});
    });
    it('postFriend rejected test', () => {
      expect(friendsData.reducer(state, { type: postFriend.rejected.type }))
        .toEqual({friends: [], countFiends: 0, isCountDataLoading: false,
          isFriendsDataLoading: false, hasError: false, hasErrorPost: true,
          isFriendLoadDelete: false, isFriendLoadPost: false});
    });
  });

  describe('deleteFriend test', () => {
    it('deleteFriend fulfilled test', () => {
      const fakeFriends = Array.from({length: 5}, () => makeFakeFriend());
      const fakeFriend = makeFakeFriend();
      const updFriends = fakeFriends.filter((friend) => friend.id !== fakeFriend.id);
      expect(friendsData.reducer({...state, friends: fakeFriends} , {type: deleteFriend.fulfilled, payload: fakeFriend}))
        .toEqual({friends: updFriends, countFiends: 0, isCountDataLoading: false,
          isFriendsDataLoading: false, hasError: false, hasErrorPost: false,
          isFriendLoadDelete: false, isFriendLoadPost: false});
    });
    it('deleteFriend rejected test', () => {
      expect(friendsData.reducer(state, { type: deleteFriend.rejected.type }))
        .toEqual({friends: [], countFiends: 0, isCountDataLoading: false,
          isFriendsDataLoading: false, hasError: false, hasErrorPost: true,
          isFriendLoadDelete: false, isFriendLoadPost: false});
    });
  });
});
