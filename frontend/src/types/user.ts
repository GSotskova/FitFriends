import { LevelTraining, TrainingTime, TrainingType } from './questionnaire';
import { StationMetro } from './station-metro.enum';

export type User = {
  id: string;
  sub?: string;
  userName: string;
  email: string;
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
  fileCertificate?: File;
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

export type UserFullInfo = {
  id: string;
  userName: string;
  email: string;
  avatar?: string;
  avatarImgStr?: string;
  sex: UserSex;
  dateBirth: string;
  role: UserRole;
  description: string;
  location: StationMetro;
  levelTraining: LevelTraining;
  trainingType: TrainingType[];
  certificate?: string;
  successCoach: string;
  isPersonal: boolean;
  trainingTime: TrainingTime;
  caloriesReset: number;
  caloriesSpend: number;
  isReady: boolean;
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
