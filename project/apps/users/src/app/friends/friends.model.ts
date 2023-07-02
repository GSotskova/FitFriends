import { Document} from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Friend } from '@project/shared/shared-types';

@Schema({
  collection: 'friends',
  timestamps: true,
})
export class FriendModel extends Document implements Friend {

  @Prop({
    required: true,
  })
  public userId: string;

  @Prop({
    required: true,
  })
  public friendId: string;


}

export const FriendsSchema = SchemaFactory.createForClass(FriendModel);
