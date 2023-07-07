import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { NotifyUser, NotifyMessage } from '@project/shared/shared-types';

@Schema({
  collection: 'user-notify',
  timestamps: true,
})
export class UserNotifyModel extends Document implements  NotifyUser {
  @Prop()
  public userId: string;

  @Prop()
  public email: string;

  @Prop()
  public initiatorId: string;

  @Prop()
  public initiatorName: string;

  @Prop({
    required: true,
    type: String,
    enum: NotifyMessage,
    })
  public text: NotifyMessage;


  @Prop()
  public dateNotify: Date;

}

export const UserNotifySchema = SchemaFactory.createForClass(UserNotifyModel);
