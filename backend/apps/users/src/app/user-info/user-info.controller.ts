import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Query, Req, UseGuards, UseInterceptors} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserService } from './user-info.service';
import { fillObject } from '@project/util/util-core';
import { UsersQuery } from '@project/shared/shared-query';
import { UserInfoRdo } from './rdo/user-info.rdo';
import { JwtAuthGuard } from '../authentication/guards/jwt-auth.guard';
import { UserRoleInterceptor } from './interceptors/user-role.interceptor';
import { MongoidValidationPipe } from '@project/shared/shared-pipes';
import { EditUserDto } from '@project/shared/shared-dto';
import { NotifyDate, NotifyMessage, RabbitExchange, RabbitQueue, RabbitRouting, RequestWithTokenPayload, Training, TrainingRequest, TypeRequest, UserRole } from '@project/shared/shared-types';
import { NewCoachRdo } from '../authentication/rdo/new-coach.rdo';
import { NewUserRdo } from '../authentication/rdo/new-user.rdo';
import { NotifyUserService } from '../user-notify/user-notify.service';
import { NotifyRdo } from './rdo/notify.rdo';
import { RabbitRPC } from '@golevelup/nestjs-rabbitmq';
import { NotifyService } from '../notify/notify.service';
import { UsersSubscriptionsService } from '../users-subscriptions/users-subscriptions.service';


