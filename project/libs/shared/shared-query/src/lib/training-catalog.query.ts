import { IsNumber, IsOptional, IsArray, IsInt, Min, Max, IsIn } from 'class-validator';
import { Transform } from 'class-transformer';
import { DEFAULT_LIST_COUNT_LIMIT, RatingQuery } from './query.constants';
import { TrainingType } from '@project/shared/shared-types';

export class TrainingCatalogQuery {
  @Transform(({ value } ) => +value || DEFAULT_LIST_COUNT_LIMIT)
  @IsNumber()
  @Max(DEFAULT_LIST_COUNT_LIMIT)
  public limit = DEFAULT_LIST_COUNT_LIMIT;


  @IsIn(['asc', 'desc', 1, -1])
  @Transform(({ value } ) => value === 'desc' || value==='-1' ? -1 : 1 )
  @IsOptional()
  public sortDate?: 'desc' | 'asc' | '1' | '-1';

  @Transform(({ value }) => {if (typeof value === "string") {return value.split(',').map((el: string) => el)} return value })
  @IsArray({})
  @IsOptional()
  public price?: string;


  @Transform(({ value }) => {if (typeof value === "string") {return value.split(',').map((el: string) => el)} return value })
  @IsArray({})
  @IsOptional()
  public caloriesReset?: string;

  @IsInt({})
  @Min(RatingQuery.MinCount)
  @Max(RatingQuery.MaxCount)
  @IsOptional()
  public rating?: number;

  @Transform(({ value }) => {if (typeof value === "string") {return value.split(',').map((el: string) => el)} return value })
  @IsArray({})
  @IsOptional()
  public trainingType?: TrainingType[];

  @IsIn(['asc', 'desc', 1, -1])
  @Transform(({ value } ) => value === 'desc' || value==='-1' ? -1 : 1 )
  @IsOptional()
  public sortPrice?: 'desc' | 'asc' | '1' | '-1';

  @Transform(({ value }) => +value)
  @IsOptional()
  public page?: number;
}
