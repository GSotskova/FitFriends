import {NameSpace} from '../../constants';
import { Notify } from '../../types/notify';
import {State} from '../../types/state';


export const getNotifications = (state: State): Notify[] => state[NameSpace.DataNotify].notifications;
export const getErrorDeleteNotify = (state: State): boolean => state[NameSpace.DataNotify].hasErrorDeleteNotify;
export const getSignNotifyLoad = (state: State): boolean => state[NameSpace.DataNotify].isNotifyLoad;
export const getSignNotifyLoadDelete = (state: State): boolean => state[NameSpace.DataNotify].isNotifyLoadDelete;
