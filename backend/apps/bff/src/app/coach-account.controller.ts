import { Body, Controller, Get, Param, Post, Query, Req, UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
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

        console.log(path, el.photoTraning)
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
  public async show(@Param('id', MongoidValidationPipe) id: string) {
    const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Training}/${id}`);
   return data;
  }

  @UseGuards(CheckAuthGuard)
  @UseInterceptors(RoleCoachInterceptor)
  @UseInterceptors(CoachIdInterceptor)
  @Get('orders')
  public async showOrders(@Body() coachId: string, @Query() query: TrainingOrdersQuery) {
    const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Orders}/show/list`, {params : query, data: coachId});
   return data;
  }

  @UseGuards(CheckAuthGuard)
  @UseInterceptors(CoachIdInterceptor)
  @Get('friends/show')
  public async showFriends(@Req() req: Request, @Query() query: DefaultQuery) {
    const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Friends}/coach`, {
      params : query,
      headers: {
        'Authorization': req.headers['authorization']
      }
    });
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
}
