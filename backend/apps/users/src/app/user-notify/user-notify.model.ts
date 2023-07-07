import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { NotifyMessage, NotifyUser } from '@project/shared/shared-types';



@Schema({
  collection: 'notify-user',
  timestamps: true,
})
export class NotifyUserModel extends Document implements NotifyUser {
  @Prop()
  public userId: string;

  @Prop()
  public initiatorId: string;

  @Prop({
    required: true,
    type: String,
    enum: NotifyMessage,
    })
  public text: NotifyMessage;

  @Prop({
    required: true,
  })
  public dateNotify: Date;

}

export const NotifyUserSchema = SchemaFactory.createForClass(NotifyUserModel);
