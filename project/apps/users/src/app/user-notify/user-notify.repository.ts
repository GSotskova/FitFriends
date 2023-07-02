import { CRUDRepository } from '@project/util/util-types';
import { Injectable } from '@nestjs/common';
import { NotifyUser } from '@project/shared/shared-types';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { NotifyUserEntity } from './user-notify.entity';
import { NotifyUserModel } from './user-notify.model';
import { LIMIT_SHOW_NOTIFY } from './user-notify.constant';


@Injectable()
export class NotifyUserRepository implements CRUDRepository<NotifyUserEntity, string, NotifyUser> {
  constructor(
    @InjectModel(NotifyUserModel.name) private readonly notifyDateModel: Model<NotifyUserModel>) {
  }

  public async create(item: NotifyUserEntity): Promise<NotifyUser> {
    const newNotifyUser = new this.notifyDateModel(item);
    return newNotifyUser.save();
  }

  public async destroy(id: string): Promise<void> {
    await this.notifyDateModel.deleteOne({_id: id});
  }

  public async findById(id: string): Promise<NotifyUser | null> {
     return this.notifyDateModel
      .findOne({_id: id})
      .exec();
  }


  public async findByUserId(userId: string): Promise<NotifyUser[]> {
    return this.notifyDateModel
     .find({userId})
     .sort({dateNotify: -1})
      .limit( LIMIT_SHOW_NOTIFY )
     .exec();
 }

  public async update(id: string, item: NotifyUserEntity): Promise<NotifyUser> {
    return this.notifyDateModel
      .findByIdAndUpdate(id, item.toObject(), {new: true})
      .exec();
  }
}
