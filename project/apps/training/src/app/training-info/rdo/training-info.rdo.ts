import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';

export class TrainingRdo {
  @ApiProperty({
    description: 'The uniq user ID',
  })
  @Expose({ name: '_id'})
  @Transform((value) => value.obj['_id'])
  public id: string;

  @ApiProperty({
    description: 'Training name',
  })
  @Expose()
  public nameTraining: string;

  @ApiProperty({
    description: 'The level of physical fitness of the user'
  })
  @Expose()
  public levelTraining: string;

  @ApiProperty({
    description: 'The level of physical fitness of the user'
  })
  @Expose()
  public trainingType: string;

  @ApiProperty({
    description: 'Time for training'
  })
  @Expose()
  public trainingTime: string;

  @ApiProperty({
    description: 'The cost of training'
  })
  @Expose()
  public price: number;

  @ApiProperty({
    description: 'Number of calories to reset'
  })
  @Expose()
  public caloriesReset: number;

  @ApiProperty({
    description: 'Training description'
  })
  @Expose()
  public descriptionTraining: string;

  @ApiProperty({
    description: 'User gender'
  })
  @Expose()
  public sex: string;

  @ApiProperty({
    description: 'Rating'
  })
  @Expose()
  public rating: number;

  @ApiProperty({
    description: 'Coach Id'
  })
  @Expose()
  public coachId: string;

  @ApiProperty({
    description: 'The sign of a special offer'
  })
  @Expose()
  public isSpecialOffer: boolean;

  @ApiProperty({
    description: 'Error'
  })
  @Expose()
  public error: string;
}
