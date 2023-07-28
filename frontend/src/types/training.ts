import { LevelTraining, TrainingTime, TrainingType } from './questionnaire';
import { UserSex } from './user';

export type Training = {
  id: string;
  nameTraining: string;
  photoTraning: string;
  photoTraningPath?: string;
  levelTraining: LevelTraining;
  trainingType: TrainingType;
  trainingTime: TrainingTime;
  price: number;
  caloriesReset: number;
  descriptionTraining: string;
  sex: UserSex;
  videoTraning: string;
  rating: number;
  coachId: string;
  isSpecialOffer: boolean;
  createdAt: Date;
}

export type NewTraining = {
  nameTraining: string;
  photoTraning?: string;
  photoTraningPath?: string;
  levelTraining: LevelTraining;
  trainingType: TrainingType;
  trainingTime: TrainingTime;
  price: number;
  caloriesReset: number;
  descriptionTraining: string;
  sex: UserSex;
  videoTraning?: string;
  videoTraningPath?: string;
  rating?: number;
  isSpecialOffer?: boolean;
}


export type Query = {
  limit?: string;
  price?: number[];
  caloriesReset?: number[];
  rating?: number[];
  trainingTime?: TrainingTime[];
  page?: number;
  sortDate?: string;
  sortCount?: string;
  sortPrice?: string;
}

export enum StatusRequest
 {
  Pending = 'на рассмотрении',
  Rejected = 'отклонён',
  Accepted = 'принят',
}
