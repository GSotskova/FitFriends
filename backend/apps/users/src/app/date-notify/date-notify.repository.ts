import { CRUDRepository } from '@project/util/util-types';
import { Injectable } from '@nestjs/common';
import { NotifyDate } from '@project/shared/shared-types';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { NotifyDateEntity } from './date-notify.entity';
import { NotifyDateModel } from './date-notify.model';


@Injectable()
export class NotifyDateRepository implements CRUDRepository<NotifyDateEntity, string, NotifyDate> {
  constructor(
    @InjectModel(NotifyDateModel.name) private readonly notifyDateModel: Model<NotifyDateModel>) {
  }

  public async create(item: NotifyDateEntity): Promise<NotifyDate> {
    const newNotifyDate = new this.notifyDateModel(item);
    return newNotifyDate.save();
  }

  public async destroy(id: string): Promise<void> {
    this.notifyDateModel.deleteOne({id});
  }

  public async findById(id: string): Promise<NotifyDate | null> {
     return this.notifyDateModel
      .findOne({_id: id})
      .exec();
  }


  public async findByUserId(userId: string): Promise<NotifyDate | null> {
    return this.notifyDateModel
     .findOne({userId})
     .exec();
 }

  public async createOrUpdate(item: NotifyDateEntity): Promise<NotifyDate> {
    const existsNotify = await this.notifyDateModel.findOne({userId: item.userId}).exec();

    if (existsNotify) {
      return this.notifyDateModel.findByIdAndUpdate(existsNotify.id, item.toObject(), {new: true}).exec();

    }
    const newNotifyDate = new this.notifyDateModel(item);
    return newNotifyDate.save();
  }

  public async update(id: string, item: NotifyDateEntity): Promise<NotifyDate> {
    return this.notifyDateModel
      .findByIdAndUpdate(id, item.toObject(), {new: true})
      .exec();
  }
}
