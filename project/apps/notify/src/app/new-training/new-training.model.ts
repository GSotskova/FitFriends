import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { TrainingForSend, NotifyTraining } from '@project/shared/shared-types';

@Schema({
  collection: 'new_training',
  timestamps: true,
})
export class NewTrainingModel extends Document implements  NotifyTraining {
  @Prop()
  public userId: string;

  @Prop()
  public email: string;

  @Prop()
  public training: TrainingForSend[];


  @Prop()
  public dateSend: string;

}

export const NewTrainingSchema = SchemaFactory.createForClass(NewTrainingModel);
