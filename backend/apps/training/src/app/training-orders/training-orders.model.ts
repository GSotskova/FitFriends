import { Document, now} from 'mongoose';
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
    required: true
  })
  public price: number;

  @Prop({
    required: true,
    type: String,
    enum: PaymentOption
  })
  public paymentOption: PaymentOption;

  @Prop({
    required: true,
    default: 0
  })
  public trainingDoneCount: number;

  @Prop({
    required: true
  })
  public trainingRestCount: number;


  @Prop({
    required: true,
    default: false
  })
  public isDone: boolean;

  @Prop({default: now()})
  public createdAt: Date;
}

export const TrainingOrdersSchema = SchemaFactory.createForClass(TrainingOrdersModel);
