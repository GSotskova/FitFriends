import { TokenPayload, User } from '@project/shared/shared-types';

export function createJWTPayload(user: User): TokenPayload {
  return {
    sub: user._id,
    email: user.email,
    role: user.role,
    userName: user.userName,
  };
}
