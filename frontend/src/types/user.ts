import { LevelTraining, TrainingTime, TrainingType } from './questionnaire';
import { StationMetro } from './station-metro.enum';

export type User = {
  id: string;
  userName: string;
  email: string;
  role: UserRole;
  accessToken: string;
}

export type UserGeneral = {
  userName: string;
  email: string;
  avatar?: string;
  sex: UserSex;
  dateBirth: string;
  role: UserRole;
  description: string;
  location: StationMetro;
  password: string;
}

export type FileType = {
  avatarImg?: File;
  certificateId?: string;
  fileVideoTraning?: File;
  fileCertificate?: File;
}

export type CertificateType = {
 certificateId: string;
 certificatePath: string;
}

export enum UserSex {
  Male = 'Мужской',
  Female = 'Женский',
  None = 'Неважно',
}

export const USER_SEX_ARR = [UserSex.Male, UserSex.Female, UserSex.None];

export enum UserRole {
  Coach = 'coach',
  User = 'user',
}
export enum UserRoleTxt {
  Coach = 'Я хочу тренировать',
  User = 'Я хочу тренироваться',
}
export const USER_ROLE_ARR = [UserRoleTxt.Coach, UserRoleTxt.User];
export const USER_ROLE_ARR_TYPE = [UserRole.Coach, UserRole.User];

export type UserFullInfo = {
  id: string;
  userName: string;
  email: string;
  avatar?: string;
  avatarPath?: string;
  sex: UserSex;
  dateBirth: string;
  role: UserRole;
  description: string;
  location: StationMetro;
  levelTraining: LevelTraining;
  trainingType: TrainingType[];
  certificate: string[];
  certificatesPath: CertificateType[];
  successCoach: string;
  isPersonal: boolean;
  trainingTime: TrainingTime;
  caloriesReset: number;
  caloriesSpend: number;
  isReady: boolean;
  isFriend?: boolean;
  isSubscribe?: boolean;
}

export type UserEdit = {
  userName?: string;
  sex?: UserSex;
  description?: string;
  location?: StationMetro;
  levelTraining?: LevelTraining;
  trainingType?: TrainingType[];
  certificate?: string;
  successCoach?: string;
  isPersonal?: boolean;
  trainingTime?: TrainingTime;
  caloriesReset?: number;
  caloriesSpend?: number;
  isReady?: boolean;
}

export type Friend = {
  id: string;
  userId: string;
  userName: string;
  avatar: string;
  avatarPath: string;
  email: string;
  sex: UserSex;
  dateBirth: string;
  role: UserRole;
  description: string;
  location: StationMetro;
  requestPersonal: boolean;
  requestTogether: boolean;
  requestStatus: StatusRequest;
  requestId?: string;
  trainingType: TrainingType[];
  isReady: boolean;
};

export enum StatusRequest
 {
  Pending = 'на рассмотрении',
  Rejected = 'отклонён',
  Accepted = 'принят',
}
