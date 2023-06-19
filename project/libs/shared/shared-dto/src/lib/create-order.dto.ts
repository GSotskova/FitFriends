import { ApiProperty } from "@nestjs/swagger";
import { PaymentOption } from "@project/shared/shared-types";
import { IsInt, Max, Min } from "class-validator";
import { TrainingCount } from "./dto.constants";

export class CreateOrderDto {

  @ApiProperty({
    description: 'Order type'
  })
  public orderType: string;

  @ApiProperty({
    description: 'Training Id'
  })
  public trainingId: number;

  @ApiProperty({
    description: 'The cost of training'
  })
  @IsInt()
  public price: number;

  @ApiProperty({
    description: 'Training count'
  })
  @IsInt()
  @Min(TrainingCount.MinCount)
  @Max(TrainingCount.MaxCount)
  public trainingCount: number;


  @ApiProperty({
    description: 'Payment method',
    enum: PaymentOption, enumName: 'PaymentOption'})
  public paymentOption: PaymentOption;
}
