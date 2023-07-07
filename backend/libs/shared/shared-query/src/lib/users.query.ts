import { IsNumber, IsOptional, IsEnum, IsArray, Max, IsIn } from 'class-validator';
import { Transform } from 'class-transformer';
import { DEFAULT_LIST_COUNT_LIMIT } from './query.constants';
import {  StationMetro, LevelTraining, UserRole } from '@project/shared/shared-types';

export class UsersQuery {
  @Transform(({ value } ) => +value || DEFAULT_LIST_COUNT_LIMIT)
  @IsNumber()
  @Max(DEFAULT_LIST_COUNT_LIMIT)
  public limit = DEFAULT_LIST_COUNT_LIMIT;


  @IsIn(['asc', 'desc', 1, -1])
  @Transform(({ value } ) => value === 'desc' || value==='-1' ? -1 : 1 )
  @IsOptional()
  public sortDate?: 'desc' | 'asc' | '1' | '-1';

  @IsEnum(UserRole)
  @IsOptional()
  public userRole?: UserRole;


  @IsEnum(StationMetro)
  @IsOptional()
  public location?: StationMetro;

  @Transform(({ value }) => {if (typeof value === "string") {return value.split(',').map((el: string) => el)} return value })
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
