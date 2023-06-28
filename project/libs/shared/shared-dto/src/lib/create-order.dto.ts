import { ApiProperty } from "@nestjs/swagger";
import { PaymentOption } from "@project/shared/shared-types";
import { IsInt, Max, Min } from "class-validator";
import { TrainingCount } from "./dto.constants";

export class CreateOrderDto {


  @ApiProperty({
    description: 'Training Id'
  })
  public trainingId: string;

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
