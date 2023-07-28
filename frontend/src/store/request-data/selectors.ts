import {NameSpace} from '../../constants';
import {State} from '../../types/state';


export const getErrorPost = (state: State): boolean => state[NameSpace.DataRequest].hasErrorPost;
