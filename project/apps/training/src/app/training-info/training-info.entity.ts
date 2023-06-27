import { UserSex, Training, LevelTraining, TrainingType, TrainingTime } from '@project/shared/shared-types';

export class TrainingEntity implements Training {
  public _id: string;
  public nameTraining: string;
  public photoTraning: string;
  public levelTraining: LevelTraining;
  public trainingType: TrainingType;
  public trainingTime: TrainingTime;
  public dateBirth: Date;
  public price: number;
  public caloriesReset: number;
  public descriptionTraining: string;
  public sex: UserSex;
  public videoTraning: string;
  public rating: number;
  public coachId: string;
  public isSpecialOffer: boolean;

  constructor(trainingEntity: Training) {
    this.fillEntity(trainingEntity);
  }

  public toObject() {
    return {...this};
  }

  public fillEntity(trainingEntity: Training) {
    this._id = trainingEntity._id;
    this.nameTraining = trainingEntity.nameTraining;
    this.photoTraning = trainingEntity.photoTraning;
    this.levelTraining = trainingEntity.levelTraining;
    this.trainingType = trainingEntity.trainingType;
    this.trainingTime = trainingEntity.trainingTime;
    this.price = trainingEntity.price;
    this.caloriesReset = trainingEntity.caloriesReset;
    this.descriptionTraining = trainingEntity.descriptionTraining;
    this.sex = trainingEntity.sex;
    this.videoTraning = trainingEntity.videoTraning;
    this.rating = trainingEntity.rating;
    this.coachId = trainingEntity.coachId;
    this.isSpecialOffer = trainingEntity.isSpecialOffer;
  }
}
