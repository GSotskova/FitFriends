import { Document, Schema as MongooseSchema  } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { QuestionnaireCoach, LevelTraining, TrainingType } from '@project/shared/shared-types';


@Schema({
  collection: 'questionnairesCoach',
  timestamps: true,
})
export class QuestionnaireCoachModel extends Document implements QuestionnaireCoach {
  @Prop({
    required: true,
  })
  public userId: string;
 /* @Prop({ type: MongooseSchema.Types.ObjectId , ref: 'UserModel' })
  user:  UserModel
*/

  @Prop({
    required: true,
    type: String,
    enum: LevelTraining,
  })
  public levelTraining: LevelTraining;

  @Prop({
    type: MongooseSchema.Types.Array
  })
  public trainingType: TrainingType[];

  @Prop()
  public certificate?: string[];

  @Prop()
  public successCoach: string;

  @Prop()
  public isPersonal: boolean;
}

export const QuestionnaireCoachSchema = SchemaFactory.createForClass(QuestionnaireCoachModel);
