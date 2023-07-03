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
import { RabbitRouting, RequestWithTokenPayload, UserRole } from '@project/shared/shared-types';
import { NewCoachRdo } from '../authentication/rdo/new-coach.rdo';
import { NewUserRdo } from '../authentication/rdo/new-user.rdo';
import { NotifyUserService } from '../user-notify/user-notify.service';
import { NotifyRdo } from './rdo/notify.rdo';
import { RabbitRPC } from '@golevelup/nestjs-rabbitmq';


@ApiTags('user-info')
@Controller('users')
export class UserInfoController {
  constructor(
    private readonly userService: UserService,
    private readonly notifyUserService: NotifyUserService
  ) {}

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(UserRoleInterceptor)
  @ApiResponse({
    type: UserInfoRdo,
    status: HttpStatus.OK,
    description: 'Show list users'
  })
  @Get('')
  public async showList(@Query() query: UsersQuery) {
    const existPost = await this.userService.getUsers(query);
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
    return fillObject(UserInfoRdo, existUser);
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
      return {...el, dateNotify: el.dateNotify.toDateString()}
       }));
       notify.map(async (el) => { return {...el,
        dateNotify: el.dateNotify.toDateString()
         }
         })
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


  @RabbitRPC({
    exchange: 'fitfriends.uploader',
    routingKey: RabbitRouting.CoachCertificate,
    queue: 'fitfriends.uploader.certificate',
  })
  public async coachCertificate({coachId, fileId}) {
    const userUpd = await this.userService.changeCoachCetrificate(coachId, fileId)
    return fillObject(NewUserRdo, userUpd);
  }
}
