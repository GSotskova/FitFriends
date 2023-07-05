import { CRUDRepository } from '@project/util/util-types';
import { Injectable } from '@nestjs/common';
import { Friend, SomeObject} from '@project/shared/shared-types';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { FriendEntity } from './friends.entity';
import { FriendModel } from './friends.model';
import { DEFAULT_LIST_COUNT_LIMIT, DefaultQuery } from '@project/shared/shared-query';

@Injectable()
export class FriendRepository implements CRUDRepository<FriendEntity, string, Friend> {
  constructor(
    @InjectModel(FriendModel.name) private readonly friendModel: Model<FriendModel>) {
  }

  public async create(item: FriendEntity): Promise<Friend> {
    const newFriend = new this.friendModel(item);
    return newFriend.save();
  }

  public async destroy(id: string): Promise<void> {
    await this.friendModel.deleteOne({_id: id});
  }

  public async findById(id: string): Promise<Friend | null> {
    return this.friendModel
      .findOne({_id: id})
      .exec();
  }
  public async findId(friendId: string, userId: string): Promise<Friend | null> {
    return this.friendModel
      .findOne({friendId: friendId, userId: userId})
      .exec();
  }

  public async findByUserId(userId: string, query: DefaultQuery): Promise<Friend[]> {
    const limitCount = query.limit ?? DEFAULT_LIST_COUNT_LIMIT;
    const pageNum = query.page? (query.page-1) : 0;
    const skip = pageNum*limitCount;

    const objSort: SomeObject = {};
    if (query.sortDate) {objSort.createdAt =  query.sortDate}
    else {objSort.createdAt = 1}

    return this.friendModel
    .aggregate([
      {$match: {userId: userId}},
      {
        $addFields: {
          friendObjectId: {'$toObjectId': '$friendId'}
        }
      },
      {$lookup: {
        from: 'users',
        localField: 'friendObjectId',
        foreignField: '_id',
        as: 'result'
      },
    },
    { $unwind: '$result',},
    {
      $project:{
          _id : 1,
          createdAt: {$dateToString:{format:"%Y-%m-%d %H:%M:%S",date:"$createdAt"}},
          userName : "$result.userName",
          email : "$result.email",
          avatar : "$result.avatar",
          sex : "$result.sex",
          dateBirth : "$result.dateBirth",
          role : "$result.role",
          description : "$result.description",
          location : "$result.location",
          backgroundImg : "$result.backgroundImg",
      }
    },
    { $unset: 'result' },
    { $sort:  objSort },
    { $limit: skip + limitCount},
    { $skip:  skip }
    ])
      .exec();
  }

  public async findByFriendId(friendId: string, query: DefaultQuery): Promise<Friend[]> {
    const limitCount = query.limit ?? DEFAULT_LIST_COUNT_LIMIT;
    const pageNum = query.page? (query.page-1) : 0;
    const skip = pageNum*limitCount;

    const objSort: SomeObject = {};
    if (query.sortDate) {objSort.createdAt =  query.sortDate}
    else {objSort.createdAt = 1}

    return this.friendModel
    .aggregate([
      {$match: {friendId: friendId}},
      {
        $addFields: {
          userObjectId: {'$toObjectId': '$userId'}
        }
      },
      {$lookup: {
        from: 'users',
        localField: 'userObjectId',
        foreignField: '_id',
        as: 'result'
      },
    },
    { $unwind: '$result',},
    {
      $project:{
          _id : 1,
          createdAt: {$dateToString:{format:"%Y-%m-%d %H:%M:%S",date:"$createdAt"}},
          userName : "$result.userName",
          email : "$result.email",
          avatar : "$result.avatar",
          sex : "$result.sex",
          dateBirth : "$result.dateBirth",
          role : "$result.role",
          description : "$result.description",
          location : "$result.location",
          backgroundImg : "$result.backgroundImg",
      }
    },
    { $unset: 'result' },
    { $sort:  objSort },
    { $limit: skip + limitCount},
    { $skip:  skip }
    ])
      .exec();
  }

  public async update(id: string, item: FriendEntity): Promise<Friend> {
    return this.friendModel
      .findByIdAndUpdate(id, item.toObject(), {new: true})
      .exec();
  }

}
