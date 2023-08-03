import { CRUDRepository } from '@project/util/util-types';
import { Injectable } from '@nestjs/common';
import { Friend} from '@project/shared/shared-types';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { FriendEntity } from './friends.entity';
import { FriendModel } from './friends.model';
import {  DefaultQuery } from '@project/shared/shared-query';
import { getDefaultQuery } from '@project/util/util-core';

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
    const objQuery= getDefaultQuery(query)

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
    { "$unwind": {"path": "$result", "preserveNullAndEmptyArrays": true} },
    {
      $lookup: {
        from: 'questionnairesUser',
        localField: 'friendId',
        foreignField: 'userId',
        as: 'resultUser'
      },
    },
    { "$unwind": {"path": "$resultUser", "preserveNullAndEmptyArrays": true}
    },
    {
      $lookup: {
        from: 'questionnairesCoach',
        localField: 'friendId',
        foreignField: 'userId',
        as: 'resultCoach'
      },
    },
    { "$unwind": {"path": "$resultCoach", "preserveNullAndEmptyArrays": true}
    },
    {
      $project:{
          _id : 1,
          userId: '$friendId',
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
          trainingType : {
            $cond: [
              {
                  "$ifNull": [
                      "$resultUser.trainingType",
                       false
                  ]
              },
              "$resultUser.trainingType",
              "$resultCoach.trainingType"
          ]
          },

          isReady: {
            $cond: [
              {
                  "$ifNull": [
                      "$resultUser.isReady",
                       false
                  ]
              },
              "$resultUser.isReady",
              "$resultCoach.isPersonal"
          ]
          }
      }
    },
    { $unset: 'result' },
    { $unset: 'resultUser' },
    { $unset: 'resultCoach' },
    { $sort:  objQuery.objSort },
    { $limit: objQuery.skip + objQuery.limitNumber},
    { $skip:  objQuery.skip }
    ])
      .exec();
  }

  public async findByFriendId(friendId: string, query: DefaultQuery): Promise<Friend[]> {
    const objQuery= getDefaultQuery(query)

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
    { "$unwind": {"path": "$result", "preserveNullAndEmptyArrays": true} },
    {
      $lookup: {
        from: 'questionnairesUser',
        localField: 'userId',
        foreignField: 'userId',
        as: 'resultUser'
      },
    },
    { "$unwind": {"path": "$resultUser", "preserveNullAndEmptyArrays": true}
    },
    {
      $project:{
          _id : 1,
          userId: '$userId',
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
          trainingType : "$resultUser.trainingType",
          isReady : "$resultUser.isReady"
      }
    },
    { $unset: 'result' },
    { $sort:  objQuery.objSort },
    { $limit: objQuery.skip + objQuery.limitNumber},
    { $skip:  objQuery.skip }
    ])
      .exec();
  }

  public async update(id: string, item: FriendEntity): Promise<Friend> {
    return this.friendModel
      .findByIdAndUpdate(id, item.toObject(), {new: true})
      .exec();
  }

}
