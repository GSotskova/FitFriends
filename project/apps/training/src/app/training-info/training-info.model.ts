import { Document} from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { LevelTraining, Training, TrainingTime, TrainingType, UserSex } from '@project/shared/shared-types';

@Schema({
  collection: 'training',
  timestamps: true,
})
export class TrainingModel extends Document implements Training {

  @Prop({
    required: true,
  })
  public nameTraining: string;

  @Prop({
    required: true,
  })
  public photoTraning: string;

  @Prop({
    required: true,
    type: String,
    enum: LevelTraining})
  public levelTraining: LevelTraining;

  @Prop({
    required: true,
    type: String,
    enum: TrainingType})
  public trainingType: TrainingType;

  @Prop({
    required: true,
    type: String,
    enum: TrainingTime,
  })
  public trainingTime: TrainingTime;


  @Prop({
    required: true,
  })
  public price: number;

  @Prop({
    required: true,
  })
  public caloriesReset: number;

  @Prop({
    required: true,
  })
  public descriptionTraining: string;

  @Prop({
    required: true,
    type: String,
    enum: UserSex
  })
  public sex: UserSex;

  @Prop()
  public videoTraning: string;

  @Prop({
    required: true,
  })
  public rating: number;

  @Prop({
    required: true,
  })
  public coachId: string;

  @Prop({
    required: true,
  })
  public isSpecialOffer: boolean;
}

export const TrainingSchema = SchemaFactory.createForClass(TrainingModel);
