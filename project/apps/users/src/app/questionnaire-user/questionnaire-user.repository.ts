import { CRUDRepository } from '@project/util/util-types';
import { Injectable } from '@nestjs/common';
import { QuestionnaireUserEntity } from './questionnaire-user.entity';
import { QuestionnaireUser } from '@project/shared/shared-types';
import {QuestionnaireUserModel } from './questionnaire-user.model';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class QuestionnaireUserRepository implements CRUDRepository<QuestionnaireUserEntity, string, QuestionnaireUser> {
  constructor(
    @InjectModel(QuestionnaireUserModel.name) private readonly QuestionnaireUserModel: Model<QuestionnaireUserModel>) {
  }

  public async create(item: QuestionnaireUserEntity): Promise<QuestionnaireUser> {
    const newCoach = new this.QuestionnaireUserModel(item);
    return newCoach.save();
  }

  public async destroy(id: string): Promise<void> {
    this.QuestionnaireUserModel.deleteOne({_id: id});
  }

  public async findById(id: string): Promise<QuestionnaireUser | null> {
    return this.QuestionnaireUserModel
      .findOne({_id: id})
      .exec();
  }

  public async findByEmail(email: string): Promise<QuestionnaireUser | null> {
    return this.QuestionnaireUserModel
      .findOne({email})
      .exec();
  }

  public async update(id: string, item: QuestionnaireUserEntity): Promise<QuestionnaireUser> {
    return this.QuestionnaireUserModel
      .findByIdAndUpdate(id, item.toObject(), {new: true})
      .exec();
  }
}
