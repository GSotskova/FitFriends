import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { UserSubscription } from '@project/shared/shared-types';



@Schema({
  collection: 'users_subscriptions',
  timestamps: true,
})
export class UsersSubscriptionsModel extends Document implements UserSubscription {
  @Prop()
  public userId: string;

  @Prop()
  public coachId: string;
}

export const UsersSubscriptionsSchema = SchemaFactory.createForClass(UsersSubscriptionsModel);
