import { Controller,  Param,  Post,   Req,   UseFilters, UseGuards, UseInterceptors, UploadedFile, Get, Body } from '@nestjs/common';
import { AxiosExceptionFilter } from './filters/axios-exception.filter';
import { HttpService } from '@nestjs/axios';
import { ApplicationServiceURL } from './app.config';
import { UseridInterceptor } from './interceptors/userid.interceptor';
import { CheckAuthGuard } from './guards/check-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import 'multer';
import FormData from 'form-data';
import { UseridTrainingInterceptor } from './interceptors/userid-tarining.interceptor';
import { CoachIdInterceptor } from './interceptors/coachId.interceptor';
import { RoleCoachInterceptor } from './interceptors/role-coach.interceptor';


@Controller('files')
@UseFilters(AxiosExceptionFilter)
export class UploaderController {

  constructor(
    private readonly httpService: HttpService,
  ) {}

  @UseGuards(CheckAuthGuard)
  @UseInterceptors(UseridInterceptor)
  @Post('/avatar')
  @UseInterceptors(FileInterceptor('file'))
  public async postAvatar(@Req() req: Request, @UploadedFile() file: Express.Multer.File) {
    const formData = new FormData();
    formData.append('file', Buffer.from(file.buffer), {filename: file.originalname, contentType: file.mimetype});

    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Uploads}/avatar/${req.body['userId']}`,
    formData,
    {headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return data;
  }

  @UseGuards(CheckAuthGuard)
  @UseInterceptors(UseridInterceptor)
  @Post('/user/background')
  @UseInterceptors(FileInterceptor('file'))
  public async postBackground(@Req() req: Request, @UploadedFile() file: Express.Multer.File) {
    const formData = new FormData();
    formData.append('file', Buffer.from(file.buffer), {filename: file.originalname, contentType: file.mimetype});

    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Uploads}/background/${req.body['userId']}`,
    formData,
    {headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return data;
  }

  @UseGuards(CheckAuthGuard)
  @UseInterceptors(CoachIdInterceptor)
  @UseInterceptors(RoleCoachInterceptor)
  @Post('/coach/certificate')
  @UseInterceptors(FileInterceptor('certificate'))
  public async postCertificate(@Req() req: Request, @UploadedFile() file: Express.Multer.File) {
    const formData = new FormData();
    formData.append('certificate', Buffer.from(file.buffer), {filename: file.originalname, contentType: file.mimetype});

    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Uploads}/certificate/${req.body['coachId']}`,
    formData,
    {headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return data;
  }

  @UseGuards(CheckAuthGuard)
  @UseInterceptors(CoachIdInterceptor)
  @UseInterceptors(RoleCoachInterceptor)
  @Post('/coach/certificate/update')
  @UseInterceptors(FileInterceptor('certificate'))
  public async updateCertificate(@Req() req: Request, @UploadedFile() file: Express.Multer.File, @Body() body) {
    console.log(file, 'certificateId', body.certificateId)
    const formData = new FormData();
    formData.append('certificate', Buffer.from(file.buffer), {filename: file.originalname, contentType: file.mimetype});
    formData.append('certificateId', body.certificateId);
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Uploads}/certificate/update/${req.body['coachId']}`,
    formData,
    {headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return data;
  }

  @UseGuards(CheckAuthGuard)
  @UseInterceptors(RoleCoachInterceptor)
  @Post('/image/training/:id')
  @UseInterceptors(UseridTrainingInterceptor)
  @UseInterceptors(FileInterceptor('image'))
  public async postImage(@UploadedFile() file: Express.Multer.File,@Param('id') id: string) {
    const formData = new FormData();
     formData.append('image', Buffer.from(file.buffer), {filename: file.originalname,contentType: file.mimetype});

    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Uploads}/image/${id}`,
    formData,
    { headers: {
        'Content-Type': 'multipart/form-data'
      }
  });
    return data;
  }

  @UseGuards(CheckAuthGuard)
  @UseInterceptors(RoleCoachInterceptor)
  @Post('/video/training/:id')
  @UseInterceptors(UseridTrainingInterceptor)
  @UseInterceptors(FileInterceptor('video'))
  public async postVideo(@UploadedFile() file: Express.Multer.File,@Param('id') id: string) {

    const formData = new FormData();
     formData.append('video', Buffer.from(file.buffer), {filename: file.originalname,contentType: file.mimetype});

    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Uploads}/video/${id}`,
    formData,
    { headers: {
        'Content-Type': 'multipart/form-data'
      }
  });
    return data;
  }


  @Get(':id')
  public async show(@Param('id') id: string) {
    const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Files}/${id}`);
    return data;
  }
}
