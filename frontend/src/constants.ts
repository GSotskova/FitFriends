import { Metro, StationMetro } from './types/station-metro';

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
  DataComments = 'DATA_COMMENT',
  DataSubscribe = 'DATA_SUBSCRIBE',
  DataNotify = 'DATA_NOTIFY'
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

export const enum CommentLn {
  MinLength = 100,
  MaxLength = 1024
}

export const MAX_CALORIES_VALUE = 5000;
export const COUNT_TRAINING_FOR_YOU = 9;
export const COUNT_TRAINING_SPECIAL = 3;
export const COUNT_USERS_READY = 8;
export const SHOW_TRAINING_TYPE = 5;

export const RATING_TRAINING_ARR = [1,2,3,4,5];
export const COUNT_ORDER_DEFAULT = 5;
export const DEFAULT_RATING = 5;
export const DEFAULT_LIMIT = 6;
export const ORDERS_LIMIT = 4;

export const POINT_ARR: Metro[] = [
  {name: StationMetro.Petrogradskaya,
    location: [59.966399, 30.311511]
  },
  {name: StationMetro.Pionerskaya,
    location: [59.950190, 30.288335]
  },
  {name: StationMetro.Sportivnaya,
    location: [60.002517, 30.296671]
  },
  {name: StationMetro.Udelnaya,
    location: [60.016681, 30.315617]
  },
  {name: StationMetro.Zvyozdnaya,
    location: [59.833233, 30.349492]
  },
];

export const ZOOM = 12;
export const COUNT_TRAINING_FOR_SEND = 4;
