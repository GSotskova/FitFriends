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
    avatarPath: user.avatarPath,
    sex: user.sex,
    dateBirth: user.dateBirth,
    role: user.role,
    description: user.description,
    location: user.location,
    levelTraining: user.levelTraining,
    trainingType: user.trainingType,
    certificate: user.certificate,
    certificatesPath: user.certificatesPath,
    successCoach: user.successCoach,
    isPersonal: user.isPersonal,
    trainingTime: user.trainingTime,
    caloriesReset: user.caloriesReset,
    caloriesSpend: user.caloriesSpend,
    isReady: user.isReady
  });

/*export const adaptFriendsToClient =
  (frineds: Friend[]): Friend[] =>
    frineds
      .map((frined: Friend)=>({
        id: frined.id,
        userName: frined.userName,
        email: frined.email,
        avatar: frined.avatar,
        avatarPath: frined.avatarPath,
        sex: frined.sex,
        dateBirth: frined.dateBirth,
        role: frined.role,
        description: frined.description,
        location: frined.location
      }));
*/
