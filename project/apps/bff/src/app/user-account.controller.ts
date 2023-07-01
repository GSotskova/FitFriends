import { Body, Controller, Delete, Get, Param, Post, Query, Req, UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ApplicationServiceURL } from './app.config';
import { Request } from 'express';
import { AxiosExceptionFilter } from './filters/axios-exception.filter';
import { DefaultQuery } from '@project/shared/shared-query';
import { MongoidValidationPipe } from '@project/shared/shared-pipes';
import { CheckAuthGuard } from './guards/check-auth.guard';
import { UseridInterceptor } from './interceptors/userid.interceptor';
import { RoleUserInterceptor } from './interceptors/role-user.interceptor';
import { UserSubscriptionDto } from '@project/shared/shared-dto';



@Controller('user')
@UseFilters(AxiosExceptionFilter)
export class UserAccountController {
  constructor(
    private readonly httpService: HttpService
  ) {}

  @UseGuards(CheckAuthGuard)
  @UseInterceptors(RoleUserInterceptor)
  @UseInterceptors(UseridInterceptor)
  @Post('friends/add/:friendId')
  public async addFriend(@Req() req: Request, @Param('friendId', MongoidValidationPipe) friendId: string) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Friends}/add/${friendId}`, null, {
      headers: {
        'Authorization': req.headers['authorization']
      }
    });
   return data;
  }

  @UseGuards(CheckAuthGuard)
  @UseInterceptors(RoleUserInterceptor)
  @UseInterceptors(UseridInterceptor)
  @Post('friends/delete/:friendId')
  public async deleteFriend(@Req() req: Request, @Param('friendId', MongoidValidationPipe) friendId: string) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Friends}/delete/${friendId}`, null, {
      headers: {
        'Authorization': req.headers['authorization']
      }
    });
   return data;
  }

  @UseGuards(CheckAuthGuard)
  @UseInterceptors(UseridInterceptor)
  @Get('friends/show')
  public async showFriends(@Req() req: Request, @Query() query: DefaultQuery) {
    const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Friends}/user`, {
      params : query,
      headers: {
        'Authorization': req.headers['authorization']
      }
    });
   return data;
  }




@UseGuards(CheckAuthGuard)
@UseInterceptors(UseridInterceptor)
@Post('subscription/create')
public async createSubscription( @Body() dto: UserSubscriptionDto) {

  const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Subscription}/create`, dto);
  return data;
}

@UseGuards(CheckAuthGuard)
@UseInterceptors(UseridInterceptor)
@Delete('subscription/delete')
public async deleteSubscription( @Body() dto: UserSubscriptionDto) {

  const { data } = await this.httpService.axiosRef.delete(`${ApplicationServiceURL.Subscription}/delete`, {data : dto});
  return data;
}


@UseGuards(CheckAuthGuard)
@UseInterceptors(UseridInterceptor)
@Get('notify/newtraining')
public async getTrainingAndNotify(@Req() req: Request) {

  const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Auth}/notify/newtraining`, {
    headers: {
      'Authorization': req.headers['authorization']
    }
  });
  return data;
}


}
