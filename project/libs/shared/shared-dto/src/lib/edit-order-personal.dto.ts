import { ApiProperty } from "@nestjs/swagger";
import { StatusOrder } from "@project/shared/shared-types";

export class EditOrderPersonalDto {

  @ApiProperty({
    description: 'Order Personal Id'
  })
  public orderPersonalId: string;


  @ApiProperty({
    description: 'Current status of the order',
    enum: StatusOrder, enumName: 'StatusOrder'})
  public statusOrder: StatusOrder;
}
