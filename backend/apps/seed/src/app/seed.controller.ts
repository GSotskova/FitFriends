import { Body, Controller, Param, Post, UploadedFile, UseFilters, UseInterceptors } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ApplicationServiceURL } from './app.config';
import { AxiosExceptionFilter } from './filters/axios-exception.filter';
import { FileInterceptor } from '@nestjs/platform-express';
import 'multer';
import FormData from 'form-data';

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

  @Post('/avatar/:id')
  @UseInterceptors(FileInterceptor('file'))
  public async postAvatar(@Param('id') id: string, @UploadedFile() file: Express.Multer.File) {
    const formData = new FormData();
    formData.append('file', Buffer.from(file.buffer), {filename: file.originalname, contentType: file.mimetype});

    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Uploads}/avatar/${id}`,
    formData);
    return data;
  }

  @Post('/coach/certificate/:id')
  @UseInterceptors(FileInterceptor('certificate'))
  public async postCertificate(@Param('id') id: string, @UploadedFile() file: Express.Multer.File) {
    const formData = new FormData();
    formData.append('certificate', Buffer.from(file.buffer), {filename: file.originalname, contentType: file.mimetype});

    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Uploads}/certificate/${id}`,
    formData);
    return data;
  }

  @Post('/video/training/:id')
  @UseInterceptors(FileInterceptor('video'))
  public async postVideo(@UploadedFile() file: Express.Multer.File,@Param('id') id: string) {

    const formData = new FormData();
     formData.append('video', Buffer.from(file.buffer), {filename: file.originalname,contentType: file.mimetype});

    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Uploads}/video/${id}`,
    formData);
    return data;
  }

  @Post('orders/create')
  public async createOrder(@Body() test_orders) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Orders}/test`, test_orders);
   return data;
  }

  @Post('friends/add')
  public async addFriend(@Body() test_friends) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Friends}/test`, test_friends);
   return data;
  }
}
