import { Body, Controller, Get, Param, Post, Query, Req, UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ApplicationServiceURL } from './app.config';
import { Request } from 'express';
import { AxiosExceptionFilter } from './filters/axios-exception.filter';
import { CreateUserDto, LoginUserDto } from '@project/shared/shared-dto';
import { MongoidValidationPipe } from '@project/shared/shared-pipes';
import { UseridInterceptor } from './interceptors/userid.interceptor';
import { CheckAuthGuard } from './guards/check-auth.guard';
import { CheckJwtAuthGuard } from './guards/check-jwt-auth.guard';
import { UserIsAuthInterceptor } from './interceptors/user-is-auth.interceptor';
import { RoleUserInterceptor } from './interceptors/role-user.interceptor';
import { UsersQuery } from '@project/shared/shared-query';

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

  @Post('refresh')
  public async refreshToken(@Req() req: Request) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Auth}/refresh`, null, {
      headers: {
        'Authorization': req.headers['authorization']
      }
    });

    return data;
  }

  @UseGuards(CheckAuthGuard)
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
  public async edit(@Req() req: Request) {
    console.log('edit')
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Users}/edit`, null, {
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
  console.log(query)
  const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Users}`,  {
    params : query,
    headers: {
      'Authorization': req.headers['authorization']
    }
  });
  return data;
}

}
