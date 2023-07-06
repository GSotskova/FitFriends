import { Entity } from '@project/util/util-types';
import { Subscriber } from '@project/shared/shared-types';

export class EmailSubscriberEntity implements Entity<EmailSubscriberEntity>, Subscriber {
  public id: string;
  public email: string;
  public userName: string;
  public userId: string;

  constructor(emailSubscriber: Subscriber) {
    this.fillEntity(emailSubscriber);
  }

  public fillEntity(entity) {
    this.email = entity.email;
    this.userName = entity.userName;
    this.id = entity.id ?? '';
  }

  public toObject(): EmailSubscriberEntity {
    return { ...this };
  }
}
