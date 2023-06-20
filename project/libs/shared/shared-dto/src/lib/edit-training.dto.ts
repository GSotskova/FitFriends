import { ApiProperty } from "@nestjs/swagger";
import { ArrayMaxSize, IsInt, Max, MaxLength, Min, MinLength } from 'class-validator';
import { LevelTraining, TrainingTime, TrainingType, UserSex } from "@project/shared/shared-types";
import { CaloriesReset, MAX_TRAINING_COUNT, NameTraining, DescriptionTraining } from "./dto.constants";

export class EditTrainingDTO  {

  @ApiProperty({
    description: 'Training name'
  })
  @MinLength(NameTraining.MinLength)
  @MaxLength(NameTraining.MaxLength)
  public nameTraining?: string;

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
    description: 'The cost of training'
  })
  @IsInt()
  public price?: number;

  @ApiProperty({
    description: 'Number of calories to reset'
  })
  @IsInt()
  @Min(CaloriesReset.MinCount)
  @Max(CaloriesReset.MaxCount)
  public caloriesReset?: number;

  @ApiProperty({
    description: 'Training description'
  })
  @MinLength(DescriptionTraining.MinLength)
  @MaxLength(DescriptionTraining.MaxLength)
  public descriptionTraining?: string;

  @ApiProperty({
    description: 'User gender',
    enum: UserSex, enumName: 'UserSex'})
  public sex?: UserSex;

  @ApiProperty({
    description: 'The sign of a special offer'
  })
  public isSpecialOffer?: boolean;
}

