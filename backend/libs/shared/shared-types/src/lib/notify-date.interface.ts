import { TrainingForSend } from "./training-for-send.interface";

export interface NotifyDate {
  _id?: string;
  userId: string;
  trainingForSend: TrainingForSend;
  countNewTraining: number;
  dateNotify?: Date;
  isDone: boolean;
}
