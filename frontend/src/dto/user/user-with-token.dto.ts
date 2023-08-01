import { UserRole } from '../../types/user';

export default class UserWithTokenDto {
  public id!: string;

  public email!: string;

  public userName!: string;

  public role!: UserRole;

  public token!: string;
}
