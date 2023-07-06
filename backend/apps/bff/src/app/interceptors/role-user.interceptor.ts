import { CallHandler, ConflictException, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { UserRole } from '@project/shared/shared-types';


@Injectable()
export class RoleUserInterceptor implements NestInterceptor {

  public async intercept(context: ExecutionContext, next: CallHandler) {
    const request = context.switchToHttp().getRequest();
    if (request.user.role !== UserRole.User) {
      throw new ConflictException('Доступно  только для пользователей с ролью «Пользователь»')
    }
    return next.handle();
  }
}
