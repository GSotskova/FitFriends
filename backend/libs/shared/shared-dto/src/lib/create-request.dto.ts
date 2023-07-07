import { ApiProperty } from "@nestjs/swagger";
import { StatusRequest, TypeRequest } from "@project/shared/shared-types";

export class CreateRequestDto {

  @ApiProperty({
    description: 'Initiator Id'
  })
  public initiatorId: string;

  @ApiProperty({
    description: 'User Id'
  })
  public userId: string;

  @ApiProperty({
    description: 'Current status of the request',
    enum: StatusRequest, enumName: 'StatusRequest'})
  public statusRequest: StatusRequest;

  @ApiProperty({
    description: 'Type request',
    enum: TypeRequest, enumName: 'TypeRequest'})
  public typeRequest: TypeRequest;
}
