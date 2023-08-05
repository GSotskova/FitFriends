import {NameSpace, AuthorizationStatus} from '../../constants';
import {State} from '../../types/state';
import { User, UserFullInfo, UserGeneral } from '../../types/user';

export const getAuthorizationStatus = (state: State): AuthorizationStatus => state[NameSpace.User].authorizationStatus;
export const getAuthCheckedStatus = (state: State): boolean => state[NameSpace.User].authorizationStatus !== AuthorizationStatus.Unknown;
export const getAuthInfo = (state: State): User | null => state[NameSpace.User].authInfo;
export const getAuthInfoDataLoadingStatus = (state: State): boolean => state[NameSpace.User].isAuthInfoLoading;
export const getHasErrorLogin = (state: State): boolean => state[NameSpace.User].hasErrorLogin;
export const getcheckEmail = (state: State): boolean => state[NameSpace.User].existsEmail;
export const getUserGeneralInfo = (state: State): UserGeneral | null => state[NameSpace.User].userData;
export const getUserFullInfo = (state: State): UserFullInfo => state[NameSpace.User].userFullInfo;
export const getSignUserLoading = (state: State): boolean => state[NameSpace.User].isUserLoading;
export const getUsers = (state: State): UserFullInfo[] => state[NameSpace.User].users;
export const getUserOther = (state: State): UserFullInfo | null => state[NameSpace.User].userOther;
export const getSignUserOtherLoading = (state: State): boolean => state[NameSpace.User].isUserOtherLoading;
export const getCountUsers = (state: State): number => state[NameSpace.User].countUsers;
export const getSignUserCatalogLoading = (state: State): boolean => state[NameSpace.User].isUserCatalogLoading;
