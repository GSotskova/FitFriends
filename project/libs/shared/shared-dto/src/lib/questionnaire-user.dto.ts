import { ApiProperty } from "@nestjs/swagger";
import { ArrayMaxSize, IsInt, Max, Min } from 'class-validator';
import { LevelTraining, TrainingTime, TrainingType } from "@project/shared/shared-types";
import { CaloriesReset, MAX_TRAINING_COUNT, CaloriesSpend } from "./dto.constants";

export class QuestionnaireUserDto  {

  @ApiProperty({
    description: 'The level of physical fitness of the user',
    enum: LevelTraining, enumName: 'LevelTraining'
  })
  public levelTraining: LevelTraining;

  @ApiProperty({
    description: 'The level of physical fitness of the user',
    type: [TrainingType]
  })
  @ArrayMaxSize(MAX_TRAINING_COUNT)
  public trainingType: TrainingType[];

  @ApiProperty({
    description: 'Time for training',
    enum: TrainingTime, enumName: 'TrainingTime'
  })
  public trainingTime: TrainingTime;

  @ApiProperty({
    description: 'Number of calories to reset'
  })
  @IsInt()
  @Min(CaloriesReset.MinCount)
  @Max(CaloriesReset.MaxCount)
  public caloriesReset: number;

  @ApiProperty({
    description: 'Number of calories to spend per day.'
  })
  @IsInt()
  @Min(CaloriesSpend.MinCount)
  @Max(CaloriesSpend.MaxCount)
  public caloriesSpend: number;

  @ApiProperty({
    description: 'Training readiness'
  })
  public isReady: boolean;
}

