import { TrainingForSend } from "./training-for-send.interface";


export interface NotifyTraining {
  id?: string;
  training: TrainingForSend[];
  userId: string;
  email: string;
  dateSend: string
}
