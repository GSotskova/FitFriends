import { CRUDRepository } from '@project/util/util-types';
import { NotifyTraining } from '@project/shared/shared-types';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NewTrainingEntity } from './new-training.entity';
import { NewTrainingModel } from './new-training.model';

@Injectable()
export class NewTrainingRepository implements CRUDRepository<NewTrainingEntity, string, NotifyTraining> {
  constructor(
    @InjectModel(NewTrainingModel.name) private readonly newTrainingModel: Model<NewTrainingModel>
  ) {}

  public async create(item: NewTrainingEntity): Promise<NotifyTraining> {
    const newNewTraining = new this.newTrainingModel(item);
    return newNewTraining.save();
  }

  public async destroy(id: string): Promise<void> {
    this.newTrainingModel
      .deleteOne({ _id: id });
  }

  public async findById(id: string): Promise<NotifyTraining | null> {
    return this.newTrainingModel
      .findOne({ _id: id })
      .exec();
  }

  public async update(id: string, item: NewTrainingEntity): Promise<NotifyTraining> {
    return this.newTrainingModel
      .findByIdAndUpdate(id, item.toObject(), { new: true })
      .exec();
  }

  public async findByUserId(userId: string, dateSend: string): Promise<NotifyTraining | null> {
    return this.newTrainingModel
      .findOne({ userId, dateSend })
      .exec()
  }
}
