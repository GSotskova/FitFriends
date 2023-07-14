export enum AppRoute {
  Login = '/login',
  Intro = '/',
  Registration = '/registration',
  Products = '/products',
  NotFound = '/404',
  Add = '/add',
  Edit = '/edit'

}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}


export enum APIRoute {
  Login = '/users/login',
  Logout = '/users/logout',
  Register = '/users/create',
  CheckEmail = '/users/check/email',
}

export enum NameSpace {
  DataProducts = 'DATA_PRODUCTS',
  DataProduct = 'DATA_PRODUCT',
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
