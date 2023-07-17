import { UserGeneral } from '../../types/user';
import { QuestionnaireCoach, QuestionnaireUser } from '../../types/questionnaire';
import { CreateUserDto } from '../../dto/user/create-user.dto';


export const adaptCoachToServer =
  (user: UserGeneral & QuestionnaireCoach): CreateUserDto => ({
    userName: user.userName,
    email: user.email,
    password: user.password,
    sex: user.sex,
    dateBirth: user.dateBirth.toString(),
    role: user.role,
    location: user.location,
    levelTraining: user.levelTraining,
    trainingType: user.trainingType,
    successCoach: user.successCoach,
    isPersonal: user.isPersonal
  });

export const adaptUserToServer =
  (user: UserGeneral & QuestionnaireUser): CreateUserDto => ({
    userName: user.userName,
    email: user.email,
    password: user.password,
    sex: user.sex,
    dateBirth: user.dateBirth.toString(),
    role: user.role,
    location: user.location,
    levelTraining: user.levelTraining,
    trainingTime: user.trainingTime,
    trainingType: user.trainingType,
    caloriesReset: user.caloriesReset,
    caloriesSpend: user.caloriesSpend,
    isReady: user.isReady
  });

export const adaptAvatarToServer =
  (file: File) => {
    const formData = new FormData();
    formData.append('file', file, file.name);
    return formData;
  };

export const adaptCertificateToServer =
  (file: File) => {
    const formData = new FormData();
    formData.append('certificate', file, file.name);
    return formData;
  };

export const adaptBackgroundImgToServer =
  (file: string) => {
    const formData = new FormData();
    formData.set('backgroundImg', file);
    return formData;
  };

