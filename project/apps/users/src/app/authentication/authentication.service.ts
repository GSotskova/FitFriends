import { ConflictException, Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { ConfigType, ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as crypto from 'node:crypto';
import { CreateUserDto, LoginUserDto } from'@project/shared/shared-dto';
import { TokenLogin, User, UserRole } from '@project/shared/shared-types';
import { createJWTPayload } from '@project/util/util-core';
import { jwtConfig } from '@project/config/config-users';
import { AuthErrorMsg } from './authentication.constant';
import { UserEntity } from '../user-info/user-info.entity';
import { UserRepository } from '../user-info/user-info.repository';
import { QuestionnaireCoachRepository } from '../questionnaire-coach/questionnaire-coach.repository';
import { QuestionnaireUserRepository } from '../questionnaire-user/questionnaire-user.repository';
import { RefreshTokenService } from '../refresh-token/refresh-token.service';
import { UserService } from '../user-info/user-info.service';
import { NotifyDateEntity } from '../date-notify/date-notify.entity';
import { NotifyDateRepository } from '../date-notify/date-notify.repository';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly questionnaireCoachRepository: QuestionnaireCoachRepository,
    private readonly questionnaireUserRepository: QuestionnaireUserRepository,
    private readonly refreshTokenService: RefreshTokenService,
    private readonly userService: UserService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly notifyDateRepository: NotifyDateRepository,
    @Inject (jwtConfig.KEY) private readonly jwtOptions: ConfigType<typeof jwtConfig>,
  ) {
    console.log(configService.get<string>('db.host'));
    console.log(configService.get<string>('db.user'));
  }

  public async register(dto: CreateUserDto) {
    const existUser = await this.userRepository.findByEmail(dto.email);

    if (existUser) {
      throw new ConflictException(AuthErrorMsg.UserExists);
    }
       await this.createUserGeneral(dto);
      const newUserId = (await this.userRepository.findByEmail(dto.email))._id;
      if (dto.role === UserRole.Coach) {
      await this.createQuestionCoach(newUserId, dto);
      return this.userRepository.getInfoCoach(newUserId);
      }
      await this.createQuestionUser(newUserId, dto);
      return this.userRepository.getInfoUser(newUserId);
  }

  private async createUserGeneral(dto: CreateUserDto) {
    const userEntity = await this.userService.getGeneralUserEntity(dto).setPassword(dto.password)
    return this.userRepository.create(userEntity);
  }

  private async createQuestionCoach(userId: string, dto: CreateUserDto) {
    const questionCoachEntity = await this.userService.getCoachEntity(userId, dto)
    return this.questionnaireCoachRepository.create(questionCoachEntity);
  }

  private async createQuestionUser(userId: string, dto: CreateUserDto) {
    const questionUserEntity = await this.userService.getUserEntity(userId, dto);
    return this.questionnaireUserRepository.create(questionUserEntity);
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


  public async createUserToken(user: User, tokenInfo?: TokenLogin) {
    if (tokenInfo && tokenInfo.token && tokenInfo.userIdAuth === user._id.toString()) {
      return {accessToken: tokenInfo.token,  description: 'The user is logged in' }
    }

    const accessTokenPayload = createJWTPayload(user);
    await this.refreshTokenService.deleteRefreshSessionByUserId(user._id);
    const refreshTokenPayload = { ...accessTokenPayload, tokenId: crypto.randomUUID() };
    await this.refreshTokenService.createRefreshSession(refreshTokenPayload)

    return {
      accessToken: await this.jwtService.signAsync(accessTokenPayload),
      refreshToken: await this.jwtService.signAsync(refreshTokenPayload, {
        secret: this.jwtOptions.refreshTokenSecret,
        expiresIn: this.jwtOptions.refreshTokenExpiresIn
      })
    }
  }




  public async createOrUpdateNotify(userId: string, dateNotify: Date) {
    const notifyEntity = await new NotifyDateEntity({userId, dateNotify})
    return this.notifyDateRepository.createOrUpdate(notifyEntity);
  }

  public async findNotifyByUser(userId: string) {
    return this.notifyDateRepository.findByUserId(userId);
  }

  public async changeAvatar(userId: string, fileId: string) {
    const existUser = await this.userRepository.findById(userId);
    if (!existUser)   {
    //  throw new NotFoundException(AuthErrorMsg.NotFound);
    return {error: AuthErrorMsg.NotFound}
    }
    return this.userRepository.updateAvatar(userId, fileId);
  }

  public async changeBackgroundImg(userId: string, fileId: string) {
    const existUser = await this.userRepository.findById(userId);
    if (!existUser)   {
    return {error: AuthErrorMsg.NotFound}
    }
    return this.userRepository.updateBackgroundImg(userId, fileId);
  }

}
