import { IsIn, IsNumber, IsOptional, Max} from 'class-validator';
import { Transform } from 'class-transformer';
import { DEFAULT_LIST_COUNT_LIMIT } from './query.constants';


export class DefaultQuery {
  @Transform(({ value } ) => +value || DEFAULT_LIST_COUNT_LIMIT)
  @IsNumber()
  @Max(DEFAULT_LIST_COUNT_LIMIT)
  public limit = DEFAULT_LIST_COUNT_LIMIT;

  @IsIn(['asc', 'desc', 1, -1])
  @Transform(({ value } ) => value === 'desc' || value==='-1' ? -1 : 1 )
  @IsOptional()
  public sortDate?: 'desc' | 'asc' | '1' | '-1';

  @Transform(({ value }) => +value)
  @IsOptional()
  public page?: number;
}
