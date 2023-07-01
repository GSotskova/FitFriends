import { UserSubscription } from '@project/shared/shared-types';

export class UsersSubscriptionsEntity implements UserSubscription {
  public _id: string;
  public userId: string;
  public coachId: string;

  constructor(userSubscription: UserSubscription) {
    this.fillEntity(userSubscription);
  }

  public toObject() {
    return {...this};
  }

  public fillEntity(userSubscription: UserSubscription) {
    this._id = userSubscription._id;
    this.userId = userSubscription.userId;
    this.coachId = userSubscription.coachId;
  }

}
