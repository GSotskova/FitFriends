import { LevelTraining } from "./level-traning.enum";
import { TrainingTime } from "./training-time.enum";
import { TrainingType } from "./training-type.enum";
import { UserSex } from "./user-sex.enum";

export interface Training {
  _id?: string;
  nameTraining?: string;
  photoTraning?: string;
  levelTraining?: LevelTraining;
  trainingType?: TrainingType;
  trainingTime?: TrainingTime;
  price?: number;
  caloriesReset?: number;
  descriptionTraining?: string;
  sex?: UserSex;
  videoTraning?: string;
  rating?: number;
  coachId?: string;
  isSpecialOffer?: boolean;
  createdAt?: Date;
}
