import { LevelTraining } from "./level-traning.enum";
import { TrainingTime } from "./training-time.enum";
import { TrainingType } from "./training-type.enum";

export interface UserAddInfo {
  userId?: string;
  levelTraining: LevelTraining;
  trainingType: TrainingType[];
  trainingTime: TrainingTime;
  caloriesReset: number;
  caloriesSpend: number;
  isReady: boolean;
}
