import UserWithTokenDto from '../../dto/user/user-with-token.dto';
import { User, UserFullInfo } from '../../types/user';


export const adaptLoginToClient =
  (user: UserWithTokenDto): User => ({
    id: user.id,
    userName: user.userName,
    email: user.email,
    accessToken: user.token,
  });


export const adaptUserToClient =
  (user: UserFullInfo): UserFullInfo => ({
    id: user.id,
    userName: user.userName,
    email: user.email,
    avatar: user.avatar,
    avatarImgStr: `http://localhost:3336${user.avatarImgStr ? user.avatarImgStr : ''}`,
    sex: user.sex,
    dateBirth: user.dateBirth,
    role: user.role,
    description: user.description,
    location: user.location,
    levelTraining: user.levelTraining,
    trainingType: user.trainingType,
    certificate: user.certificate,
    successCoach: user.successCoach,
    isPersonal: user.isPersonal,
    trainingTime: user.trainingTime,
    caloriesReset: user.caloriesReset,
    caloriesSpend: user.caloriesSpend,
    isReady: user.isReady
  });
