import { ApiProperty } from "@nestjs/swagger";
import { ArrayMaxSize, IsISO8601, IsInt, IsString, Max, MaxLength, Min, MinLength } from 'class-validator';
import { LevelTraining, StationMetro, TrainingTime, TrainingType, UserRole, UserSex } from "@project/shared/shared-types";
import { CaloriesReset, MAX_LENGTH_DESCRIPTION, MAX_TRAINING_COUNT, MIN_LENGTH_DESCRIPTION, CaloriesSpend, SuccessCoach } from "./dto.constants";

export class EditUserDto  {
  @ApiProperty({
    description: 'User name',
    example: 'Иван',
  })
  @IsString()
  public userName?: string;

  @ApiProperty({
    description: 'User gender',
    enum: UserSex, enumName: 'UserSex'})
  public sex?: UserSex;

  @ApiProperty({
    description: 'User birth date',
    example: '1981-03-12',

  })
  @IsISO8601({}, { message: 'The user date birth is not valid' })
  public dateBirth?: string;

  @ApiProperty({
    description: 'The role of the user in the system',
    enum: UserRole, enumName: 'UserRole'
  })
  public role?: UserRole;

  @ApiProperty({
    description: 'Text with general information'
  })
  @MinLength(MIN_LENGTH_DESCRIPTION)
  @MaxLength(MAX_LENGTH_DESCRIPTION)
  public description?: string;

  @ApiProperty({
    description: 'Metro station',
    enum: StationMetro, enumName: 'StationMetro'
  })
  public location?: StationMetro;


  @ApiProperty({
    description: 'The level of physical fitness of the user',
    enum: LevelTraining, enumName: 'LevelTraining'
  })
  public levelTraining?: LevelTraining;

  @ApiProperty({
    description: 'The level of physical fitness of the user',
    type: [TrainingType]
  })
  @ArrayMaxSize(MAX_TRAINING_COUNT)
  public trainingType?: TrainingType[];

  @ApiProperty({
    description: 'Time for training',
    enum: TrainingTime, enumName: 'TrainingTime'
  })
  public trainingTime?: TrainingTime;

  @ApiProperty({
    description: 'Number of calories to reset'
  })
  @IsInt()
  @Min(CaloriesReset.MinCount)
  @Max(CaloriesReset.MaxCount)
  public caloriesReset?: number;

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

  @ApiProperty({
    description: 'Coach Certificate'
  })
  public certificates?: string;

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
}
