import {createSlice} from '@reduxjs/toolkit';
import {NameSpace} from '../../constants';
import {OrderData} from '../../types/state';
import {fetchCoachOrders, postOrder} from '../api-actions';

const initialState: OrderData = {
  orders: [],
  isOrdersDataLoading: false,
  hasError: false,
  hasErrorPost: false
};


export const ordersData = createSlice({
  name: NameSpace.DataOrders,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchCoachOrders.pending, (state) => {
        state.isOrdersDataLoading = true;
        state.hasError = false;
      })
      .addCase(fetchCoachOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.isOrdersDataLoading = false;
      })
      .addCase(fetchCoachOrders.rejected, (state) => {
        state.isOrdersDataLoading = false;
        state.hasError = true;
      })
      .addCase(postOrder.fulfilled, (state, action) => {
        state.orders.push(action.payload);
        state.hasErrorPost = false;
      })
      .addCase(postOrder.rejected, (state) => {
        state.hasErrorPost = true;
      });
  }
});

