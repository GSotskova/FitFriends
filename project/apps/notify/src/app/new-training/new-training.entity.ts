import { Entity } from '@project/util/util-types';
import { NotifyTraining, TrainingForSend } from '@project/shared/shared-types';

export class NewTrainingEntity implements Entity<NewTrainingEntity>, NotifyTraining {
  public id: string;
  public training: TrainingForSend[];
  public userId: string;
  public email: string;
  public dateSend: string;

  constructor(emailSubscriber: NotifyTraining) {
    this.fillEntity(emailSubscriber);
  }

  public fillEntity(entity) {
    this.training = entity.training;
    this.userId = entity.userId;
    this.email = entity.email;
    this.dateSend = entity.dateSend;
    this.id = entity.id ?? '';
  }

  public toObject(): NewTrainingEntity {
    return { ...this };
  }
}
