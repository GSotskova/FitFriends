import { ApiProperty } from "@nestjs/swagger";
import { IsInt, Max, MaxLength, Min, MinLength } from 'class-validator';
import { LevelTraining, TrainingTime, TrainingType, UserSex } from "@project/shared/shared-types";
import { CaloriesReset, NameTraining, DescriptionTraining } from "./dto.constants";

export class CreateTrainingDTO  {

  @ApiProperty({
    description: 'Training name'
  })
  @MinLength(NameTraining.MinLength)
  @MaxLength(NameTraining.MaxLength)
  public nameTraining: string;

  @ApiProperty({
    description: 'The level of physical fitness of the user',
    enum: LevelTraining, enumName: 'LevelTraining'
  })
  public levelTraining: LevelTraining;

  @ApiProperty({
    description: 'The level of physical fitness of the user',
    enum: TrainingTime, enumName: 'TrainingType'
  })
  public trainingType: TrainingType;

  @ApiProperty({
    description: 'Time for training',
    enum: TrainingTime, enumName: 'TrainingTime'
  })
  public trainingTime: TrainingTime;

  @ApiProperty({
    description: 'The cost of training'
  })
  @IsInt()
  public price: number;

  @ApiProperty({
    description: 'Number of calories to reset'
  })
  @IsInt()
  @Min(CaloriesReset.MinCount)
  @Max(CaloriesReset.MaxCount)
  public caloriesReset: number;

  @ApiProperty({
    description: 'Training description'
  })
  @MinLength(DescriptionTraining.MinLength)
  @MaxLength(DescriptionTraining.MaxLength)
  public descriptionTraining: string;

  @ApiProperty({
    description: 'User gender',
    enum: UserSex, enumName: 'UserSex'})
  public sex: UserSex;

  @ApiProperty({
    description: 'Coach Id'
  })
  public coachId: string;

  @ApiProperty({
    description: 'The sign of a special offer'
  })
  public isSpecialOffer: boolean;
}

