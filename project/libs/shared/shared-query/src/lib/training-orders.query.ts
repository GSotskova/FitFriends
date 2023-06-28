import { IsNumber, IsOptional, IsIn } from 'class-validator';
import { Transform } from 'class-transformer';
import { DEFAULT_LIST_COUNT_LIMIT } from './query.constants';

export class TrainingOrdersQuery {
  @Transform(({ value } ) => +value || DEFAULT_LIST_COUNT_LIMIT)
  @IsNumber()
  public limit = DEFAULT_LIST_COUNT_LIMIT;


  @IsIn(['asc', 'desc', 1, -1])
  @Transform(({ value } ) => value === 'desc' || value==='-1' ? -1 : 1 )
  @IsOptional()
  public sortCount?: 'desc' | 'asc' | '1' | '-1';

  @IsIn(['asc', 'desc', 1, -1])
  @Transform(({ value } ) => value === 'desc' || value==='-1' ? -1 : 1 )
  @IsOptional()
  public sortPrice?: 'desc' | 'asc' | '1' | '-1';

  @Transform(({ value }) => +value)
  @IsOptional()
  public page?: number;
}
