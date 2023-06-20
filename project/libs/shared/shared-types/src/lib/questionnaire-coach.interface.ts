import { LevelTraining } from "./level-traning.enum";
import { TrainingType } from "./training-type.enum";

export interface QuestionnaireCoach {
  userId: string;
  levelTraining: LevelTraining;
  trainingType: TrainingType[];
  certificates: string;
  successCoach: string;
  isPersonal: boolean;
}
