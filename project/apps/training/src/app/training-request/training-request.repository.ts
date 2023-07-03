import { Injectable } from '@nestjs/common';
import { StatusRequest, TrainingRequest} from '@project/shared/shared-types';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { TrainingRequestEntity } from './training-request.entity';
import { TrainingRequestModel } from './training-request.model';

@Injectable()
export class TrainingRequestRepository  {
  constructor(
    @InjectModel(TrainingRequestModel.name) private readonly requestModel: Model<TrainingRequestModel>) {
  }

  public async create(item: TrainingRequestEntity): Promise<TrainingRequest> {
    const newTrainingRequest = new this.requestModel(item);
    return newTrainingRequest.save();
  }

  public async destroy(id: string): Promise<void> {
    await this.requestModel.deleteOne({_id: id});
  }

  public async findById(id: string): Promise<TrainingRequest | null> {
    return this.requestModel
      .findOne({_id: id})
      .exec();
  }

  public async findId(initiatorId: string, userId: string): Promise<TrainingRequest | null> {
    return this.requestModel
      .findOne({initiatorId: initiatorId, userId: userId})
      .exec();
  }

  public async updateStatus(id: string, newStatus: StatusRequest): Promise<TrainingRequest | null> {
    const currentDate = new Date();
    return this.requestModel
      .findOneAndUpdate({_id:id}, {statusRequest: newStatus, dateUpd: currentDate}, {new: true})
      .exec();
  }

}
