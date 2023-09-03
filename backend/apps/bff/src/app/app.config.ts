export enum ApplicationServiceURL {
  Auth = 'http://fitfriends.users:3339/api/auth',
  Friends = 'http://fitfriends.users:3339/api/friends',
  Users = 'http://fitfriends.users:3339/api/users',
  Subscription = 'http://fitfriends.users:3339/api/subscription',
  Training = 'http://fitfriends.training:3334/api/training',
  Orders = 'http://fitfriends.training:3334/api/orders',
  Request = 'http://fitfriends.training:3334/api/request',
  Comments = 'http://fitfriends.training:3334/api/comment',
  Uploads = 'http://fitfriends.uploader:3336/api/files/upload',
  Files = 'http://fitfriends.uploader:3336/api/files'
}

export const HTTP_CLIENT_MAX_REDIRECTS = 5;
export const HTTP_CLIENT_TIMEOUT = 50000;
