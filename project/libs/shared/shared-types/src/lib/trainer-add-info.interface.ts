import { LevelTraining } from "./level-traning.enum";
import { TrainingType } from "./training-type.enum";

export interface TrainerAddInfo {
  userId?: string;
  levelTraining: LevelTraining;
  trainingType: TrainingType[];
  certificates: string;
  successTrainer: string;
  isPersonal: boolean;
}
