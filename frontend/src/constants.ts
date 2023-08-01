export enum AppRoute {
  Login = '/login',
  Intro = '/',
  Main = '/main',
  Registration = '/registration',
  NotFound = '/404',
  Add = '/add',
  Edit = '/edit',
  AccountCoach = '/coach/account',
  AccountUser = '/user/account',
  Training = '/training',
  Users = '/users'

}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}


export enum APIRoute {
  Login = '/users/login',
  Logout = '/users/logout',
  Register = '/users/register',
  Files = '/files',
  CheckEmail = '/users/check/email',
  CheckUser= '/users/login/auth',
  Users = '/users',
  User = '/user',
  Coach = 'coach',
  CoachTraining = 'coach/training',
  Training = 'training',
}

export enum NameSpace {
  DataTrainings = 'DATA_TRAININGS',
  Sort = 'SORT',
  User = 'USER',
  DataFriends = 'DATA_FRIENDS',
  DataOrders = 'DATA_ORDERS',
  DataRequest = 'DATA_REQUEST',
  DataComments = 'DATA_COMMENT'
}

export enum HttpCode {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  NOT_FOUND = 404,
  CONFLICT = 409,
}


export enum FormRegistration {
  General,
  QuestionnaireCoach,
  QuestionnaireUser
}

export const enum SuccessCoach {
  MinLength = 10,
  MaxLength = 140
}

export const enum DescriptionLn {
  MinLength = 10,
  MaxLength = 140
}

export const MAX_CALORIES_VALUE = 5000;
export const COUNT_TRAINING_FOR_YOU = 9;
export const COUNT_TRAINING_SPECIAL = 3;
export const COUNT_USERS_READY = 8;
export const SHOW_TRAINING_TYPE = 5;

