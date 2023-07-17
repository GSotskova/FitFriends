import UserWithTokenDto from '../../dto/user/user-with-token.dto';
import { User } from '../../types/user';


export const adaptLoginToClient =
  (user: UserWithTokenDto): User => ({
    userName: user.userName,
    email: user.email,
    accessToken: user.token,
  });


