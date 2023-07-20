import {NameSpace, AuthorizationStatus} from '../../constants';
import {State} from '../../types/state';
import { User, UserFullInfo, UserGeneral } from '../../types/user';

export const getAuthorizationStatus = (state: State): AuthorizationStatus => state[NameSpace.User].authorizationStatus;
export const getAuthCheckedStatus = (state: State): boolean => state[NameSpace.User].authorizationStatus !== AuthorizationStatus.Unknown;
export const getAuthInfo = (state: State): User | null => state[NameSpace.User].authInfo;
export const getHasErrorLogin = (state: State): boolean => state[NameSpace.User].hasErrorLogin;
export const getcheckEmail = (state: State): boolean => state[NameSpace.User].existsEmail;
export const getUserGeneralInfo = (state: State): UserGeneral | null => state[NameSpace.User].userData;
export const getUserFullInfo = (state: State): UserFullInfo => state[NameSpace.User].userFullInfo;
