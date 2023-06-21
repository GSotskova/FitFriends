import { StationMetro } from './station-metro.enum';
import {UserRole} from './user-role.enum';
import {UserSex} from './user-sex.enum';

export interface User {
  _id?: string;
  userName: string;
  email: string;
  avatar?: string;
  passwordHash: string;
  sex: UserSex;
  dateBirth: Date;
  role: UserRole;
  description: string;
  location: StationMetro;
  backgroundImg?: string
}
