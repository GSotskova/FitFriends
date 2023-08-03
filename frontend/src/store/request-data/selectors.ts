import {NameSpace} from '../../constants';
import {State} from '../../types/state';


export const getErrorPost = (state: State): boolean => state[NameSpace.DataRequest].hasErrorPost;
export const getErrorDelete = (state: State): boolean => state[NameSpace.DataRequest].hasErrorDelete;
export const getSignLoadDelete = (state: State): boolean => state[NameSpace.DataRequest].isLoadDelete;
export const getSignLoadPost = (state: State): boolean => state[NameSpace.DataRequest].isLoadPost;

