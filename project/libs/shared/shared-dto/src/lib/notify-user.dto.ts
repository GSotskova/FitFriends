import { NotifyMessage } from "@project/shared/shared-types";

export class NotifyUserDto {

  public userId: string;

  public initiatorId: string;

  public initiatorName: string;

  public email: string;

  public text: NotifyMessage;

  public dateNotify: Date;

}
