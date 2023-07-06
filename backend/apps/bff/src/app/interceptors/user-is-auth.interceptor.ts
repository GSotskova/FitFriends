import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';

@Injectable()
export class UserIsAuthInterceptor implements NestInterceptor {
  public intercept(context: ExecutionContext, next: CallHandler) {
    const request = context.switchToHttp().getRequest();
    if (request.headers['authorization']) {
      request.body['token'] = request.headers['authorization'].split(" ")[1]
      request.body['userIdAuth'] = request.user.sub;
    }
    return next.handle();
  }
}
