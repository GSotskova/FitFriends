import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';


export class FriendInfoRdo {
  @ApiProperty({
    description: 'The uniq ID',
  })
  @Expose({ name: '_id'})
  @Transform((value) => value.obj['_id'])
  public id: string;

  @ApiProperty({
    description: 'User Id'
  })
  @Expose()
  public userId: string;

  @ApiProperty({
    description: 'User name',
    example: 'Иван'
  })
  @Expose()
  public userName: string;

  @ApiProperty({
    description: 'User avatar path',
    example: '/images/user.png'
  })
  @Expose()
  public avatar: string;

  @ApiProperty({
    description: 'User email',
    example: 'user@user.local'
  })
  @Expose()
  public email: string;


  @ApiProperty({
    description: 'User gender',
  })
  @Expose()
  public sex: string;

  @ApiProperty({
    description: 'User date birth (ISO format)',
    example: '1981-03-12'
  })
  @Expose()
  public dateBirth: string;

  @ApiProperty({
    description: 'The role of the user in the system',
  })
  @Expose()
  public role: string;

  @ApiProperty({
    description: 'Text with general information'
  })
  @Expose()
  public description: string;

  @ApiProperty({
    description: 'Metro station'
  })
  @Expose()
  public location: string;

  @ApiProperty({
    description: 'Is ready for training'
  })
  @Expose()
  public isReady: boolean;

  @ApiProperty({
    description: 'Training type'
  })
  @Expose()
  public trainingType: string[];


  @ApiProperty({
    description: 'Comment created date',
  })
  @Expose()
  public createdAt: string;

}
