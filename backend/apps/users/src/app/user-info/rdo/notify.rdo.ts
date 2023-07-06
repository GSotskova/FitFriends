import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';


export class NotifyRdo {
  @ApiProperty({
    description: 'The uniq user ID',
  })
  @Expose({ name: '_id'})
  @Transform((value) => value.obj['_id'])
  public id: string;

  @ApiProperty({
    description: 'Text notify',
  })
  @Expose()
  public text: string;

  @ApiProperty({
    description: 'Initiator name',
    example: 'Иван'
  })
  @Expose()
  public initiatorName: string;

  @ApiProperty({
    description: 'Date notify',
  })
  @Expose()
  public dateNotify: string;


}
