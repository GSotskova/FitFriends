import { Document} from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { StatusRequest, TrainingRequest, TypeRequest } from '@project/shared/shared-types';

@Schema({
  collection: 'trainingRequest',
  timestamps: true,
})
export class TrainingRequestModel extends Document implements TrainingRequest {

  @Prop({
    required: true,
  })
  public initiatorId: string;

  @Prop({
    required: true,
  })
  public userId: string;

  @Prop({
    required: true,
    type: String,
    enum: StatusRequest
  })
  public statusRequest: StatusRequest;

  @Prop({
    required: true,
    type: String,
    enum: TypeRequest
  })
  public typeRequest: TypeRequest;

  @Prop({
  })
  public dateUpd: Date;


}

export const TrainingRequestSchema = SchemaFactory.createForClass(TrainingRequestModel);
