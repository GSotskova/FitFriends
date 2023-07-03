import { StatusRequest, TrainingRequest, TypeRequest } from "@project/shared/shared-types";



export class TrainingRequestEntity implements TrainingRequest {
  public _id: string;
  public initiatorId: string;
  public userId: string;
  public statusRequest: StatusRequest;
  public typeRequest: TypeRequest;
  public dateUpd: Date;

  constructor(item: TrainingRequest) {
    this.fillEntity(item);
  }

  public toObject() {
    return {...this};
  }

  public fillEntity(item: TrainingRequest) {
    this._id = item._id;
    this.userId = item.userId;
    this.initiatorId = item.initiatorId;
    this.statusRequest = item.statusRequest;
    this.typeRequest = item.typeRequest;
    this.dateUpd = item.dateUpd;
  }

}
