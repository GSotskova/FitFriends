import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { QuestionnaireCoach, LevelTraining, TrainingType } from '@project/shared/shared-types';

@Schema({
  collection: 'questionnairesCoache',
  timestamps: true,
})
export class QuestionnaireCoachModel extends Document implements QuestionnaireCoach {
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
  })
  public certificates: string;

  @Prop()
  public successCoach: string;

  @Prop()
  public isPersonal: boolean;
}

export const QuestionnaireCoachSchema = SchemaFactory.createForClass(QuestionnaireCoachModel);
