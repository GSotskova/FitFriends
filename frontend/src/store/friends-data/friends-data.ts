import {createSlice} from '@reduxjs/toolkit';
import {NameSpace} from '../../constants';
import {FriendData} from '../../types/state';
import {deleteFriend, fetchCoachFriends, postFriend} from '../api-actions';

const initialState: FriendData = {
  friends: [],
  isFriendsDataLoading: false,
  hasError: false,
  hasErrorPost: false
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
      .addCase(postFriend.fulfilled, (state, action) => {
        state.friends.push(action.payload);
        state.hasErrorPost = false;
      })
      .addCase(postFriend.rejected, (state) => {
        state.hasErrorPost = true;
      })
      .addCase(deleteFriend.fulfilled, (state, action) => {
        const updatedFriend = action.payload;
        state.friends = state.friends.filter((friend) => friend.id !== updatedFriend.id);
      });
  }
});

