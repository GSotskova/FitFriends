import { CRUDRepository } from '@project/util/util-types';
import { Injectable } from '@nestjs/common';
import { UserEntity } from './user-info.entity';
import { QuestionnaireCoach, QuestionnaireUser, SomeObject, User } from '@project/shared/shared-types';
import { UserModel } from './user-info.model';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UsersQuery } from '@project/shared/shared-query';

@Injectable()
export class UserRepository implements CRUDRepository<UserEntity, string, User> {
  constructor(
    @InjectModel(UserModel.name) private readonly userModel: Model<UserModel>) {
  }

  public async create(item: UserEntity): Promise<User> {
    const newUser = new this.userModel(item);
    return newUser.save();
  }

  public async destroy(id: string): Promise<void> {
    this.userModel.deleteOne({_id: id});
  }

  public async findById(id: string): Promise<User | null> {
    return this.userModel
      .findOne({_id: id})
      .exec();
  }

  public async findByEmail(email: string): Promise<User | null> {
    return this.userModel
      .findOne({email})
      .exec();
  }

  public async update(id: string, item: UserEntity): Promise<User> {
    return this.userModel
      .findByIdAndUpdate(id, item.toObject(), {new: true})
      .exec();
  }

  public async getInfoCoach(id: string): Promise<User & QuestionnaireCoach> {
    const coachInfo = await this.userModel
    .aggregate([
      {$match: { _id: id}},
      { $addFields: { user_id: id}},
      {
        $lookup: {
          from: 'questionnairesCoach',
          let: { user_id: '$_id' },
          pipeline: [
            { $addFields: { userId: { '$toObjectId': '$userId' }}},
            { $match: { $expr: { $eq: [ '$userId', '$$user_id' ] } } }
          ],
          as: 'result'
        },
      },
      {$unwind: '$result'},
      {
        $project:{
            _id : 1,
            userName : 1,
            email : 1,
            avatar : 1,
            sex : 1,
            dateBirth : 1,
            role : 1,
            description : 1,
            location : 1,
            backgroundImg : 1,
            levelTraining : "$result.levelTraining",
            trainingType : "$result.trainingType",
            certificate : "$result.certificate",
            successCoach : "$result.successCoach",
            isPersonal : "$result.isPersonal",
        }
    }
    ]).exec();
    return coachInfo[0];
  }

  public async getInfoUser(id: string): Promise<User & QuestionnaireUser> {

    const userInfo = await this.userModel
    .aggregate([
      {$match: { _id: id}},
      {
        $lookup: {
          from: 'questionnairesUser',
          let: { user_id: '$_id' },
          pipeline: [
            { $addFields: { userId: { '$toObjectId': '$userId' }}},
            { $match: { $expr: { $eq: [ '$userId', '$$user_id' ] } } }
          ],
          as: 'result'
        },
      },
      {$unwind: '$result'},
      {
        $project:{
            _id : 1,
            userName : 1,
            email : 1,
            avatar : 1,
            passwordHash: 1,
            sex : 1,
            dateBirth : 1,
            role : 1,
            description : 1,
            location : 1,
            backgroundImg : 1,
            levelTraining : "$result.levelTraining",
            trainingType : "$result.trainingType",
            trainingTime : "$result.trainingTime",
            caloriesReset : "$result.caloriesReset",
            caloriesSpend : "$result.caloriesSpend",
            isReady : "$result.isReady",
        }
    }

    ]).exec();
    return userInfo[0];
  }

  public async findAll(query: UsersQuery): Promise<User[]> {
    const {limit, userRole, location, trainingType, levelTraining, page}= query;
    const pageNum = page? (page-1) : 0;
    const skip = pageNum*limit;

    const objFiltr: SomeObject = {};
      if (query.location) {objFiltr.location = location;}
      if (query.levelTraining) {objFiltr.levelTraining = levelTraining;}
      if (query.userRole) {objFiltr.userRole = userRole;}
      if (query.trainingType) {objFiltr.trainingType = { "$in": trainingType };}

      const usersInfo =  await this.userModel
     .aggregate([
      {
        $lookup: {
          from: 'questionnairesUser',
          let: { user_id: '$_id' },
          pipeline: [
            { $addFields: { userId: { '$toObjectId': '$userId' }}},
            { $match: { $expr: { $eq: [ '$userId', '$$user_id' ] } } },
            { $project: { levelTraining: 1, trainingType: 1}}
          ],
          as: 'resultUser'
        },
      },
      { "$unwind": {"path": "$resultUser", "preserveNullAndEmptyArrays": true}
      },
      { $addFields: { levelTraining: "$resultUser.levelTraining"}},
      {
        $lookup: {
          from: 'questionnairesCoach',
          let: { user_id: '$_id' },
          pipeline: [
            { $addFields: { userId: { '$toObjectId': '$userId' }}},
            { $match: { $expr: { $eq: [ '$userId', '$$user_id' ] } } },
            { $project: { levelTraining: 1, trainingType: 1}}
          ],
          as: 'resultCoach'
        },
      },
     { "$unwind": {"path": "$resultCoach","preserveNullAndEmptyArrays": false}
     },
     { $addFields: {
      levelTraining: {
      $cond: [
          {
              "$ifNull": [
                  "$resultUser.levelTraining",
                   false
              ]
          },
          "$resultUser.levelTraining",
          "$resultCoach.levelTraining"
      ]
    },
    trainingType: {
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
  }
}
},
     { $limit: skip + limit},
      { $skip:  skip },
      {$match: objFiltr }
     ])
    .exec();

  return usersInfo
  }


  public async updateAvatar(id: string, fileId: string): Promise<User> {
    return this.userModel
      .findByIdAndUpdate(id, {avatar: fileId}, {new: true})
      .exec();
  }

  public async updateBackgroundImg(id: string, fileId: string): Promise<User> {
    return this.userModel
      .findByIdAndUpdate(id, {backgroundImg: fileId}, {new: true})
      .exec();
  }
}
