import { TrainingForSend } from "@project/shared/shared-types";

export class NotifyTrainingDto {

  public userId: string;

  public email: string;

  public training: TrainingForSend[];

  public dateSend: string;

}
