import { CRUDRepository } from '@project/util/util-types';
import { Injectable } from '@nestjs/common';
import { UsersSubscriptionsEntity } from './users-subscriptions.entity';
import { UserSubscription } from '@project/shared/shared-types';
import { UsersSubscriptionsModel } from './users-subscriptions.model';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';


@Injectable()
export class UsersSubscriptionsRepository implements CRUDRepository<UsersSubscriptionsEntity, string, UserSubscription> {
  constructor(
    @InjectModel(UsersSubscriptionsModel.name) private readonly usersSubscriptionsModel: Model<UsersSubscriptionsModel>) {
  }

  public async create(item: UsersSubscriptionsEntity): Promise<UserSubscription> {
    const newUsersSubscriptions = new this.usersSubscriptionsModel(item);
    return newUsersSubscriptions.save();
  }

  public async destroy(id: string): Promise<void> {
    this.usersSubscriptionsModel.deleteOne({id});
  }

  public async delete(userId: string, coachId:string): Promise<UserSubscription> {
    const result = await this.usersSubscriptionsModel.findOneAndDelete({userId: userId, coachId: coachId});
    return result
  }

  public async findById(id: string): Promise<UserSubscription | null> {
     return this.usersSubscriptionsModel
      .findOne({_id: id})
      .exec();
  }

  public async findByUserId(userId: string): Promise<UserSubscription[]> {
    return this.usersSubscriptionsModel
     .find({userId: userId})
     .exec();
 }

  public async findBycoachId(coachId: string): Promise<UserSubscription[]> {
    return this.usersSubscriptionsModel
     .find({coachId: coachId})
     .exec();
 }

 public async findSubscriptionByUserId(userId: string, coachId:string): Promise<UserSubscription> {
  return this.usersSubscriptionsModel
   .findOne({userId: userId, coachId: coachId})
   .exec();
}

  public async update(id: string, item: UsersSubscriptionsEntity): Promise<UserSubscription> {
    return this.usersSubscriptionsModel
      .findByIdAndUpdate(id, item.toObject(), {new: true})
      .exec();
  }
}
