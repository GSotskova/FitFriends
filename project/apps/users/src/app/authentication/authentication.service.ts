import { ConflictException, Inject, Injectable, NotFoundException, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { ConfigType, ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import dayjs from 'dayjs';
import * as crypto from 'node:crypto';
import { CreateUserDto, LoginUserDto } from'@project/shared/shared-dto';
import { TokenLogin, User, UserRole } from '@project/shared/shared-types';
import { createJWTPayload } from '@project/util/util-core';
import { jwtConfig } from '@project/config/config-users';
import { AuthErrorMsg } from './authentication.constant';
import { UserEntity } from '../user-info/user-info.entity';
import { UserRepository } from '../user-info/user-info.repository';
import { QuestionnaireCoachRepository } from '../questionnaire-coach/questionnaire-coach.repository';
import { QuestionnaireCoachEntity } from '../questionnaire-coach/questionnaire-coach.entity';
import { QuestionnaireUserEntity } from '../questionnaire-user/questionnaire-user.entity';
import { QuestionnaireUserRepository } from '../questionnaire-user/questionnaire-user.repository';
import { RefreshTokenService } from '../refresh-token/refresh-token.service';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly questionnaireCoachRepository: QuestionnaireCoachRepository,
    private readonly questionnaireUserRepository: QuestionnaireUserRepository,
    private readonly refreshTokenService: RefreshTokenService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
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

  private async createQuestionCoach(userId: string, dto: CreateUserDto) {

    const questionCoach = {
      userId: userId, levelTraining: dto.levelTraining,
      trainingType: dto.trainingType,
      certificates: dto.certificates, successCoach: dto.successCoach,
      isPersonal: dto.isPersonal
    };

    const questionCoachEntity = await new QuestionnaireCoachEntity(questionCoach)

      return this.questionnaireCoachRepository.create(questionCoachEntity);
  }

  private async createQuestionUser(userId: string, dto: CreateUserDto) {

    const questionUser = {
      userId: userId, levelTraining: dto.levelTraining,
      trainingType: dto.trainingType,
      trainingTime: dto.trainingTime, caloriesReset: dto.caloriesReset,
      caloriesSpend: dto.caloriesSpend, isReady: dto.isReady
    };

    const questionUserEntity = await new QuestionnaireUserEntity(questionUser)

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

  public async getUser(id: string) {
    return this.userRepository.findById(id);
  }

  public async createUserToken(user: User, tokenInfo?: TokenLogin) {
    if (tokenInfo && tokenInfo.token && tokenInfo.userIdAuth === user._id.toString()) {
      throw new BadRequestException('Current token:'+tokenInfo.token, { cause: new Error(), description: 'The user is logged in' })
    }
    const accessTokenPayload = createJWTPayload(user);
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



}
