import { Injectable } from '@nestjs/common';
import { NotifyTrainingDto } from '@project/shared/shared-dto';
import { NewTrainingRepository } from './new-training.repository';
import { NewTrainingEntity } from './new-training.entity';

@Injectable()
export class NewTrainingService {
  constructor(
    private readonly newTrainingRepository: NewTrainingRepository
  ) {}

  public async addNotifyTraining(dto: NotifyTrainingDto) {

    const { userId, dateSend } = dto;
    const existsNotify = await this.newTrainingRepository.findByUserId(userId, dateSend);

    if (existsNotify) {
      return existsNotify;
    }

    return this.newTrainingRepository
      .create(new NewTrainingEntity(dto));
  }
}
