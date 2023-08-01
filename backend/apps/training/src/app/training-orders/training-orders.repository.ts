import { CRUDRepository } from '@project/util/util-types';
import { Injectable } from '@nestjs/common';
import { Order } from '@project/shared/shared-types';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { TrainingOrdersQuery } from '@project/shared/shared-query';
import { TrainingOrdersEntity } from './training-orders.entity';
import { TrainingOrdersModel } from './training-orders.model';
import { getTrainingOrdersQuery } from '@project/util/util-core';

@Injectable()
export class TrainingOrdersRepository implements CRUDRepository<TrainingOrdersEntity, string, Order> {
  constructor(
    @InjectModel(TrainingOrdersModel.name) private readonly ordersModel: Model<TrainingOrdersModel>) {
  }

  public async create(item: TrainingOrdersEntity): Promise<Order> {
    const newTraining = new this.ordersModel(item);
    return newTraining.save();
  }

  public async destroy(id: string): Promise<void> {
    await this.ordersModel.deleteOne({_id: id});
  }

  public async findById(id: string): Promise<Order | null> {
    return this.ordersModel
      .findOne({_id: id})
      .exec();
  }


  public async findByUserIdTrainingId(userId: string, trainingId: string): Promise<Order | null> {
    return this.ordersModel
      .findOne({userId: userId, trainingId: trainingId})
      .exec();
  }

  public async findByCoachId(coachId: string, query: TrainingOrdersQuery): Promise<Order[]> {
    const objQuery = getTrainingOrdersQuery(query);
    return this.ordersModel
    .aggregate([
        {$match: { $and: [
          {coachId: coachId},
          {isDone: false}
        ]}},
        {
          $addFields: {
            trainingObjectId: {'$toObjectId': '$trainingId'},
          }
        },
        {$lookup: {
          from: 'training',
          localField: 'trainingObjectId',
          foreignField: '_id',
          as: 'result'
        },
      },
      { $unwind: '$result',},
      { $group: {
        _id: {
          trainingId: '$trainingId',
          createdAt: '$createdAt',
          nameTraining: "$result.nameTraining",
          photoTraning: "$result.photoTraning",
          levelTraining: "$result.levelTraining",
          trainingType: "$result.trainingType",
          trainingTime: "$result.trainingTime",
          price: "$result.price",
          caloriesReset: "$result.caloriesReset",
          descriptionTraining: "$result.descriptionTraining",
          sex: "$result.sex",
          videoTraning: "$result.videoTraning",
          rating: "$result.rating",
          isSpecialOffer: "$result.isSpecialOffer",},
          totalPrice: { $sum: '$totalPrice' },
          trainingCount: { $sum: '$trainingRestCount' },
      }
    },
      {
        $project:{_id: 0,
              trainingId:  "$_id.trainingId",
              nameTraining:  "$_id.nameTraining",
              createdAt: {$dateToString:{format:"%Y-%m-%d %H:%M:%S",date:"$_id.createdAt"}},
              photoTraning: "$_id.photoTraning",
              levelTraining: "$_id.levelTraining",
              trainingType: "$_id.trainingType",
              trainingTime: "$_id.trainingTime",
              price: "$_id.price",
              caloriesReset: "$_id.caloriesReset",
              descriptionTraining: "$_id.descriptionTraining",
              sex: "$_id.sex",
              videoTraning: "$_id.videoTraning",
              rating: "$_id.rating",
              isSpecialOffer: "$_id.isSpecialOffer",
              trainingCount: 1,
              totalPrice: 1
        }
    },
      { $unset: 'result' },
      { $sort:  objQuery.objSort },
      { $limit: objQuery.limitNumber},
      { $skip:  objQuery.skip }
     ])
    .exec();
  }

  public async findByUserId(userId: string, query: TrainingOrdersQuery): Promise<Order[]> {
    const objQuery = getTrainingOrdersQuery(query);
    console.log(objQuery);
    return this.ordersModel
    .aggregate([
        {$match: { $and: [
          //{isDone: false},
          {userId: userId},

        ]}},
        {
          $addFields: {
            trainingObjectId: {'$toObjectId': '$trainingId'},
          }
        },
        {$lookup: {
          from: 'training',
          localField: 'trainingObjectId',
          foreignField: '_id',
          as: 'result'
        },
      },
      { $unwind: '$result',},
      { $group: {
        _id: {
          trainingId: '$trainingId',
          createdAt: '$createdAt',
          isDone: '$isDone',
          nameTraining: "$result.nameTraining",
          photoTraning: "$result.photoTraning",
          levelTraining: "$result.levelTraining",
          trainingType: "$result.trainingType",
          trainingTime: "$result.trainingTime",
          price: "$result.price",
          caloriesReset: "$result.caloriesReset",
          descriptionTraining: "$result.descriptionTraining",
          sex: "$result.sex",
          videoTraning: "$result.videoTraning",
          rating: "$result.rating",
          isSpecialOffer: "$result.isSpecialOffer",},
          totalPrice: { $sum: '$totalPrice' },
          trainingCount: { $sum: '$trainingRestCount' },
      }
    },
      {
        $project:{_id: 0,
              trainingId:  "$_id.trainingId",
              nameTraining:  "$_id.nameTraining",
              createdAt: {$dateToString:{format:"%Y-%m-%d %H:%M:%S",date:"$_id.createdAt"}},
              photoTraning: "$_id.photoTraning",
              levelTraining: "$_id.levelTraining",
              trainingType: "$_id.trainingType",
              trainingTime: "$_id.trainingTime",
              price: "$_id.price",
              caloriesReset: "$_id.caloriesReset",
              descriptionTraining: "$_id.descriptionTraining",
              sex: "$_id.sex",
              videoTraning: "$_id.videoTraning",
              rating: "$_id.rating",
              isSpecialOffer: "$_id.isSpecialOffer",
              isDone: "$_id.isDone",
              trainingCount: 1,
              totalPrice: 1
        }
    },
      { $unset: 'result' },
      { $match: objQuery.objFiltr},
      { $sort:  objQuery.objSort },
      { $limit: objQuery.limitNumber},
      { $skip:  objQuery.skip }
     ])
    .exec();
  }

  public async update(id: string, item: TrainingOrdersEntity): Promise<Order> {
    return this.ordersModel
      .findByIdAndUpdate(id, item.toObject(), {new: true})
      .exec();
  }


}
