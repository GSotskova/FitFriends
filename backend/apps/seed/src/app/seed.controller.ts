import { Body, Controller, Post, UseFilters } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ApplicationServiceURL } from './app.config';
import { AxiosExceptionFilter } from './filters/axios-exception.filter';


@Controller('seed')
@UseFilters(AxiosExceptionFilter)
export class SeedController {
  constructor(
    private readonly httpService: HttpService
  ) {}
  @Post('users')
  public async addUsers(@Body() test_users) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Users}/test`, test_users);
    return data;
  }
  @Post('training')
  public async addTraining(@Body() test_training) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Training}/test`, test_training);
    return data;
  }

  @Post('comments')
  public async addComments(@Body() test_comments) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Comments}/test`, test_comments);
    return data;
  }
}
