import { ApiProperty } from "@nestjs/swagger";
import { ArrayMaxSize, IsEmail, IsISO8601, IsInt, IsString, Max, MaxLength, Min, MinLength } from 'class-validator';
import { LevelTraining, StationMetro, TrainingTime, TrainingType, UserRole, UserSex } from "@project/shared/shared-types";
import { CaloriesReset, CaloriesSpend, MAX_LENGTH_DESCRIPTION, MAX_TRAINING_COUNT, MIN_LENGTH_DESCRIPTION, SuccessCoach } from "./dto.constants";

export class CreateUserDto  {
  /**User */
  @ApiProperty({
    description: 'User name',
    example: 'Иван',
  })
  @IsString()
  public userName!: string;


  @ApiProperty({
    description: 'User unique address',
    example: 'user@user.ru'
  })
  @IsEmail({}, { message: 'The email is not valid' })
  public email!: string;

  @ApiProperty({
    description: 'User password',
    example: '123456'
  })
  @IsString()
  public password!: string;

  @ApiProperty({
    description: 'User gender',
    enum: UserSex, enumName: 'UserSex'})
  public sex!: UserSex;

  @ApiProperty({
    description: 'User birth date',
    example: '1981-03-12',

  })
  @IsISO8601({}, { message: 'The user date birth is not valid' })
  public dateBirth!: string;

  @ApiProperty({
    description: 'The role of the user in the system',
    enum: UserRole, enumName: 'UserRole'
  })
  public role!: UserRole;

  @ApiProperty({
    description: 'Text with general information'
  })
  @MinLength(MIN_LENGTH_DESCRIPTION)
  @MaxLength(MAX_LENGTH_DESCRIPTION)
  public description!: string;

  @ApiProperty({
    description: 'Metro station',
    enum: StationMetro, enumName: 'StationMetro'
  })
  public location!: StationMetro;

  /**Add info for coach and users */

  @ApiProperty({
    description: 'The level of physical fitness of the user',
    enum: LevelTraining, enumName: 'LevelTraining'
  })
  public levelTraining?: LevelTraining;

  /*@ApiProperty({
    description: 'The level of physical fitness of the user',
    type: [TrainingType]
  })
  @ArrayMaxSize(MAX_TRAINING_COUNT)
  public trainingType?: TrainingType[];
*/
  @ApiProperty({
    description: 'Merits of the coach'
  })
  @Min(CaloriesReset.MinCount)
  @Max(CaloriesReset.MaxCount)
  public caloriesReset?: number;

  /**Add info for coach */

  @ApiProperty({
    description: 'Coach Certificate'
  })
  public certificates: string;

  @ApiProperty({
    description: 'Number of calories to spend per day.'
  })
  @MinLength(SuccessCoach.MinLength)
  @MaxLength(SuccessCoach.MaxLength)
  public successCoach?: string;

  @ApiProperty({
    description: 'Conducts personal trainings'
  })
  public isPersonal?: boolean;

  /**Add info for users */

  @ApiProperty({
    description: 'Time for training',
    enum: TrainingTime, enumName: 'TrainingTime'
  })
  public trainingTime?: TrainingTime;


  @ApiProperty({
    description: 'Number of calories to spend per day.'
  })
  @IsInt()
  @Min(CaloriesSpend.MinCount)
  @Max(CaloriesSpend.MaxCount)
  public caloriesSpend?: number;

  @ApiProperty({
    description: 'Training readiness'
  })
  public isReady?: boolean;
}
