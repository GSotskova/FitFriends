import { NotifyDate } from '@project/shared/shared-types';

export class NotifyDateEntity implements NotifyDate {
  public _id: string;
  public userId: string;
  public dateNotify: Date;

  constructor(entity: NotifyDate) {
    this.fillEntity(entity);
  }

  public toObject() {
    return {...this};
  }

  public fillEntity(entity: NotifyDate) {
    this._id = entity.id;
    this.userId = entity.userId;
    this.dateNotify = entity.dateNotify;
  }

}
