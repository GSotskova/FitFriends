import { IsNumber, IsOptional, IsEnum, IsArray } from 'class-validator';
import { Transform } from 'class-transformer';
import { DEFAULT_LIST_COUNT_LIMIT } from './query.constants';
import {  StationMetro, LevelTraining, UserRole } from '@project/shared/shared-types';

export class UsersQuery {
  @Transform(({ value } ) => +value || DEFAULT_LIST_COUNT_LIMIT)
  @IsNumber()
  public limit = DEFAULT_LIST_COUNT_LIMIT;


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
