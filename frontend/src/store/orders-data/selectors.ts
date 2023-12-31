import {NameSpace} from '../../constants';
import {State} from '../../types/state';
import {Order} from '../../types/order';


export const getOrders = (state: State): Order[] => state[NameSpace.DataOrders].orders;
export const getCountOrders = (state: State): number => state[NameSpace.DataOrders].countOrders;
export const getOrdersDataLoadingStatus = (state: State): boolean => state[NameSpace.DataOrders].isOrdersDataLoading;
export const getOrdersUserLoadingStatus = (state: State): boolean => state[NameSpace.DataOrders].isOrdersUserDataLoading;
export const getErrorStatus = (state: State): boolean => state[NameSpace.DataOrders].hasError;
export const getErrorPost = (state: State): boolean => state[NameSpace.DataOrders].hasErrorPost;
export const getLoadingPost = (state: State): boolean => state[NameSpace.DataOrders].isPostLoading;
export const getOrder = (state: State): Order | null => state[NameSpace.DataOrders].order;
export const getOrderLoadingStatus = (state: State): boolean => state[NameSpace.DataOrders].isOrderDataLoading;
