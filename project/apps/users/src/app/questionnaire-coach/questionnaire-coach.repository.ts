import { CRUDRepository } from '@project/util/util-types';
import { Injectable } from '@nestjs/common';
import { QuestionnaireCoachEntity } from './questionnaire-coach.entity';
import { QuestionnaireCoach } from '@project/shared/shared-types';
import {QuestionnaireCoachModel } from './questionnaire-coach.model';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class QuestionnaireCoachRepository implements CRUDRepository<QuestionnaireCoachEntity, string, QuestionnaireCoach> {
  constructor(
    @InjectModel(QuestionnaireCoachModel.name) private readonly questionnaireCoachModel: Model<QuestionnaireCoachModel>) {
  }

  public async create(item: QuestionnaireCoachEntity): Promise<QuestionnaireCoach> {
    const newCoach = new this.questionnaireCoachModel(item);
    return newCoach.save();
  }

  public async destroy(id: string): Promise<void> {
    this.questionnaireCoachModel.deleteOne({_id: id});
  }

  public async findById(id: string): Promise<QuestionnaireCoach | null> {
    return this.questionnaireCoachModel
      .findOne({_id: id})
      .exec();
  }

  public async findByEmail(email: string): Promise<QuestionnaireCoach | null> {
    return this.questionnaireCoachModel
      .findOne({email})
      .exec();
  }

  public async update(id: string, item: QuestionnaireCoachEntity): Promise<QuestionnaireCoach> {
    return this.questionnaireCoachModel
      .findByIdAndUpdate(id, item.toObject(), {new: true})
      .exec();
  }
}
