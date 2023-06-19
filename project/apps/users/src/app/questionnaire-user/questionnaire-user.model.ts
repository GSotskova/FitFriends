import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { QuestionnaireUser, LevelTraining, TrainingType, TrainingTime } from '@project/shared/shared-types';

@Schema({
  collection: 'questionnairesUser',
  timestamps: true,
})
export class QuestionnaireUserModel extends Document implements QuestionnaireUser {
  @Prop({
    required: true,
  })
  public userId: string;


  @Prop({
    required: true,
    type: String,
    enum: LevelTraining,
  })
  public levelTraining: LevelTraining;

  @Prop({
    required: true,
    type: String,
    enum: TrainingType
  })
  public trainingType: TrainingType[];

  @Prop({
    required: true,
    type: String,
    enum: TrainingTime
  })
  public trainingTime: TrainingTime;

  @Prop({
    required: true,
  })
  public description: string;

  @Prop()
  public caloriesReset: number;

  @Prop()
  public caloriesSpend: number;

  @Prop()
  public isReady: boolean;
}

export const QuestionnaireUserSchema = SchemaFactory.createForClass(QuestionnaireUserModel);
