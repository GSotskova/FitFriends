import { StationMetro } from './station-metro.enum';

export type User = {
  userName: string;
  email: string;
  avatar: string;
  sex: UserSex;
  dateBirth: string;
  role: UserRole;
  description: string;
  location: StationMetro;
  backgroundImg?: string;
  token: string;
}

export type UserRegister = {
  userName: string;
  email: string;
  avatar: string;
  sex: UserSex;
  dateBirth: string;
  role: UserRole;
  description: string;
  location: string;
  password: string;
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
