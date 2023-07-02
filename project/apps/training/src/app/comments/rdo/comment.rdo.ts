import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';

export class CommentRdo {
  @ApiProperty({
    description: 'The uniq user ID',
  })
  @Expose({ name: '_id'})
  @Transform((value) => value.obj['_id'])
  public id: string;

  @ApiProperty({
    description: 'Author comment'
  })
  @Expose()
  public userId: string;

  @ApiProperty({
    description: 'The training ID'
  })
  @Expose()
  public trainingId: string;

  @ApiProperty({
    description: 'Rating training'
  })
  @Expose()
  public ratingTraining: number;

  @ApiProperty({
    description: 'Text comment'
  })
  @Expose()
  public message: string;



}
