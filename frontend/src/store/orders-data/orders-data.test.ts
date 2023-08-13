import {ordersData} from './orders-data';
import {OrderData} from '../../types/state';
import {fetchCoachOrders, postOrder, reduceOrder} from '../api-actions-order';
import {makeFakeOrder} from '../../utils/mocks';

describe('Reducer: order', () => {
  let state: OrderData;

  beforeEach(() => {
    state = {
      orders: [],
      order: null,
      isOrdersDataLoading: false,
      isOrderDataLoading: false,
      isOrdersUserDataLoading: false,
      hasError: false,
      hasErrorPost: false,
      isPostLoading: false,
      hasErrorReduce: false,
      countOrders: 0
    };
  });

  it('without additional parameters should return initial state', () => {
    expect(ordersData.reducer(undefined, {type: 'UNKNOWN_ACTION'}))
      .toEqual({orders: [], order: null, isOrdersDataLoading: false,
        isOrderDataLoading: false, isOrdersUserDataLoading: false,
        hasError: false, hasErrorPost: false, isPostLoading: false,
        hasErrorReduce: false, countOrders: 0});
  });

  describe('fetchCoachOrders test', () => {
    it('fetchCoachOrders fulfilled test', () => {
      const fakeOrders = Array.from({length: 5}, () => makeFakeOrder());
      expect(ordersData.reducer(state, { type: fetchCoachOrders.fulfilled, payload: fakeOrders}))
        .toEqual({orders: fakeOrders, order: null, isOrdersDataLoading: false,
          isOrderDataLoading: false, isOrdersUserDataLoading: false,
          hasError: false, hasErrorPost: false, isPostLoading: false,
          hasErrorReduce: false, countOrders: 0});
    });
    it('fetchCoachOrders rejected test', () => {
      expect(ordersData.reducer(state, { type: fetchCoachOrders.rejected.type }))
        .toEqual({orders: [], order: null, isOrdersDataLoading: false,
          isOrderDataLoading: false, isOrdersUserDataLoading: false,
          hasError: true, hasErrorPost: false, isPostLoading: false,
          hasErrorReduce: false, countOrders: 0});
    });
  });

  describe('postOrder test', () => {
    it('postOrder fulfilled test', () => {
      const fakeOrders = Array.from({length: 5}, () => makeFakeOrder());
      const fakeOrder = makeFakeOrder();
      expect(ordersData.reducer({...state, orders: fakeOrders} , {type: postOrder.fulfilled, payload: fakeOrder}))
        .toEqual({orders: [...fakeOrders, fakeOrder], order: null, isOrdersDataLoading: false,
          isOrderDataLoading: false, isOrdersUserDataLoading: false,
          hasError: false, hasErrorPost: false, isPostLoading: false,
          hasErrorReduce: false, countOrders: 0});
    });
    it('postOrder rejected test', () => {
      expect(ordersData.reducer(state, { type: postOrder.rejected.type }))
        .toEqual({orders: [], order: null, isOrdersDataLoading: false,
          isOrderDataLoading: false, isOrdersUserDataLoading: false,
          hasError: false, hasErrorPost: true, isPostLoading: false,
          hasErrorReduce: false, countOrders: 0});
    });
  });

  describe('reduceOrder test', () => {
    it('reduceOrder fulfilled test', () => {
      const fakeOrders = Array.from({length: 5}, () => makeFakeOrder());
      const restCount = fakeOrders[1].trainingRestCount;
      const doneCount = fakeOrders[1].trainingDoneCount;
      const fakeOrder = {...fakeOrders[1],
        trainingRestCount : fakeOrders[1].isDone ? restCount - 1 : 0,
        trainingDoneCount : fakeOrders[1].isDone ? doneCount - 1 : 0,
        totalPrice : fakeOrders[1].price * restCount,
        isDone: restCount === 0
      };
      const updFakeOrders = fakeOrders.map((order) => order.id === fakeOrder.id ? fakeOrder : order);
      expect(ordersData.reducer({...state, orders: fakeOrders} , {type: reduceOrder.fulfilled, payload: fakeOrder}))
        .toEqual({orders: updFakeOrders, order: null, isOrdersDataLoading: false,
          isOrderDataLoading: false, isOrdersUserDataLoading: false,
          hasError: false, hasErrorPost: false, isPostLoading: false,
          hasErrorReduce: false, countOrders: 0});
    });
    it('reduceOrder rejected test', () => {
      expect(ordersData.reducer(state, { type: reduceOrder.rejected.type }))
        .toEqual({orders: [], order: null, isOrdersDataLoading: false,
          isOrderDataLoading: false, isOrdersUserDataLoading: false,
          hasError: false, hasErrorPost: false, isPostLoading: false,
          hasErrorReduce: true, countOrders: 0});
    });
  });
});
