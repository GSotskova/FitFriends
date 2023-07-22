export enum AppRoute {
  Login = '/login',
  Intro = '/',
  Registration = '/registration',
  NotFound = '/404',
  Add = '/add',
  Edit = '/edit',
  AccountCoach = '/coach/account'

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
  CoachTraining = 'coach/training',
}

export enum NameSpace {
  DataTrainings = 'DATA_TRAININGS',
  DataTraining = 'DATA_TRAINING',
  Sort = 'SORT',
  User = 'USER'
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
