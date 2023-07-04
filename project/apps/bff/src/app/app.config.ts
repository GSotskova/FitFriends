export enum ApplicationServiceURL {
  Auth = 'http://localhost:3333/api/auth',
  Friends = 'http://localhost:3333/api/friends',
  Users = 'http://localhost:3333/api/users',
  Subscription = 'http://localhost:3333/api/subscription',
  Training = 'http://localhost:3334/api/training',
  Orders = 'http://localhost:3334/api/orders',
  Request = 'http://localhost:3334/api/request',
  Comments = 'http://localhost:3334/api/comment',
  Uploads = 'http://localhost:3336/api/files/upload'
}

export const HTTP_CLIENT_MAX_REDIRECTS = 5;
export const HTTP_CLIENT_TIMEOUT = 50000;
