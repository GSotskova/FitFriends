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

  public async updateByUserId(userId: string, item: QuestionnaireCoachEntity): Promise<QuestionnaireCoach> {
    return this.questionnaireCoachModel
      .findOneAndUpdate({userId: userId}, item.toObject(), {new: true})
      .exec();
  }

  public async updateCertificate(coachId: string, certificateId: string): Promise<QuestionnaireCoach | null> {
    const coachInfo = await this.questionnaireCoachModel.findOne({userId: coachId}).exec();
    const existsFile = coachInfo.certificate.includes(certificateId);
    if(!existsFile) {
    const certificates = [...coachInfo.certificate, certificateId];
    return this.questionnaireCoachModel
      .findOneAndUpdate({userId: coachId}, {certificate: certificates}, {new: true})
      .exec();
    }
  }

  public async deleteCertificate(coachId: string, certificateId: string): Promise<QuestionnaireCoach | null> {
    const coachInfo = await this.questionnaireCoachModel.findOne({userId: coachId}).exec();
    const existsFile = coachInfo.certificate.includes(certificateId);
    if(existsFile) {
      console.log(coachInfo.certificate)
    const certificates = coachInfo.certificate.filter((el)=> el !== certificateId);
    console.log(certificates)
    return this.questionnaireCoachModel
      .findOneAndUpdate({userId: coachId}, {certificate: certificates}, {new: true})
      .exec();
    }
  }
}
