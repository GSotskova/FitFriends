import { ApiProperty } from "@nestjs/swagger";
import { StatusOrder } from "@project/shared/shared-types";

export class CreateOrderPersonalDto {

  @ApiProperty({
    description: 'Initiator Id'
  })
  public initiatorId: string;

  @ApiProperty({
    description: 'User Id'
  })
  public userId: string;

  @ApiProperty({
    description: 'Current status of the order',
    enum: StatusOrder, enumName: 'StatusOrder'})
  public statusOrder: StatusOrder;
}
