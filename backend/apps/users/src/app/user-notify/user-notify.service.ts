import { Injectable} from '@nestjs/common';
import { NotifyUserRepository } from './user-notify.repository';
import { NotifyMessage } from '@project/shared/shared-types';
import { NotifyUserEntity } from './user-notify.entity';


@Injectable()
export class NotifyUserService {
  constructor(
    private readonly notifyUserRepository: NotifyUserRepository,
  ) {}

  public async create(userId: string, notifyUserId: string, notifyType: NotifyMessage ) {
    const currentDate = new Date();
    const item = {
      userId: notifyUserId,
      initiatorId: userId,
      text: notifyType,
      dateNotify: currentDate}

    const notifyUserEntity = new NotifyUserEntity(item);
    return await this.notifyUserRepository.create(notifyUserEntity);
  }

    public async getNotifyUsers(userid: string) {
    return this.notifyUserRepository.findByUserId(userid);
  }

    public async getNotifyId(id: string) {
    return this.notifyUserRepository.findById(id);
  }

  public async deleteNotify(id: string) {
    return this.notifyUserRepository.destroy(id);
  }
}
