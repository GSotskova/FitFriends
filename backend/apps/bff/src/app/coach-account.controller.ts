import { Body, Controller, Delete, Get, Param, Post, Query, Req, UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ApplicationServiceURL } from './app.config';
import { Request } from 'express';
import { AxiosExceptionFilter } from './filters/axios-exception.filter';
import { DefaultQuery, TrainingOrdersQuery, TrainingQuery } from '@project/shared/shared-query';
import { MongoidValidationPipe } from '@project/shared/shared-pipes';
import { CreateTrainingDTO, EditTrainingDTO } from '@project/shared/shared-dto';
import { CheckAuthGuard } from './guards/check-auth.guard';
import { RoleCoachInterceptor } from './interceptors/role-coach.interceptor';
import { UseridTrainingInterceptor } from './interceptors/userid-tarining.interceptor';
import { CoachIdInterceptor } from './interceptors/coachId.interceptor';
import { StatusRequest, TypeRequest } from '@project/shared/shared-types';



@Controller('coach')
@UseFilters(AxiosExceptionFilter)
export class CoachAccountController {
  constructor(
    private readonly httpService: HttpService
  ) {}


  @UseGuards(CheckAuthGuard)
  @UseInterceptors(RoleCoachInterceptor)
  @UseInterceptors(CoachIdInterceptor)
  @Post('/training/create')
  public async create(@Body() dto: CreateTrainingDTO) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Training}/create`, dto);
   return data;
  }

  @UseGuards(CheckAuthGuard)
  @UseInterceptors(RoleCoachInterceptor)
  @UseInterceptors(CoachIdInterceptor)
  @Get('training/show/list')
  public async showList(@Body() coachId: string, @Query() query: TrainingQuery) {
    const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Training}/show/list`, {params : query, data: coachId});
    await Promise.all(data.map(async (el) => {
      if (el.photoTraning) {
        const {data: {path}}  = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Files}/${el.photoTraning}`);
        el.photoTraningPath = path;
        }
       }));

   return data;
  }

  @UseGuards(CheckAuthGuard)
  @UseInterceptors(RoleCoachInterceptor)
  @UseInterceptors(UseridTrainingInterceptor)
  @Post('training/edit/:id')
  public async update(@Body() dto: EditTrainingDTO, @Param('id', MongoidValidationPipe) id: string) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Training}/edit/${id}`, dto);
   return data;
  }

  @UseGuards(CheckAuthGuard)
  @Get('training/:id')
  public async show(@Req() req: Request, @Param('id', MongoidValidationPipe) id: string) {
    const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Training}/${id}`);
    const coach = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Users}/${data.coachId}`, {
      headers: {
        'Authorization': req.headers['authorization']
      }
    });
    data.coachName = coach.data.userName;
    if (coach.data.avatar) {
    const {data: {path}}  = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Files}/${coach.data.avatar}`);
    data.coachAvataPath = path
    }
    if (data.photoTraning) {
    const {data: {path}}  = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Files}/${data.photoTraning}`);
    data.photoTraningPath = path
    }
    if (data.videoTraning) {
      const {data: {path}}  = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Files}/${data.videoTraning}`);
      data.videoTraningPath = path
      }
   return data;
  }

  @UseGuards(CheckAuthGuard)
  @UseInterceptors(RoleCoachInterceptor)
  @UseInterceptors(CoachIdInterceptor)
  @Get('orders')
  public async showOrders(@Body() coachId: string, @Query() query: TrainingOrdersQuery) {
    console.log(query);
    const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Orders}/show/list`, {params : query, data: coachId});
   return data;
  }

  @UseGuards(CheckAuthGuard)
  @UseInterceptors(CoachIdInterceptor)
  @Get('friends/show')
  public async showFriends(@Req() req: Request, @Query() query: DefaultQuery, @Body() body) {
    const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Friends}/coach`, {
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
        const initiatorId = el.userId;
        const coachId = body.coachId;
        const requestTraining  = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Request}/show`,{data: {initiatorId, coachId}} );
        if (requestTraining.data.statusRequest === StatusRequest.Pending && requestTraining.data.typeRequest === TypeRequest.Personal) {
          el.requestPersonal = true
          el.requestId = requestTraining.data.id
        }
       }));
   return data;
  }

  @UseGuards(CheckAuthGuard)
  @UseInterceptors(RoleCoachInterceptor)
  @UseInterceptors(CoachIdInterceptor)
  @Post('friends/delete/:userId')
  public async deleteFriend(@Req() req: Request, @Param('userId', MongoidValidationPipe) userId: string) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Friends}/delete/coach/${userId}`, null, {
      headers: {
        'Authorization': req.headers['authorization']
      }
    });
   return data;
  }

  @UseGuards(CheckAuthGuard)
  @UseInterceptors(RoleCoachInterceptor)
  @UseInterceptors(CoachIdInterceptor)
  @Delete('certificate/delete/:certificateId')
  public async deleteCertificate(@Req() req: Request, @Param('certificateId', MongoidValidationPipe) certificateId: string,  @Body() body) {
    console.log(body.coachId, certificateId)
    const { data } = await this.httpService.axiosRef.delete(`${ApplicationServiceURL.Users}/certificate/delete/${certificateId}`, {
      data: {coachId: body.coachId},
      headers: {
        'Authorization': req.headers['authorization']
      }
    });
   return data;
  }

}
