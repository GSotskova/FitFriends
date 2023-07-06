import { QuestionnaireUser, LevelTraining, TrainingType, TrainingTime } from '@project/shared/shared-types';

export class QuestionnaireUserEntity implements QuestionnaireUser {
  public userId: string;
  public levelTraining: LevelTraining;
  public trainingType: TrainingType[];
  public trainingTime: TrainingTime;
  public caloriesReset: number;
  public caloriesSpend: number;
  public isReady: boolean;

  constructor(questionnaireEntity: QuestionnaireUser) {
    this.fillEntity(questionnaireEntity);
  }

  public toObject() {
    return {...this};
  }

  public fillEntity(questionnaireEntity: QuestionnaireUser) {
    this.userId = questionnaireEntity.userId;
    this.levelTraining = questionnaireEntity.levelTraining;
    this.trainingType = questionnaireEntity.trainingType;
    this.trainingTime = questionnaireEntity.trainingTime;
    this.caloriesReset = questionnaireEntity.caloriesReset;
    this.caloriesSpend = questionnaireEntity.caloriesSpend;
    this.isReady = questionnaireEntity.isReady;
  }
}
