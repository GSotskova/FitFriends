import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';

@Injectable()
export class CoachIdInterceptor implements NestInterceptor {
  public intercept(context: ExecutionContext, next: CallHandler) {
    const request = context.switchToHttp().getRequest();
    request.body['coachId'] = request.user.sub;
    return next.handle();
  }
}
