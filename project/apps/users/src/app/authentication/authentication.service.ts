import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto, LoginUserDto } from'@project/shared/shared-dto';
import dayjs from 'dayjs';
import { AuthErrorMsg } from './authentication.constant';
import { UserEntity } from '../user-info/user-info.entity';
import { ConfigService } from '@nestjs/config';
import { UserRepository } from '../user-info/user-info.repository';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly configService: ConfigService

  ) {
    console.log(configService.get<string>('db.host'));
    console.log(configService.get<string>('db.user'));
  }

  public async register(dto: CreateUserDto) {
    const existUser = await this.userRepository.findByEmail(dto.email);

    if (existUser) {
      throw new ConflictException(AuthErrorMsg.UserExists);
    }

    const userInfo = {
      userName: dto.userName, email: dto.email,
      avatar: '', passwordHash: '',
      sex: dto.sex, dateBirth: dayjs(dto.dateBirth).toDate(),
      role: dto.role, description: dto.description,
      location: dto.location, backgroundImg: ''
    };


    const userEntity = await new UserEntity(userInfo)
      .setPassword(dto.password)

    return this.userRepository
      .create(userEntity);
  }

  public async verifyUser(dto: LoginUserDto) {
    const {email, password} = dto;
    const existUser = await this.userRepository.findByEmail(email);

    if (!existUser) {
      throw new NotFoundException(AuthErrorMsg.NotFound);
    }

    const userEntity = new UserEntity(existUser);
    if (!await userEntity.comparePassword(password)) {
      throw new UnauthorizedException(AuthErrorMsg.PasswordWrong);
    }

    return userEntity.toObject();
  }

  public async getUser(id: string) {
    return this.userRepository.findById(id);
  }
}
