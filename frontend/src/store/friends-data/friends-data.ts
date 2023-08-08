import {createSlice} from '@reduxjs/toolkit';
import {NameSpace} from '../../constants';
import {FriendData} from '../../types/state';
import {deleteFriend, fetchCoachFriends, postFriend, fetchUserFriends, fetchCountFriends, deleteCoachFriend} from '../api-actions-friends';

const initialState: FriendData = {
  friends: [],
  countFiends: 0,
  isCountDataLoading: false,
  isFriendsDataLoading: false,
  hasError: false,
  hasErrorPost: false,
  isFriendLoadDelete: false,
  isFriendLoadPost: false
};


export const friendsData = createSlice({
  name: NameSpace.DataFriends,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchCoachFriends.pending, (state) => {
        state.isFriendsDataLoading = true;
        state.hasError = false;
      })
      .addCase(fetchCoachFriends.fulfilled, (state, action) => {
        state.friends = action.payload;
        state.isFriendsDataLoading = false;
      })
      .addCase(fetchCoachFriends.rejected, (state) => {
        state.isFriendsDataLoading = false;
        state.hasError = true;
      })
      .addCase(fetchUserFriends.pending, (state) => {
        state.isFriendsDataLoading = true;
        state.hasError = false;
      })
      .addCase(fetchUserFriends.fulfilled, (state, action) => {
        state.friends = action.payload;
        state.isFriendsDataLoading = false;
      })
      .addCase(fetchUserFriends.rejected, (state) => {
        state.isFriendsDataLoading = false;
        state.hasError = true;
      })
      .addCase(fetchCountFriends.pending, (state) => {
        state.isCountDataLoading = true;
        state.hasError = false;
      })
      .addCase(fetchCountFriends.fulfilled, (state, action) => {
        state.countFiends = action.payload;
        state.isCountDataLoading = false;
      })
      .addCase(fetchCountFriends.rejected, (state) => {
        state.isCountDataLoading = false;
        state.hasError = true;
      })
      .addCase(postFriend.pending, (state) => {
        state.isFriendLoadPost = true;
      })
      .addCase(postFriend.fulfilled, (state, action) => {
        state.friends.push(action.payload);
        state.hasErrorPost = false;
        state.isFriendLoadPost = false;
      })
      .addCase(postFriend.rejected, (state) => {
        state.hasErrorPost = true;
        state.isFriendLoadPost = false;
      })
      .addCase(deleteFriend.pending, (state) => {
        state.hasErrorPost = false;
        state.isFriendLoadDelete = true;
      })
      .addCase(deleteFriend.fulfilled, (state, action) => {
        const updatedFriend = action.payload;
        state.friends = state.friends.filter((friend) => friend.id !== updatedFriend.id);
        state.isFriendLoadDelete = false;
      })
      .addCase(deleteFriend.rejected, (state) => {
        state.hasErrorPost = true;
        state.isFriendLoadDelete = false;
      })
      .addCase(deleteCoachFriend.pending, (state) => {
        state.hasErrorPost = false;
        state.isFriendLoadDelete = true;
      })
      .addCase(deleteCoachFriend.fulfilled, (state, action) => {
        const updatedFriend = action.payload;
        state.friends = state.friends.filter((friend) => friend.id !== updatedFriend.id);
        state.isFriendLoadDelete = false;
      })
      .addCase(deleteCoachFriend.rejected, (state) => {
        state.hasErrorPost = true;
        state.isFriendLoadDelete = false;
      });
  }
});

