import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ApplicationServiceURL } from '../app.config';

@Injectable()
export class CheckJwtAuthGuard implements CanActivate {
  constructor(
    private readonly httpService: HttpService,
  ) {}

  public async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Auth}/isAuth`, {}, {
      headers: {
        'Authorization': request.headers['authorization']
      }
    })

    request['user'] = data;
    return true;
  }
}


