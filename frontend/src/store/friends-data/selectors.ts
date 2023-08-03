import {NameSpace} from '../../constants';
import {State} from '../../types/state';
import {Friend} from '../../types/user';


export const getFriends = (state: State): Friend[] => state[NameSpace.DataFriends].friends;
export const getFriendsDataLoadingStatus = (state: State): boolean => state[NameSpace.DataFriends].isFriendsDataLoading;
export const getErrorStatus = (state: State): boolean => state[NameSpace.DataFriends].hasError;
export const getErrorPost = (state: State): boolean => state[NameSpace.DataFriends].hasErrorPost;
export const getSignFriendLoadDelete = (state: State): boolean => state[NameSpace.DataFriends].isFriendLoadDelete;
export const getSignFriendLoadPost = (state: State): boolean => state[NameSpace.DataFriends].isFriendLoadPost;
