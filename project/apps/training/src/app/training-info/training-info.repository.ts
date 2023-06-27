import { CRUDRepository } from '@project/util/util-types';
import { Injectable } from '@nestjs/common';
import { TrainingEntity } from './training-info.entity';
import { SomeObject, Training } from '@project/shared/shared-types';
import { TrainingModel } from './training-info.model';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { TrainingQuery } from '@project/shared/shared-query';

@Injectable()
export class TrainingRepository implements CRUDRepository<TrainingEntity, string, Training> {
  constructor(
    @InjectModel(TrainingModel.name) private readonly trainingModel: Model<TrainingModel>) {
  }

  public async create(item: TrainingEntity): Promise<Training> {
    const newTraining = new this.trainingModel(item);
    return newTraining.save();
  }

  public async destroy(id: string): Promise<void> {
    this.trainingModel.deleteOne({_id: id});
  }

  public async findById(id: string): Promise<Training | null> {
    return this.trainingModel
      .findOne({_id: id})
      .exec();
  }

  public async findByCoachId(coachId: string, query: TrainingQuery): Promise<Training[]> {
    const {limit, price, caloriesReset, rating, trainingTime, page}= query;
    const pageNum = page? (page-1) : 0;

    const objFiltr: SomeObject = {};
      if (query.price) {
          objFiltr.price =  { "$gte": price[0],
                               "$lte": price[1],
                             };
                            }
      if (query.caloriesReset) {
        objFiltr.caloriesReset =  { "$gte": caloriesReset[0],
                                    "$lte": caloriesReset[1],
                                  };
                               }
      if (query.rating) {
        objFiltr.rating =  { "$gte": rating[0],
                              "$lte": rating[1],
                           };
                        }
      if (query.trainingTime) {objFiltr.trainingTime = { "$in": trainingTime };}

    return this.trainingModel
    .find({...objFiltr, coachId: coachId})
    .skip(pageNum * limit)
    .limit( limit )
    .exec();
  }


  public async update(id: string, item: TrainingEntity): Promise<Training> {
    return this.trainingModel
      .findByIdAndUpdate(id, item.toObject(), {new: true})
      .exec();
  }


}
