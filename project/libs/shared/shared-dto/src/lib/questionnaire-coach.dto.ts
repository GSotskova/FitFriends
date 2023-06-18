import { ApiProperty } from "@nestjs/swagger";
import { ArrayMaxSize,  Max, MaxLength, Min, MinLength } from 'class-validator';
import { LevelTraining,  TrainingType } from "@project/shared/shared-types";
import { CaloriesReset, MAX_TRAINING_COUNT, SuccessCoach } from "./dto.constants";

export class QuestionnaireCoachDto  {

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
    description: 'Coach Certificate'
  })
  public certificates: string;

  @ApiProperty({
    description: 'Merits of the coach'
  })
  @Min(CaloriesReset.MinCount)
  @Max(CaloriesReset.MaxCount)
  public caloriesReset: number;

  @ApiProperty({
    description: 'Number of calories to spend per day.'
  })
  @MinLength(SuccessCoach.MinLength)
  @MaxLength(SuccessCoach.MaxLength)
  public successCoach: string;

  @ApiProperty({
    description: 'Conducts personal trainings'
  })
  public isPersonal: boolean;
}

