import {
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class CheckJwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(
    err: any,
    userToken: any,
    info: any,
    context: ExecutionContext
    ) {
    const request = context.switchToHttp().getRequest();
    if (request.headers['authorization']) {
      request.body['token'] = request.headers['authorization'].split(" ")[1]
      request.body['userIdAuth'] = userToken.sub;
    }
    return userToken
  }
}
