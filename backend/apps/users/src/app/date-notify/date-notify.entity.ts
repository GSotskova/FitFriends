import { NotifyDate, TrainingForSend } from '@project/shared/shared-types';

export class NotifyDateEntity implements NotifyDate {
  public _id: string;
  public userId: string;
  public trainingForSend: TrainingForSend;
  public countNewTraining: number;
  public dateNotify: Date;
  public isDone: boolean;

  constructor(entity: NotifyDate) {
    this.fillEntity(entity);
  }

  public toObject() {
    return {...this};
  }

  public fillEntity(entity: NotifyDate) {
    this._id = entity._id;
    this.userId = entity.userId;
    this.trainingForSend = entity.trainingForSend;
    this.countNewTraining = entity.countNewTraining;
    this.dateNotify = entity.dateNotify;
    this.isDone = entity.isDone;
  }

}
