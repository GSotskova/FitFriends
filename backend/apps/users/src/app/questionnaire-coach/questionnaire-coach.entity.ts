import { QuestionnaireCoach, LevelTraining, TrainingType } from '@project/shared/shared-types';

export class QuestionnaireCoachEntity implements QuestionnaireCoach {
  public userId: string;
  public levelTraining: LevelTraining;
  public trainingType: TrainingType[];
  public certificate: string[];
  public successCoach: string;
  public isPersonal: boolean;

  constructor(questionnaireEntity: QuestionnaireCoach) {
    this.fillEntity(questionnaireEntity);
  }

  public toObject() {
    return {...this};
  }

  public fillEntity(questionnaireEntity: QuestionnaireCoach) {
    this.userId = questionnaireEntity.userId;
    this.levelTraining = questionnaireEntity.levelTraining;
    this.trainingType = questionnaireEntity.trainingType;
    this.certificate = questionnaireEntity.certificate;
    this.successCoach = questionnaireEntity.successCoach;
    this.isPersonal = questionnaireEntity.isPersonal;
  }
}
