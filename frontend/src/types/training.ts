import { LevelTraining, TrainingTime, TrainingType } from './questionnaire';
import { StationMetro } from './station-metro';
import { UserRole, UserSex } from './user';

export type Training = {
  id: string;
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
  videoTraningPath?: string;
  fileVideoTraning?: File;
  rating?: number;
  coachId?: string;
  coachName?: string;
  coachAvataPath?: string;
  isSpecialOffer?: boolean;
  createdAt?: Date;
}

export type NewTraining = {
  nameTraining: string;
  photoTraning?: string;
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

export type TotalTrainInfo = {
  totalTrainings: number;
  maxPrice: number;
}

export type Query = {
  limit?: number;
  price?: number[];
  caloriesReset?: number[];
  rating?: number[];
  trainingTime?: TrainingTime[];
  trainingType?: TrainingType[];
  page?: number;
  sortDate?: string;
  sortCount?: string;
  sortPrice?: string;
  userRole?: UserRole;
  location?: StationMetro[];
  levelTraining?: LevelTraining;
  isDone?: string;
}

export enum StatusRequest {
  Pending = 'на рассмотрении',
  Rejected = 'отклонён',
  Accepted = 'принят',
}

export enum TypeRequest {
  Personal = 'персональная тренировка',
  Together = 'совместная тренировка'
}

export type TrainingRequest = {
  userId: string;
  statusRequest: StatusRequest;
  typeRequest: TypeRequest;
}

export type Comment = {
  id: string;
  userId: string;
  userName: string;
  avatarPath: string;
  trainingId: string;
  ratingTraining: number;
  message: string;
}

export type NewComment = {
  userId: string;
  trainingId: string;
  ratingTraining: number;
  message: string;
}
