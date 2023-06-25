import { CallHandler, ConflictException, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';


@Injectable()
export class UseridInterceptor implements NestInterceptor {

  public async intercept(context: ExecutionContext, next: CallHandler) {
    const request = context.switchToHttp().getRequest();
    if (request.user.sub !== request.params.id) {
      throw new ConflictException('Пользователи могут редактировать и удалять только свои данные')
    }
    return next.handle();
  }
}
