import { LevelTraining, TrainingTime, TrainingType } from './questionnaire';
import { StationMetro } from './station-metro.enum';

export type User = {
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
  Male = 'male',
  Female = 'female',
  None = 'none',
}

export enum UserSexTxt {
  Male = 'Мужской',
  Female = 'Женский',
  None = 'Неважно',
}

export const USER_SEX_ARR = [UserSexTxt.Male, UserSexTxt.Female, UserSexTxt.None];

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
  userName: string;
  email: string;
  avatar?: string;
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
