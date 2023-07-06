import { Friend } from "@project/shared/shared-types";



export class FriendEntity implements Friend {
  public _id: string;
  public userId: string;
  public friendId: string;

  constructor(item: Friend) {
    this.fillEntity(item);
  }

  public toObject() {
    return {...this};
  }

  public fillEntity(item: Friend) {
    this._id = item._id;
    this.userId = item.userId;
    this.friendId = item.friendId;
  }

}
