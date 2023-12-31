import { Body, Controller, Get, Param, Post, Query, Req, UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ApplicationServiceURL } from './app.config';
import { AxiosExceptionFilter } from './filters/axios-exception.filter';
import { DefaultQuery, TrainingCatalogQuery, TrainingQuery} from '@project/shared/shared-query';
import { CheckAuthGuard } from './guards/check-auth.guard';
import { RoleUserInterceptor } from './interceptors/role-user.interceptor';
import { CommentDto } from '@project/shared/shared-dto';
import { UseridInterceptor } from './interceptors/userid.interceptor';



@Controller('training')
@UseFilters(AxiosExceptionFilter)
export class TrainingGeneralController {
  constructor(
    private readonly httpService: HttpService
  ) {}


  @UseGuards(CheckAuthGuard)
  @Get('catalog')
  public async showCatalog(@Query() query: TrainingCatalogQuery) {
    const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Training}/show/catalog`, {params : query});
   return data;
  }


  @UseGuards(CheckAuthGuard)
  @Get('count')
  public async countTraining() {
    const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Training}/show/catalog`);
    const prices = data.map((el) => el.price ? el.price : 0);
    const maxPrice = prices.length !== 0 ? prices.reduce((prev, current) => (prev > current) ? prev : current) : 0;
   return {totalTrainings: data.length, maxPrice: maxPrice};
  }

  @UseGuards(CheckAuthGuard)
  @UseInterceptors(RoleUserInterceptor)
  @UseInterceptors(UseridInterceptor)
  @Post('/comments/create/:id')
  public async createComment(@Param('id') id: string, @Body() dto: CommentDto) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Comments}/create/${id}`, dto);
   return data;
  }

  @UseGuards(CheckAuthGuard)
  @Get('/comments/:id')
  public async showCommentsByTraining(@Req() req: Request, @Param('id') id: string, @Query() query: DefaultQuery) {
    const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Comments}/${id}`, {params : query});

    await Promise.all(data.map(async (el) => {
      const user = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Users}/${el.userId}`, {
        headers: {
          'Authorization': req.headers['authorization']
        }
      });
      el.userName = user.data.userName;
      if (user.data.avatar) {
      const {data: {path}}  = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Files}/${user.data.avatar}`);
      el.avatarPath = path
      }
       }));
   return data;
  }


  @UseGuards(CheckAuthGuard)
  @Get('coach/:coachId')
  public async showList(@Query() query: TrainingQuery, @Param('coachId') coachId: string) {
    const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Training}/show/coach/list/${coachId}`, {params : query});
     return data;
  }

}
