import { Injectable } from '@nestjs/common';
import { NotifyUserDto } from '@project/shared/shared-dto';
import { UserNotifyRepository } from './user-notify.repository';
import { UserNotifyEntity } from './user-notify.entity';

@Injectable()
export class UserNotifyService {
  constructor(
    private readonly userNotifyRepository: UserNotifyRepository
  ) {}

  public async addNotifyUser(dto: NotifyUserDto) {
    const { userId, dateNotify, initiatorId, text } = dto;
    const existsNotify = await this.userNotifyRepository.find(userId, initiatorId, text, dateNotify);
    if (existsNotify) {
      return existsNotify;
    }
    return this.userNotifyRepository
      .create(new UserNotifyEntity(dto));
  }
}
