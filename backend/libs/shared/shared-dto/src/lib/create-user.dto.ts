import { ApiProperty } from "@nestjs/swagger";
import { ArrayMaxSize, IsEmail, IsEnum, IsISO8601, IsInt, IsNotEmpty, IsOptional, IsString, Max, MaxLength, Min, MinLength, ValidateIf } from 'class-validator';
import { LevelTraining, StationMetro, TrainingTime, TrainingType, UserRole, UserSex } from "@project/shared/shared-types";
import { CaloriesReset, CaloriesSpend, DescriptionUser, MAX_TRAINING_COUNT, PasswordLength, SuccessCoach } from "./dto.constants";

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
  @MinLength(PasswordLength.MinLength)
  @MaxLength(PasswordLength.MaxLength)
  public password!: string;

  @ApiProperty({
    description: 'User gender',
    enum: UserSex, enumName: 'UserSex'})
  @IsEnum(UserSex)
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
  @IsEnum(UserRole)
  public role!: UserRole;

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
  public location!: StationMetro;

  /**Add info for coach and users */

  @ApiProperty({
    description: 'The level of physical fitness of the user',
    enum: LevelTraining, enumName: 'LevelTraining'
  })
  @IsEnum(LevelTraining)
  public levelTraining: LevelTraining;

  @ApiProperty({
    description: 'Type of training',
    isArray: true,
    enum: TrainingType
  })
  @IsEnum(TrainingType, { each: true })
  @ArrayMaxSize(MAX_TRAINING_COUNT)
  trainingType: TrainingType[];

  /**Add info for coach */

  @ApiProperty({
    description: 'Coach Certificate'
  })
  public certificate?: string;

  @ApiProperty({
    description: 'Merits of the coach'
  })
  @ValidateIf(o => o.role === UserRole.Coach)
  @IsNotEmpty()
  @MinLength(SuccessCoach.MinLength)
  @MaxLength(SuccessCoach.MaxLength)
  public successCoach: string;

  @ApiProperty({
    description: 'Conducts personal trainings'
  })
  @ValidateIf(o => o.role === UserRole.Coach)
  @IsNotEmpty()
  public isPersonal: boolean;

  /**Add info for users */

  @ApiProperty({
    description: 'Time for training',
    enum: TrainingTime, enumName: 'TrainingTime'
  })
  @ValidateIf(o => o.role === UserRole.User)
  @IsNotEmpty()
  @IsEnum(TrainingTime)
  public trainingTime: TrainingTime;

  @ApiProperty({
    description: 'Number of calories to reset'
  })
  @Min(CaloriesReset.MinCount)
  @Max(CaloriesReset.MaxCount)
  @ValidateIf(o => o.role === UserRole.User)
  @IsNotEmpty()
  public caloriesReset: number;

  @ApiProperty({
    description: 'Number of calories to spend per day.'
  })
  @IsInt()
  @Min(CaloriesSpend.MinCount)
  @Max(CaloriesSpend.MaxCount)
  @ValidateIf(o => o.role === UserRole.User)
  @IsNotEmpty()
  public caloriesSpend: number;

  @ApiProperty({
    description: 'Training readiness'
  })
  @ValidateIf(o => o.role === UserRole.User)
  @IsNotEmpty()
  public isReady: boolean;
}
