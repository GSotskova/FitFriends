import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsOptional, Max, MaxLength, Min, MinLength } from 'class-validator';
import { LevelTraining, TrainingTime, TrainingType, UserSex } from "@project/shared/shared-types";
import { CaloriesReset, NameTraining, DescriptionTraining } from "./dto.constants";

export class EditTrainingDTO  {

  @ApiProperty({
    description: 'Training name'
  })
  @MinLength(NameTraining.MinLength)
  @MaxLength(NameTraining.MaxLength)
  @IsOptional()
  public nameTraining?: string;

  @ApiProperty({
    description: 'The level of physical fitness of the user',
    enum: LevelTraining, enumName: 'LevelTraining'
  })
  @IsOptional()
  public levelTraining?: LevelTraining;

  @ApiProperty({
    description: 'The level of physical fitness of the user',
    enum: TrainingTime, enumName: 'TrainingType'
  })
  @IsOptional()
  public trainingType?: TrainingType;

  @ApiProperty({
    description: 'Time for training',
    enum: TrainingTime, enumName: 'TrainingTime'
  })
  @IsOptional()
  public trainingTime?: TrainingTime;

  @ApiProperty({
    description: 'The cost of training'
  })
  @IsInt()
  @IsOptional()
  public price?: number;

  @ApiProperty({
    description: 'Number of calories to reset'
  })
  @IsInt()
  @Min(CaloriesReset.MinCount)
  @Max(CaloriesReset.MaxCount)
  @IsOptional()
  public caloriesReset?: number;

  @ApiProperty({
    description: 'Training description'
  })
  @MinLength(DescriptionTraining.MinLength)
  @MaxLength(DescriptionTraining.MaxLength)
  @IsOptional()
  public descriptionTraining?: string;

  @ApiProperty({
    description: 'User gender',
    enum: UserSex, enumName: 'UserSex'})
    @IsOptional()
  public sex?: UserSex;

  @ApiProperty({
    description: 'The sign of a special offer'
  })
  @IsOptional()
  public isSpecialOffer?: boolean;
}

