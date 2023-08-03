import {createSlice} from '@reduxjs/toolkit';
import {NameSpace} from '../../constants';
import {SubscribeData} from '../../types/state';
import {createSubscribe, deleteSubscribe} from '../api-actions';

const initialState: SubscribeData = {
  hasErrorPost: false,
  hasErrorDelete: false,
  isSubscrLoadPost: false,
  isSubscrLoadDelete: false
};


export const subscribeData = createSlice({
  name: NameSpace.DataSubscribe,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(createSubscribe.pending, (state) => {
        state.hasErrorPost = false;
        state.isSubscrLoadPost = true;
      })
      .addCase(createSubscribe.fulfilled, (state) => {
        state.hasErrorPost = false;
        state.isSubscrLoadPost = false;
      })
      .addCase(createSubscribe.rejected, (state) => {
        state.hasErrorPost = true;
        state.isSubscrLoadPost = false;
      })
      .addCase(deleteSubscribe.pending, (state) => {
        state.hasErrorDelete = false;
        state.isSubscrLoadDelete = true;
      })
      .addCase(deleteSubscribe.fulfilled, (state) => {
        state.hasErrorDelete = false;
        state.isSubscrLoadDelete = false;
      })
      .addCase(deleteSubscribe.rejected, (state) => {
        state.hasErrorDelete = true;
        state.isSubscrLoadDelete = false;
      });
  }
});

