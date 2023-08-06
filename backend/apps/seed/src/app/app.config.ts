export enum ApplicationServiceURL {
  Users = 'http://localhost:3333/api/users',
  Training = 'http://localhost:3334/api/training',
  Comments = 'http://localhost:3334/api/comment',
  Uploads = 'http://localhost:3336/api/files/upload',
  Orders = 'http://localhost:3334/api/orders',
  Friends = 'http://localhost:3333/api/friends',
}

export const HTTP_CLIENT_MAX_REDIRECTS = 5;
export const HTTP_CLIENT_TIMEOUT = 50000;
