import { Document} from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Comment } from '@project/shared/shared-types';

@Schema({
  collection: 'comments',
  timestamps: true,
})
export class CommentModel extends Document implements Comment  {

  @Prop({
    required: true,
  })
  public userId: string;

  @Prop({
    required: true,
  })
  public trainingId: string;

  @Prop({
    required: true,
  })
  public ratingTraining: number;

  @Prop({
    required: true})
  public message: string;


}

export const CommentSchema = SchemaFactory.createForClass(CommentModel);
