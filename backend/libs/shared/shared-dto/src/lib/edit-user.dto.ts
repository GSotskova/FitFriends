import { ApiProperty } from "@nestjs/swagger";
import { ArrayMaxSize, IsEnum, IsISO8601, IsInt, IsOptional, IsString, Max, MaxLength, Min, MinLength } from 'class-validator';
import { LevelTraining, StationMetro, TrainingTime, TrainingType, UserSex } from "@project/shared/shared-types";
import { CaloriesReset, MAX_TRAINING_COUNT, CaloriesSpend, SuccessCoach, DescriptionUser } from "./dto.constants";

export class EditUserDto  {
  @ApiProperty({
    description: 'User name',
    example: 'Иван',
  })
  @IsString()
  @IsOptional()
  public userName?: string;

  @ApiProperty({
    description: 'User avatar',
  })
  @IsString()
  @IsOptional()
  public avatar?: string;

  @ApiProperty({
    description: 'User gender',
    enum: UserSex, enumName: 'UserSex'})
  @IsEnum(UserSex)
  @IsOptional()
  public sex?: UserSex;

  @ApiProperty({
    description: 'User birth date',
    example: '1981-03-12',

  })
  @IsISO8601({}, { message: 'The user date birth is not valid' })
  @IsOptional()
  public dateBirth?: string;

  @ApiProperty({
    description: 'Text with general information'
  })
  @MinLength(DescriptionUser.MinLength)
  @MaxLength(DescriptionUser.MaxLength)
  @IsOptional()
  public description?: string;

  @ApiProperty({
    description: 'Metro station',
    enum: StationMetro, enumName: 'StationMetro'
  })
  @IsEnum(StationMetro)
  @IsOptional()
  public location?: StationMetro;

  @ApiProperty({
    description: 'User backgroundImg',
  })
  @IsString()
  @IsOptional()
  public backgroundImg?: string;

  @ApiProperty({
    description: 'The level of physical fitness of the user',
    enum: LevelTraining, enumName: 'LevelTraining'
  })
  @IsEnum(LevelTraining)
  @IsOptional()
  public levelTraining?: LevelTraining;

  @ApiProperty({
    description: 'Type of training',
    isArray: true,
    enum: TrainingType
  })
  @IsEnum(TrainingType, { each: true })
  @ArrayMaxSize(MAX_TRAINING_COUNT)
  @IsOptional()
  public trainingType: TrainingType[];


  @ApiProperty({
    description: 'Type of training',
    enum: TrainingTime, enumName: 'TrainingTime'
  })
  @IsEnum(TrainingTime)
  @IsOptional()
  public trainingTime?: TrainingTime;

  @ApiProperty({
    description: 'Number of calories to reset'
  })
  @IsInt()
  @Min(CaloriesReset.MinCount)
  @Max(CaloriesReset.MaxCount)
  @IsOptional()
  public caloriesReset?: number;

  @ApiProperty({
    description: 'Number of calories to spend per day'
  })
  @IsInt()
  @Min(CaloriesSpend.MinCount)
  @Max(CaloriesSpend.MaxCount)
  @IsOptional()
  public caloriesSpend?: number;

  @ApiProperty({
    description: 'Training readiness'
  })
  public isReady?: boolean;

  @ApiProperty({
    description: 'Coach certificate'
  })
  @IsOptional()
  public certificate?: string;

  @ApiProperty({
    description: 'Number of calories to spend per day'
  })
  @MinLength(SuccessCoach.MinLength)
  @MaxLength(SuccessCoach.MaxLength)
  @IsOptional()
  public successCoach?: string;

  @ApiProperty({
    description: 'Conducts personal trainings'
  })
  @IsOptional()
  public isPersonal?: boolean;
}
