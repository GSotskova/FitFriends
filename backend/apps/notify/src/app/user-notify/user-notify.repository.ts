import { CRUDRepository } from '@project/util/util-types';
import { NotifyMessage, NotifyUser } from '@project/shared/shared-types';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserNotifyEntity } from './user-notify.entity';
import { UserNotifyModel } from './user-notify.model';

@Injectable()
export class UserNotifyRepository implements CRUDRepository<UserNotifyEntity, string, NotifyUser> {
  constructor(
    @InjectModel(UserNotifyModel.name) private readonly userNotifyModel: Model<UserNotifyModel>
  ) {}

  public async create(item: UserNotifyEntity): Promise<NotifyUser> {
    const newUserNotify = new this.userNotifyModel(item);
    return newUserNotify.save();
  }

  public async destroy(id: string): Promise<void> {
    this.userNotifyModel
      .deleteOne({ _id: id });
  }

  public async findById(id: string): Promise<NotifyUser | null> {
    return this.userNotifyModel
      .findOne({ _id: id })
      .exec();
  }

  public async update(id: string, item: UserNotifyEntity): Promise<NotifyUser> {
    return this.userNotifyModel
      .findByIdAndUpdate(id, item.toObject(), { new: true })
      .exec();
  }

  public async find(userId: string, initiatorId: string, text: NotifyMessage, dateNotify: Date): Promise<NotifyUser | null> {
    return this.userNotifyModel
      .findOne({ userId, dateNotify, initiatorId, text })
      .exec()
  }
}
