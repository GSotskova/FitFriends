import { Body, Controller, Get, HttpStatus, Param, Post, Query, UseGuards, UseInterceptors} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserService } from './user-info.service';
import { fillObject } from '@project/util/util-core';
import { UsersQuery } from '@project/shared/shared-query';
import { UserInfoRdo } from './rdo/user-info.rdo';
import { JwtAuthGuard } from '../authentication/guards/jwt-auth.guard';
import { UserRoleInterceptor } from './interceptors/user-role.interceptor';
import { UseridInterceptor } from './interceptors/userid.interceptor';
import { MongoidValidationPipe } from '@project/shared/shared-pipes';
import { EditUserDto } from '@project/shared/shared-dto';
import { UserRole } from '@project/shared/shared-types';
import { NewCoachRdo } from '../authentication/rdo/new-coach.rdo';
import { NewUserRdo } from '../authentication/rdo/new-user.rdo';


@ApiTags('user-info')
@Controller('users')
export class UserInfoController {
  constructor(
    private readonly userService: UserService
  ) {}

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(UserRoleInterceptor)
  @ApiResponse({
    type: UserInfoRdo,
    status: HttpStatus.OK,
    description: 'Show list posts'
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
  @UseInterceptors(UseridInterceptor)
  @Post('edit/:id')
  @ApiResponse({
    type: UserInfoRdo,
    status: HttpStatus.OK,
    description: 'User edit'
  })
  public async update(@Param('id', MongoidValidationPipe) id: string, @Body() dto: EditUserDto) {
    const existUser = await this.userService.updateById(id, dto);
    if (existUser.role === UserRole.Coach) {
      return fillObject(NewCoachRdo, existUser);
      }
      return fillObject(NewUserRdo, existUser);

  }
}
