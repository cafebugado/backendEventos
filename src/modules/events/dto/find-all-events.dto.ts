import { IsIn, IsOptional, IsString } from 'class-validator';

export class FindAllEventsDto {
  @IsOptional()
  @IsString()
  @IsIn(['date', 'name', 'createdAt'])
  sort?: 'date' | 'name' | 'createdAt';

  @IsOptional()
  @IsString()
  @IsIn(['asc', 'desc'])
  order?: 'asc' | 'desc';
}