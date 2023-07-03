import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req,  UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthenticationService } from './authentication.service';
import { fillObject } from '@project/util/util-core';
import { NewCoachRdo } from './rdo/new-coach.rdo';
import { NewUserRdo } from './rdo/new-user.rdo';
import { DataNotifyTraining, RabbitRouting, RequestWithTokenPayload, RequestWithUser, TokenLogin, UserRole } from '@project/shared/shared-types';
import { CreateUserDto } from'@project/shared/shared-dto';
import { LocalAuthGuard } from './guards/local-auth-guard';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { CheckJwtAuthGuard } from './guards/check-jwt-auth.guard';
import { NotifyService } from '../notify/notify.service';
import { TrainingService } from '../training/training.service';
import { UsersSubscriptionsService } from '../users-subscriptions/users-subscriptions.service';
import { UserService } from '../user-info/user-info.service';
import { RabbitRPC } from '@golevelup/nestjs-rabbitmq';



@ApiTags('authentication')
@Controller('auth')
export class AuthenticationController {
  constructor(
    private readonly authService: AuthenticationService,
    private readonly notifyService: NotifyService,
    private readonly trainingService: TrainingService,
    private readonly usersSubscriptionsService: UsersSubscriptionsService,
    private readonly userService: UserService,
  ) {}

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The new user has been successfully created.'
  })
  @Post('register')
  public async create(@Body() dto: CreateUserDto) {
    const newUser = await this.authService.register(dto);
    const { email, userName } = newUser;
    await this.notifyService.registerSubscriber({ email, userName })
    if (newUser.role === UserRole.Coach) {
    return fillObject(NewCoachRdo, newUser);
    }
    return fillObject(NewUserRdo, newUser);

  }

  @UseGuards(CheckJwtAuthGuard, LocalAuthGuard)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User has been successfully logged.'
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Password or Login is wrong.',
  })
  @Post('login')
  @HttpCode(HttpStatus.OK)
  public async login(@Req() req: RequestWithUser & TokenLogin ,@Body() tokenInfo?: TokenLogin) {
    const tt ={userIdAuth: tokenInfo.userIdAuth, token: tokenInfo.token} as TokenLogin;
    return this.authService.createUserToken(req.user, tt);
  }

 @UseGuards(JwtRefreshGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get a new access/refresh tokens'
  })
  public async refreshToken(@Req() { user }: RequestWithUser) {
    return this.authService.createUserToken(user);
  }

  @UseGuards(JwtRefreshGuard)
  @Post('refresh/delete')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Delete refresh token'
  })
  public async deleteRefreshToken(@Req() { user }: RequestWithUser) {
    return user;
  }


  @UseGuards(JwtAuthGuard)
  @Post('check')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Check access token'
  })
  public async checkToken(@Req() { user: payload }: RequestWithTokenPayload) {
    return payload;
  }

  @UseGuards(CheckJwtAuthGuard)
  @Post('isauth')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User is auth'
  })
  public async isAuth(@Req() { user: payload }: RequestWithTokenPayload) {
    return payload;
  }

  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Start sending notifications at the users request.'
  })
  @Get('notify/newtraining')
  public async getTrainingAndNotify(@Req() { user: payload }: RequestWithTokenPayload) {
    const {sub, email} = payload;
    const lastNotifyDate = await this.authService.findNotifyByUser(sub);
    let dateNotify = new Date(Date.UTC(1900, 0, 1));
    if (lastNotifyDate)
    {
       dateNotify = lastNotifyDate.dateNotify;
    }

    const coaches = await this.usersSubscriptionsService.getByUserId(sub);
    const coachArr = coaches.map((el)=>el.coachId);
    const queryNotify = {dateNotify: dateNotify, coaches: coachArr} as DataNotifyTraining;
    const listTraining = await this.trainingService.geNewtTraining(queryNotify);


    await Promise.all(listTraining.map(async (el) => {
      el.coachName = (await this.userService.getUser(el.coachId)).userName;
       }));

    const currentDate = new Date();
    await this.notifyService.notifyNewTraining({userId: sub, email, training:listTraining, dateSend: currentDate.toDateString() })
    await this.authService.createOrUpdateNotify(sub, currentDate)
   return listTraining;
  }

  @RabbitRPC({
    exchange: 'fitfriends.uploader',
    routingKey: RabbitRouting.UserAvatars,
    queue: 'fitfriends.uploader.avatar',
  })
  public async userAvatars({userId, fileId}) {
    console.log(userId, fileId)
    const userUpd = await this.authService.changeAvatar(userId, fileId)
    return fillObject(NewUserRdo, userUpd);
  }

  @RabbitRPC({
    exchange: 'fitfriends.uploader',
    routingKey: RabbitRouting.UserBackgroundImg,
    queue: 'fitfriends.uploader.background',
  })
  public async userBackgroundImg({userId, fileId}) {
    const userUpd = await this.authService.changeBackgroundImg(userId, fileId)
    return fillObject(NewUserRdo, userUpd);
  }


}
