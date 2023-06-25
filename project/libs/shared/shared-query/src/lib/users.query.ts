import { IsIn, IsNumber, IsOptional, IsEnum, IsArray } from 'class-validator';
import { Transform } from 'class-transformer';
import { DEFAULT_USERS_COUNT_LIMIT } from './query.constants';
import {  StationMetro, LevelTraining } from '@project/shared/shared-types';

export class UsersQuery {
  @Transform(({ value } ) => +value || DEFAULT_USERS_COUNT_LIMIT)
  @IsNumber()
  public limit = DEFAULT_USERS_COUNT_LIMIT;


  @IsIn(['asc', 'desc'])
  @IsOptional()
  public sortRole?: 'desc' | 'asc';


  @IsEnum(StationMetro)
  @IsOptional()
  public location?: StationMetro;

  @Transform(({ value }) => value.split(',').map((el: string) => el))
  @IsArray({})
  @IsOptional()
  public trainingType?: string[];

  @IsEnum(LevelTraining)
  @IsOptional()
  public levelTraining?: LevelTraining;

  @Transform(({ value }) => +value)
  @IsOptional()
  public page?: number;
}