@ApiTags('user-info')
@Controller('users')
export class UserInfoController {
  constructor(
    private readonly userService: UserService,
    private readonly notifyUserService: NotifyUserService,
    private readonly notifyService: NotifyService,
    private readonly usersSubscriptionsService: UsersSubscriptionsService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(UserRoleInterceptor)
  @ApiResponse({
    type: UserInfoRdo,
    status: HttpStatus.OK,
    description: 'Show list users'
  })
  @Get('')
  public async showList(@Query() query: UsersQuery, @Body() body) {
    const existPost = await this.userService.getUsers(query, body.userId);
    return fillObject(UserInfoRdo, existPost);
  }


  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiResponse({
    type: UserInfoRdo,
    status: HttpStatus.OK,
    description: 'User found'
  })
  public async show(@Param('id', MongoidValidationPipe) id: string) {
    const existUser = await this.userService.getUser(id);
    if (existUser.role === UserRole.Coach) {
      return fillObject(NewCoachRdo, existUser);
      }
      return fillObject(NewUserRdo, existUser);
  }


  @UseGuards(JwtAuthGuard)
  @Post('edit')
  @ApiResponse({
    type: UserInfoRdo,
    status: HttpStatus.OK,
    description: 'User edit'
  })
  public async update(@Req() { user: payload }: RequestWithTokenPayload,  @Body() dto: EditUserDto) {
    const existUser = await this.userService.updateById(payload.sub, dto);
    if (existUser.role === UserRole.Coach) {
      return fillObject(NewCoachRdo, existUser);
      }
      return fillObject(NewUserRdo, existUser);

  }

  @UseGuards(JwtAuthGuard)
  @Get('notify/show')
  @ApiResponse({
    type: NotifyRdo,
    status: HttpStatus.OK,
    description: 'Show notify for user'
  })
  public async showNotifyUser(@Req() { user: payload }: RequestWithTokenPayload) {
    const notify = await this.notifyUserService.getNotifyUsers(payload.sub);
    await Promise.all(notify.map(async (el) => {
      el.initiatorName = (await this.userService.getUser(el.initiatorId)).userName
      return el
       }));
    return fillObject(NotifyRdo, notify);
  }

  @Get('notify/get/:id')
  @ApiResponse({
    type: NotifyRdo,
    status: HttpStatus.OK,
    description: 'Get notify by Id'
  })
  public async getNotifyId(@Param('id', MongoidValidationPipe) id: string) {
    return await this.notifyUserService.getNotifyId(id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('notify/delete/:id')
  @ApiResponse({
    type: NotifyRdo,
    status: HttpStatus.OK,
    description: 'Delete notify by ID'
  })
  public async deleteNotifyById(@Param('id', MongoidValidationPipe) id: string) {
    const notify = await this.notifyUserService.deleteNotify(id);
    return fillObject(NotifyRdo, notify);
  }


  @UseGuards(JwtAuthGuard)
  @Delete('certificate/delete/:id')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Delete certificate by ID'
  })
  public async deleteCertificate(@Body() body, @Param('id', MongoidValidationPipe) id: string) {
    return this.userService.deleteCertificate(body.coachId, id);
  }


  @RabbitRPC({
    exchange: RabbitExchange.Uploader,
    routingKey: RabbitRouting.CoachCertificate,
    queue: RabbitQueue.Certificate,
  })
  public async coachCertificate({coachId, fileId}) {
    const userUpd = await this.userService.changeCoachCetrificate(coachId, fileId)
    return fillObject(NewUserRdo, userUpd);
  }

  @RabbitRPC({
    exchange: RabbitExchange.Training,
    routingKey: RabbitRouting.TrainingRequestNotify,
    queue: RabbitQueue.Request,
  })
  public async trainingRequestNotify(@Body() request: TrainingRequest) {
  const requestType = request.typeRequest === TypeRequest.Personal
      ? `Запрос на персональную тренировку от пользователя ${request.statusRequest}` as NotifyMessage
      : NotifyMessage.Training

      const newNotify =  this.notifyUserService.create(request.initiatorId, request.userId, requestType)

      const initiator = await this.userService.getUser(request.initiatorId)
      const userNotify = await this.userService.getUser(request.userId)
      const currentDate = new Date();
      await this.notifyService.notifyUser({
        userId: request.userId,
        email: userNotify.email,
        initiatorId: request.initiatorId,
        initiatorName: initiator.userName,
        text: requestType,
        dateNotify: currentDate
       })
    return newNotify
  }


  @RabbitRPC({
    exchange: RabbitExchange.Training,
    routingKey: RabbitRouting.TrainingNotify,
    queue: RabbitQueue.Newtraining,
  })
  public async trainingNotify(@Body() request: Training) {
  const users = await this.usersSubscriptionsService.getByCoachId(request.coachId);
  if (!users) {
    return null;
  }
  const coachName = (await this.userService.getUser(request.coachId)).userName;
  const trainingForSend = {
  _id: request._id,
  nameTraining: request.nameTraining,
  descriptionTraining: request.descriptionTraining,
  coachId: request.coachId,
  coachName: coachName,
  createDate: request.createdAt
}
const traininNotNotify = await this.userService.findNotDone();
const maxCount = traininNotNotify.length !== 0 ? Math.max(...traininNotNotify.map(function(el: NotifyDate) { return el.countNewTraining })) : 0;
const dateNotify = new Date(Date.UTC(1900, 0, 1));
await Promise.all(users.map(async (user, i) => {
  const dataForNatify = {
    userId: user.userId,
    trainingForSend,
    countNewTraining: maxCount + (i+1),
    isDone: false,
    dateNotify
  }
await this.userService.createOrUpdateNotify(dataForNatify)
}));

return traininNotNotify;;
  }

  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Start sending notifications at the users request.'
  })
  @Get('notify/newtraining')
  public async getNewTraining() {

    const traininNotNotify = await this.userService.findNotDone();
      const currentDate = new Date();
      await Promise.all(traininNotNotify.map(async (el) => {
      const email = (await this.userService.getUser(el.userId)).email;
      await this.notifyService.notifyNewTraining({
            userId: el.userId,
            email,
            training: [el.trainingForSend],
            dateSend: currentDate.toDateString() });
      const dataForNatify = {
        _id: el._id,
        userId: el.userId,
        trainingForSend: el.trainingForSend,
        countNewTraining: el.countNewTraining,
        isDone: true,
        dateNotify:  currentDate
      }
        await this.userService.createOrUpdateNotify(dataForNatify)
      }));
    return traininNotNotify;

  }

  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Start sending notifications at the users request.'
  })
  @Get('notify/training/count')
  public async getCountNewTraining() {

    const traininNotNotify = await this.userService.findNotDone();
    const maxCount = Math.max(...traininNotNotify.map(function(el: NotifyDate) { return el.countNewTraining }));

return maxCount
  }

  @Post('test')
  public async createTestData(@Body() test_user) {
    const dataArr = [];
    for (const key in test_user) {
      const user = await this.userService.createTestData(test_user[key].data, test_user[key].questionnaire);
    dataArr.push(user);
  }
    return dataArr;
  }
}
