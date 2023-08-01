import { Body, Controller, Delete, Get, Param, Post, Query, Req, UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ApplicationServiceURL } from './app.config';
import { Request } from 'express';
import { AxiosExceptionFilter } from './filters/axios-exception.filter';
import { DefaultQuery, TrainingOrdersQuery } from '@project/shared/shared-query';
import { MongoidValidationPipe } from '@project/shared/shared-pipes';
import { CheckAuthGuard } from './guards/check-auth.guard';
import { UseridInterceptor } from './interceptors/userid.interceptor';
import { RoleUserInterceptor } from './interceptors/role-user.interceptor';
import { CreateOrderDto, CreateRequestDto, UserSubscriptionDto } from '@project/shared/shared-dto';
import { UseridOrderInterceptor } from './interceptors/userid-order.interceptor';
import { InintiatoridInterceptor } from './interceptors/initiatorid.interceptor';
import { UseridExistsInterceptor } from './interceptors/userid-exists.interceptor';
import { TypeRequest } from '@project/shared/shared-types';



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
  public async showFriends(@Req() req: Request, @Query() query: DefaultQuery, @Body() body) {
    const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Friends}/user`, {
      params : query,
      headers: {
        'Authorization': req.headers['authorization']
      }
    });
    await Promise.all(data.map(async (el) => {
      if (el.avatar) {
        const {data: {path}}  = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Files}/${el.avatar}`);
        el.avatarPath = path;
        }
        let initiatorId = el.userId;
        const userId = body.userId;
        const requestTraining  = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Request}/show`,{data: {initiatorId, userId}} );
        if (requestTraining.data.typeRequest === TypeRequest.Together){
          el.requestTogether = true
          el.requestStatus = requestTraining.data.statusRequest
          el.requestId = requestTraining.data.id
        }
          initiatorId = body.userId;
          const coachId = el.userId;
          const requestTrainingCoach  = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Request}/show`,{data: {initiatorId, coachId}} );
          if (requestTrainingCoach.data.typeRequest === TypeRequest.Personal) {
            el.requestPersonal = true
            el.requestStatus = requestTraining.data.statusRequest
            el.requestId = requestTraining.data.id
          }
       }));
   return data;
  }


  @UseGuards(CheckAuthGuard)
  @UseInterceptors(RoleUserInterceptor)
  @UseInterceptors(UseridInterceptor)
  @Post('orders/create')
  public async createOrder(@Body() dto: CreateOrderDto) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Orders}/create`, dto);
   return data;
  }

  @UseGuards(CheckAuthGuard)
  @UseInterceptors(RoleUserInterceptor)
  @UseInterceptors(UseridInterceptor)
  @UseInterceptors(UseridOrderInterceptor)
  @Post('orders/reduce/:id')
  public async reduceOrder(@Param('id', MongoidValidationPipe) id: string) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Orders}/reduce/${id}`, null);
   return data;
  }

  @UseGuards(CheckAuthGuard)
  @UseInterceptors(RoleUserInterceptor)
  @UseInterceptors(UseridInterceptor)
  @Get('orders')
  public async showOrders(@Body() userId: string, @Query() query: TrainingOrdersQuery) {
    const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Orders}/show/list/user`, {params : query, data: userId});
   return data;
  }

  @UseGuards(CheckAuthGuard)
  @UseInterceptors(RoleUserInterceptor)
  @UseInterceptors(UseridInterceptor)
  @UseInterceptors(UseridOrderInterceptor)
  @Delete('orders/delete/:id')
  public async deleteOrder(@Param('id', MongoidValidationPipe) id: string) {
    const { data } = await this.httpService.axiosRef.delete(`${ApplicationServiceURL.Orders}/delete/${id}`);
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

@UseGuards(CheckAuthGuard)
@UseInterceptors(InintiatoridInterceptor)
@UseInterceptors(RoleUserInterceptor)
@UseInterceptors(UseridExistsInterceptor)
@Post('request/training/create')
public async createTrainingRequest(@Req() req: Request, @Body() dto: CreateRequestDto) {
  const { data } = await  this.httpService.axiosRef.post(`${ApplicationServiceURL.Request}/create`, dto);
  return data;
}


}
