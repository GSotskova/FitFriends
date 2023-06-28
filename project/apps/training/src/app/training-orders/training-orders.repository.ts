import { CRUDRepository } from '@project/util/util-types';
import { Injectable } from '@nestjs/common';
import { SomeObject, Order } from '@project/shared/shared-types';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { TrainingOrdersQuery } from '@project/shared/shared-query';
import { TrainingOrdersEntity } from './training-orders.entity';
import { TrainingOrdersModel } from './training-orders.model';

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
    this.ordersModel.deleteOne({_id: id});
  }

  public async findById(id: string): Promise<Order | null> {
    return this.ordersModel
      .findOne({_id: id})
      .exec();
  }

  public async findByCoachId(coachId: string, query: TrainingOrdersQuery): Promise<Order[]> {
    const {limit, sortCount, sortPrice,  page}= query;
    const pageNum = page? (page-1) : 0;
    const skip = pageNum*limit;

    const objSort: SomeObject = {};
    const keys = Object.keys(query);
    keys.forEach(key => {
      key === 'sortCount'? objSort.trainingCount = sortCount : '';
      key === 'sortPrice'? objSort.totalPrice = sortPrice : '';
    });

    return this.ordersModel
    .aggregate([
        {$match: {coachId: coachId}},
        {
          $addFields: {
            trainingObjectId: {'$toObjectId': '$trainingId'}
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
          trainingCount: { $sum: '$trainingCount' },
      }
    },
      {
        $project:{_id: 0,
              nameTraining:  "$_id.nameTraining",
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
      { $limit: skip + limit},
      { $skip:  skip },
      { $sort:  objSort }
     ])
    .exec();
  }


  public async update(id: string, item: TrainingOrdersEntity): Promise<Order> {
    return this.ordersModel
      .findByIdAndUpdate(id, item.toObject(), {new: true})
      .exec();
  }


}
