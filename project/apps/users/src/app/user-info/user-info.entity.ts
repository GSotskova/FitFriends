import { User, UserRole, UserSex, StationMetro } from '@project/shared/shared-types';
import { compare, genSalt, hash } from 'bcrypt';
import { SALT_ROUNDS } from './user-info.constant';

export class UserEntity implements User {
  public userId: string;
  public userName: string;
  public email: string;
  public avatar: string;
  public passwordHash: string;
  public sex: UserSex;
  public dateBirth: Date;
  public role: UserRole;
  public description: string;
  public location: StationMetro;
  public backgroundImg: string;

  constructor(userEntity: User) {
    this.fillEntity(userEntity);
  }

  public toObject() {
    return {...this};
  }

  public fillEntity(userEntity: User) {
    this.userId = userEntity.userId;
    this.userName = userEntity.userName;
    this.email = userEntity.email;
    this.avatar = userEntity.avatar;
    this.passwordHash = userEntity.passwordHash;
    this.sex = userEntity.sex;
    this.dateBirth = userEntity.dateBirth;
    this.role = userEntity.role;
    this.description = userEntity.description;
    this.location = userEntity.location;
    this.backgroundImg = userEntity.backgroundImg;
  }

  public async setPassword(password: string): Promise<UserEntity> {
    const salt = await genSalt(SALT_ROUNDS);
    this.passwordHash = await hash(password, salt);
    return this;
  }

  public async comparePassword(password: string): Promise<boolean> {
    return compare(password, this.passwordHash);
  }
}
