import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { NotifyDate, TrainingForSend } from '@project/shared/shared-types';



@Schema({
  collection: 'notify-date',
  timestamps: true,
})
export class NotifyDateModel extends Document implements NotifyDate {
  @Prop()
  public userId: string;

  @Prop({type: Object})
  public trainingForSend: TrainingForSend;

  @Prop()
  public countNewTraining: number;

  @Prop()
  public dateNotify?: Date;

  @Prop()
  public isDone: boolean;
}

export const NotifyDateSchema = SchemaFactory.createForClass(NotifyDateModel);
