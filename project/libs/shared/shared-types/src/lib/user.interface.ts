import { StationMetro } from './station-metro.enum';
import {UserRole} from './user-role.enum';
import {UserSex} from './user-sex.enum';

export interface User {
  userId?: string;
  name: string;
  email: string;
  avatar?: string;
  passwordHash: string;
  sex: UserSex;
  birthDate: Date;
  role: UserRole;
  description: string;
  location: StationMetro;
  backgroundImg: string
}
