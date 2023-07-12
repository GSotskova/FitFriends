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
  Products = '/products',
  Login = '/users/login',
  Logout = '/users/logout',
  Register = '/users/create',
  Edit = '/edit',
  Delete = '/delete'
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


