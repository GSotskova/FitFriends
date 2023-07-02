import { NotifyMessage } from "./notify-message.enum";

export interface NotifyUser {
  id?: string;
  userId: string;
  initiatorId?: string;
  initiatorName?: string;
  text: NotifyMessage;
  dateNotify: Date;
}
