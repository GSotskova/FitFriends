import { StatusRequest } from "./status-request.enum";
import { TypeRequest } from "./type-request.enum";

export interface TrainingRequest {
  _id?: string;
  initiatorId: string;
  userId: string;
  statusRequest: StatusRequest;
  typeRequest: TypeRequest;
  dateUpd?: Date;
}
