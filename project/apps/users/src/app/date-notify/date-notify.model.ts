import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { NotifyDate } from '@project/shared/shared-types';



@Schema({
  collection: 'notify-date',
  timestamps: true,
})
export class NotifyDateModel extends Document implements NotifyDate {
  @Prop()
  public userId: string;

  @Prop({
    required: true,
    unique: true,
  })
  public dateNotify: Date;

}

export const NotifyDateSchema = SchemaFactory.createForClass(NotifyDateModel);
