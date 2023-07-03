import { CRUDRepository } from '@project/util/util-types';
import { Injectable } from '@nestjs/common';
import { TrainingEntity } from './training-info.entity';
import { SomeObject, Training } from '@project/shared/shared-types';
import { TrainingModel } from './training-info.model';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { TrainingCatalogQuery, TrainingQuery } from '@project/shared/shared-query';

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

  public async findCatalog(query: TrainingCatalogQuery): Promise<Training[]> {
    const {limit, price, caloriesReset, rating, trainingType, sortPrice, page}= query;
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
      if (query.trainingType) {objFiltr.trainingType = { "$in": trainingType };}


      const objSort: SomeObject = {};
      if (query.sortPrice) {objSort.sortPrice =  sortPrice}


    return this.trainingModel
    .find({...objFiltr})
    .skip(pageNum * limit)
    .limit( limit )
    .exec();
  }

  public async update(id: string, item: TrainingEntity): Promise<Training> {
    return this.trainingModel
      .findByIdAndUpdate(id, item.toObject(), {new: true})
      .exec();
  }


  public async findTrainingAfterDate(date: Date, coaches: [string]): Promise<Training[]> {
    const training = await this.trainingModel
    .find({createdAt: {$gte: date},
          coachId: { $in: coaches }})
    .exec();
      return training;

    }


  public async updateRating(id: string, newRating: number): Promise<Training> {
    return this.trainingModel
      .findByIdAndUpdate(id, {rating: newRating}, {new: true})
      .exec();
  }


  public async updateImg(id: string, fileId: string): Promise<Training> {
    return this.trainingModel
      .findByIdAndUpdate(id, {photoTraning: fileId}, {new: true})
      .exec();
  }
  public async updateVideo(id: string, fileId: string): Promise<Training> {
    return this.trainingModel
      .findByIdAndUpdate(id, {videoTraning: fileId}, {new: true})
      .exec();
  }
}
