import {createSlice} from '@reduxjs/toolkit';
import {NameSpace} from '../../constants';
import {RequestData} from '../../types/state';
import {acceptRequest, deleteRequest} from '../api-actions';

const initialState: RequestData = {
  hasErrorPost: false
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
      .addCase(deleteRequest.fulfilled, (state) => {
        state.hasErrorPost = false;
      })
      .addCase(deleteRequest.rejected, (state) => {
        state.hasErrorPost = true;
      });
  }
});

