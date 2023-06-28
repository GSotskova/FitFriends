import { Document} from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Order, PaymentOption } from '@project/shared/shared-types';

@Schema({
  collection: 'trainingOrders',
  timestamps: true,
})
export class TrainingOrdersModel extends Document implements Order  {

  @Prop({
    required: true,
  })
  public userId: string;

  @Prop({
    required: true,
  })
  public coachId: string;

  @Prop({
    required: true,
  })
  public orderType: string;

  @Prop({
    required: true})
  public trainingId: string;

  @Prop({
    required: true})
  public trainingCount: number;

  @Prop({
    required: true
  })
  public totalPrice: number;

  @Prop({
    required: true,
    type: String,
    enum: PaymentOption
  })
  public paymentOption: PaymentOption;

}

export const TrainingOrdersSchema = SchemaFactory.createForClass(TrainingOrdersModel);
