import { IsNumber, IsOptional, IsArray, IsInt, Min, Max } from 'class-validator';
import { Transform } from 'class-transformer';
import { DEFAULT_LIST_COUNT_LIMIT, RatingQuery } from './query.constants';
import { TrainingTime } from '@project/shared/shared-types';

export class TrainingQuery {
  @Transform(({ value } ) => +value || DEFAULT_LIST_COUNT_LIMIT)
  @IsNumber()
  public limit = DEFAULT_LIST_COUNT_LIMIT;


  @Transform(({ value }) => value.split(',').map((el: string) => el))
  @IsArray({})
  @IsOptional()
  public price?: string;


  @Transform(({ value }) => value.split(',').map((el: string) => el))
  @IsArray({})
  @IsOptional()
  public caloriesReset?: string;

  @IsInt({})
  @Min(RatingQuery.MinCount)
  @Max(RatingQuery.MaxCount)
  @IsOptional()
  public rating?: number;

  @Transform(({ value }) => value.split(',').map((el: string) => el))
  @IsArray({})
  @IsOptional()
  public trainingTime?: TrainingTime[];

  @Transform(({ value }) => +value)
  @IsOptional()
  public page?: number;
}
