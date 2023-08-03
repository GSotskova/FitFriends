import {createSlice} from '@reduxjs/toolkit';
import {NameSpace} from '../../constants';
import {RequestData} from '../../types/state';
import {acceptRequest, deleteRequest, createRequest} from '../api-actions';

const initialState: RequestData = {
  hasErrorPost: false,
  hasErrorDelete: false,
  isLoadPost: false,
  isLoadDelete: false
};


export const requestData = createSlice({
  name: NameSpace.DataOrders,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(acceptRequest.fulfilled, (state) => {
        state.hasErrorPost = false;
      })
      .addCase(acceptRequest.rejected, (state) => {
        state.hasErrorPost = true;
      })
      .addCase(deleteRequest.pending, (state) => {
        state.hasErrorDelete = false;
        state.isLoadDelete = true;
      })
      .addCase(deleteRequest.fulfilled, (state) => {
        state.hasErrorDelete = false;
        state.isLoadDelete = false;
      })
      .addCase(deleteRequest.rejected, (state) => {
        state.hasErrorDelete = true;
        state.isLoadDelete = false;
      })
      .addCase(createRequest.pending, (state) => {
        state.hasErrorPost = false;
        state.isLoadPost = true;
      })
      .addCase(createRequest.fulfilled, (state) => {
        state.hasErrorPost = false;
        state.isLoadPost = false;
      })
      .addCase(createRequest.rejected, (state) => {
        state.hasErrorPost = true;
        state.isLoadPost = false;
      });
  }
});

