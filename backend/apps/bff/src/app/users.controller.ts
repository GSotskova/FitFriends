import { Body, Controller, Delete, Get, Param, Post, Query, Req, UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ApplicationServiceURL } from './app.config';
import { Request } from 'express';
import { AxiosExceptionFilter } from './filters/axios-exception.filter';
import { CreateUserDto, EditUserDto, LoginUserDto } from '@project/shared/shared-dto';
import { MongoidValidationPipe } from '@project/shared/shared-pipes';
import { UseridInterceptor } from './interceptors/userid.interceptor';
import { CheckAuthGuard } from './guards/check-auth.guard';
import { CheckJwtAuthGuard } from './guards/check-jwt-auth.guard';
import { UserIsAuthInterceptor } from './interceptors/user-is-auth.interceptor';
import { RoleUserInterceptor } from './interceptors/role-user.interceptor';
import { UsersQuery } from '@project/shared/shared-query';
import { UseridNotifyInterceptor } from './interceptors/userid-notify.interceptor';

@Controller('users')
@UseFilters(AxiosExceptionFilter)
export class UsersController {
  constructor(
    private readonly httpService: HttpService
  ) {}
  @Post('register')
  public async create(@Body() createUserDto: CreateUserDto) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Auth}/register`, createUserDto);
    return data;
  }

  @UseGuards(CheckJwtAuthGuard)
  @UseInterceptors(UserIsAuthInterceptor)
  @Post('login')
  public async login(@Body() loginUserDto: LoginUserDto ) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Auth}/login`, loginUserDto);
    return data;
  }

  @UseGuards(CheckAuthGuard)
  @UseInterceptors(UseridInterceptor)
  @Get('login/auth')
  public async loginUser(@Req() req: Request, @Body() body) {
    const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Users}/${body.userId}`, {
      headers: {
        'Authorization': req.headers['authorization']
      }
    });
    if (data.avatar) {
    const {data: {path}}  = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Files}/${data.avatar}`);
    data.avatarPath = path
    }
    if (data.certificate) {
      data.certificatesPath=[];
      await Promise.all(data.certificate.map(async (el) => {
         const {data: {path}}  = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Files}/${el}`);
         data.certificatesPath.push({certificateId: el, certificatePath: path});
         }));
      }
    return {...data};
}

  @Post('refresh')
  public async refreshToken(@Req() req: Request) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Auth}/refresh`, null, {
      headers: {
        'Authorization': req.headers['authorization']
      }
    });

    return data;
  }


  @Post('refresh/delete')
  public async deleteRefreshToken(@Req() req: Request) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Auth}/refresh/delete`, null, {
      headers: {
        'Authorization': req.headers['authorization']
      }
    });

    return data;
  }

  @UseGuards(CheckAuthGuard)
  @UseInterceptors(UseridInterceptor)
  @Get('/:id')
  public async show(@Req() req: Request, @Param('id', MongoidValidationPipe) id: string) {
    const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Users}/${id}`,  {
      headers: {
        'Authorization': req.headers['authorization']
      }
    });
    return data;
}



  @UseGuards(CheckAuthGuard)
  @Post('edit')
  public async edit(@Req() req: Request, @Body() editUserDto: EditUserDto) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Users}/edit`, editUserDto, {
      headers: {
        'Authorization': req.headers['authorization']
      }
    });
    return data;
}

@UseGuards(CheckAuthGuard)
@UseInterceptors(RoleUserInterceptor)
@Get('')
public async showList(@Req() req: Request, @Query() query: UsersQuery) {
  const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Users}`,  {
    params : query,
    headers: {
      'Authorization': req.headers['authorization']
    }
  });
  return data;
}


@UseGuards(CheckAuthGuard)
@UseInterceptors(UseridInterceptor)
@Get('notify/show')
public async showNotifyUser(@Req() req: Request) {
  const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Users}/notify/show`,  {
    headers: {
      'Authorization': req.headers['authorization']
    }
  });
  return data;
}

@UseGuards(CheckAuthGuard)
@UseInterceptors(UseridInterceptor)
@UseInterceptors(UseridNotifyInterceptor)
@Delete('notify/delete/:id')
public async deleteNotifyById(@Req() req: Request, @Param('id', MongoidValidationPipe) id: string) {
  const { data } = await this.httpService.axiosRef.delete(`${ApplicationServiceURL.Users}/notify/delete/${id}`,
    {
      headers: {
        'Authorization': req.headers['authorization']
      }
    }
  );
  return data;
}


@Post('check/email')
public async checkEmail(@Body() email: string) {
  const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Auth}/check/email`, email);
  return data;
}

}
