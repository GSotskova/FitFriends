export enum ApplicationServiceURL {
  Users = 'http://fitfriends.users:3339/api/users',
  Training = 'http://fitfriends.training:3334/api/training',
  Comments = 'http://fitfriends.training:3334/api/comment',
  Uploads = 'http://fitfriends.uploader:3336/api/files/upload',
  Orders = 'http://fitfriends.training:3334/api/orders',
  Friends = 'http://fitfriends.users:3339/api/friends',
}

export const HTTP_CLIENT_MAX_REDIRECTS = 5;
export const HTTP_CLIENT_TIMEOUT = 50000;
